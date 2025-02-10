import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Config from "@/server/config/api/config";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { NavigationProp } from "@react-navigation/native";
interface NewTaskProps {
  navigation: NavigationProp<any>;
}

const NewTask: React.FC<NewTaskProps> = ({ navigation }) => {
   const api = Config.api;

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });

  const handleChangeText = (name: string, value: string) => {
    setNewTask({ ...newTask, [name]: value });
  };

  const saveTask = async () => {
    const sendData = {
      title: newTask.title,
      description: newTask.description,
    };

    await fetch(api + "new-task.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendData),
    })
      .then((res) => res.json())
      .catch((error) => {
        Alert.alert("Error!", "Inténtalo más tarde");
        window.alert("Error: " + error);
      })
      .then((response) => {
        if (response.message == "error") {
          Alert.alert("Error!", "Inténtalo más tarde");
          window.alert("Error: " + response.message);

        } else {
          //Redirigimos a tasks
          navigation.navigate("Tareas", {state: true});
        }
      });

    console.log(newTask);
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
        <TouchableOpacity style={styles.button} onPress={saveTask}>
          <Text style={styles.textButton}>Guardar tarea</Text>
        </TouchableOpacity>
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
    backgroundColor: "#1f232b",
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