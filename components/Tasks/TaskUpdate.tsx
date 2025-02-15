import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity, Button,
  Text,
  Alert,
} from 'react-native';
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { ThemedButton } from "../ThemedButton";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useRouter } from 'expo-router';
interface UpdateTaskProps {
  data: any;
}
export default function updateTaskUI({ data }: UpdateTaskProps) {
  console.log("TaskUpdate ",data);
  const [title, setTitle] =  useState<string>(data.title_task);
  const [description, setDescription] =  useState<string>(data.description_task || '');
  const [titleError, setTitleError] = useState(false);
  const backgroundColor = useThemeColor({ light: "#D5D6D8", dark: "#ffffff" }, 'background');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (data) {
      setTitle(data.title_task || '');
      setDescription(data.description_task || '');
    }
  }, [data]);

  
  const apiUpdate = 'http://localhost:80/server/v1/tasks/update-task.php';
  const handleSave = async () => {
  if (title.trim() === '') {
        setTitleError(true);
        setError('El campo Título es obligatorio.');
        return;
      }
      fetch(apiUpdate, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id:data.id, title, description })
      })
        //falta control de entrada no puede estar null el titulo
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            setError(data.error);
            console.error("Error 2: " + " entro en el error");
            Alert.alert("Error!", "Inténtalo más tarde");
            window.alert("Error 2: " + data.message);
          } else {
            // Maneja la respuesta exitosa
            router.push('/?state=true');  
            // Redirige a la pantalla de inicio con el parámetro 'state=true'         
             console.log('Tarea guardada:', data);
            setTitle('');  // Limpiar el campo title
            setDescription('');  // Limpiar el campo description
          }
        })
  
        .catch(error => {
          setError('Error al guardar la tarea');
          console.error('Error al guardar la tarea:', error);
        });


  };


  return (
    <View style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="subtitle">Actualizar tarea</ThemedText>
      </ThemedView>

      <View style={styles.form}>
        <View style={[styles.inputGroup, { backgroundColor }]}>
          <TextInput
            style={[styles.input, titleError && styles.inputError]}
            placeholder={titleError ? 'Ponga un título (Campo obligatorio)' : '*Título'}
            placeholderTextColor={titleError ? 'red' : 'gray'}

            value={title}
            onChangeText={text => {
              setTitle(text);
              if (text.trim() !== '') {
                setTitleError(false);
                setError(null);
              }
            }
            }
          />
        </View>
        <View style={[styles.inputGroup, { backgroundColor }]}>
          <TextInput
            placeholder="Descripción"
            multiline={true}
            numberOfLines={12}
            style={{ textAlignVertical: "top" }}
            value={description}
            onChangeText={setDescription}
          />
        </View>


        <ThemedButton
          style={styles.button}
          lightColor="#3486eb"
          darkColor="#5b34eb"
          onPress={handleSave}
        >
          <Text style={styles.textButton}>Guardar tarea</Text>
        </ThemedButton>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  titleContainer: {
    alignItems: "center",
    marginTop: 2,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
  },
  title: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
  },
  form: {

    padding: 40,
  },
  inputGroup: {
    padding: 10,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 5,
  },
  button: {
    alignItems: "center",
    padding: 12,
    marginTop: 0,
    borderRadius: 5,
    width: "100%",
  },
  textButton: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#fff",
  },
})
