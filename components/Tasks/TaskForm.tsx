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
   const api = 'http://localhost:80/server/v1/tasks/new-task.php';
  console.log("NewTask", "la direccion es: " + api);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });
  ;
  useEffect(() => {
  }, []);

  const handleChangeText = (name: string, value: string) => {
    setNewTask({ ...newTask, [name]: value });
  };
  const saveTask = async () => {
    const sendData = {
      title: newTask.title,
      description: newTask.description,
    };
    checkServerConnection(api);
    console.error("NewTask", "la direccion es: " + api + " y el sendData es: " + sendData);

    await fetch(api, {
      
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendData),
    })


      .then((res) => res.json())
      .catch((error) => {
        router.push('/');
        Alert.alert("Error!", "Inténtalo más tarde");
        window.alert("Error 1: " + error.message);
        console.error("NewTask Error fecht", "la direccion es: " + api + " y el error es: " 
          + error.message);
       
      })

      .then((response) => {
        console.error('Headers:', Object.fromEntries(response.headers.entries()));

        if (response.message == "error") {
          console.error("Error 2: " + " entro en el error");
          Alert.alert("Error!", "Inténtalo más tarde");
          window.alert("Error 2: " + response.message);
        } else {
          //Redirigimos a tasks
        }
      });

    console.error(newTask);
    setNewTask({
      title: "",
      description: "",
    });
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
            value={newTask.title}
            onChangeText={(value) => handleChangeText("title", value)}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder="Descripción"
            multiline={true}
            numberOfLines={12}
            style={{ textAlignVertical: "top" }}
            value={newTask.description}
            onChangeText={(value) => handleChangeText("description", value)}
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