import { Image, StyleSheet, Platform, View ,Text, Alert} from 'react-native';
import { useState, useEffect } from "react";
import { HelloWave } from '@/components/HelloWave';
import { useNavigation, useRoute } from '@react-navigation/native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import  EmptyTask  from '@/components/Tasks/TaskListEmty';
import { useRouter,useSegments } from 'expo-router';

import  TaskList  from '@/components/Tasks/TaskList';
// Define los tipos de parámetros de la ruta


export default function HomeScreen() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState<string | null>(null);
const router = useRouter();
const segments = useSegments();
  const api = 'http://localhost:80/server/v1/tasks/get-tasks.php';
  const apiDelete= 'http://localhost:80/server/v1/tasks/delete-task.php';
  useEffect(() => {
    getTasks();
  }, [tasks.length]);

    const getTasks = async () => {
    fetch(api)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                setError(data.error);
            } else {
              setTasks(data.tasks);
            }
        })
        .catch(error => {
            setError('Error al recuperar los datos');
            console.error('Error al recuperar los datos:', error);
        });
};
const deleteTask = async (id:any) => {
  console.log(id);
  const sendData = {
    id: id,
  };
  await fetch(apiDelete, {
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
    })
    .then((response) => {
      if (response.message == "error") {
        Alert.alert("¡Error!", "No ha sido posible obtener el resultado");
      } else {
        //Obtenemos la respuesta del backend
        getTasks();
      }
    });
};


    useEffect(() => {
        const params = segments[segments.length - 1].split('?')[1];
        const urlParams = new URLSearchParams(params);
        const state = urlParams.get('state');

        if (state && state === 'true') {
            getTasks();
            // Actualiza la URL para evitar llamadas repetitivas a getTasks
            const basePath = segments.slice(0, segments.length - 1).join('/');
            router.push('/(tabs)/index?state=false');
          }
    },   [segments]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#e36d29', dark: '#2983e3' }}
      >
     
     <ThemedView style={styles.titleContainer}>
        <ThemedText  type="subtitle">Tareas</ThemedText>
     </ThemedView>
      
      {tasks.length > 0 ? (
        tasks.map((data, i) => {
          return <TaskList key={i} data={data} deleteTask={deleteTask}   />;
        })      
      ) : (
        <EmptyTask />
      )}


    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  parallaxScrollView: {
    // Aplica el estilo aquí
    borderRadius: 10, // Ajusta el valor según sea necesario
    overflow: 'hidden', // 
  },
  titleContainer: {

    justifyContent: 'center',
    marginTop: 2,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
noDataText: {
    fontSize: 16,
    color: '#333',
},
  text: {
    textAlign: "center",
    marginTop: 20,
  },
  reactLogo: {
    height: 300,
    width: 300,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});
