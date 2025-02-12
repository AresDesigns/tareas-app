import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import React, { useState,useEffect } from "react";
import Config,{checkServerConnection, saveTask} from "@/server/config/api/config";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { ThemedButton } from "../ThemedButton";
import { useRouter } from 'expo-router';

const NewTask = ()=> {
  const router = useRouter();
const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
   const api = 'http://localhost:80/server/v1/tasks/new-task.php';

  ;
  useEffect(() => {
  }, []);

  
  const saveTask = async () => {
   
    fetch('http://localhost:80/server/v1/tasks/new-task.php', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, description })
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
              router.push('/');  // Redirige a la pantalla de inicio
              console.log('Tarea guardada:', data);
              setTitle('');  // Limpiar el campo title
              setDescription('');  // Limpiar el campo description
          }
      })
     
        .catch(error => {
          setError('Error al guardar la tarea');
          console.error('Error al guardar la tarea:', error);
      });
        

    /*console.error(newTask);
    setNewTask({
      title: "",
      description: "",
    });*/
  };


  return (
    <View style={styles.container}>
     <ThemedView style={styles.titleContainer}>
             <ThemedText  type="subtitle">Crear nueva tarea</ThemedText>
          </ThemedView>

      <View style={styles.form}>
        <View style={styles.inputGroup }>
          <TextInput
            placeholder="Título"
            value={title}
            onChangeText={setTitle}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder="Descripción"
            multiline={true}
            numberOfLines={12}
            style={{ textAlignVertical: "top" }}
            value={description}
            onChangeText={ setDescription}
          />
        </View>
      

        <ThemedButton
          style={styles.button}
          lightColor="#3486eb"
          darkColor="#5b34eb"
          onPress={saveTask}
        >            
          <Text style={styles.textButton}>Guardar tarea</Text>
        </ThemedButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    alignItems: "center",
    marginTop: 20,
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
    backgroundColor: "#fff",
  },
  errorText: {
    color: 'red',
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
});

export default NewTask;