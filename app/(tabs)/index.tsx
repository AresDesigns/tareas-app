import { StyleSheet, Alert } from 'react-native';
import { useState, useEffect } from "react";
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import EmptyTask from '@/components/Tasks/TaskListEmty';
import { useRouter, useSegments } from 'expo-router';
import TaskList from '@/components/Tasks/TaskList';
// Define los tipos de parámetros de la ruta


export default function HomeScreen() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const segments = useSegments();
  const api = 'http://localhost:80/server/v1/tasks/get-tasks.php';
  const apiDelete = 'http://localhost:80/server/v1/tasks/delete-task.php';
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

  useEffect(() => {
    const params = segments[segments.length - 1].split('?')[1];
    const urlParams = new URLSearchParams(params);
    const state = urlParams.get('state');
    console.error("dentro");
    getTasks();

    if (state !=undefined && state == 'true') {
      getTasks();
      console.error("dentro");
      // Actualiza la URL para evitar llamadas repetitivas a getTasks
      router.push('/(tabs)/index?state=false');
    }
  }, [segments]);

  const deleteTask = async (ide: number) => {
    console.error("valor es" + ide);
    const response = await fetch(apiDelete, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ide: ide }),
    })

    const data = await response.json();

    if (data.message === 'error') {
      Alert.alert('¡Error!', 'No ha sido posible obtener el resultado');
      console.error('response bad 1', data.message);
    } else {
      // Obtenemos la respuesta del backend
      console.error('response well', " Exitosa con id Json " + "  " + data + " con id de entrada: " + ide);
      getTasks();
    }

  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#e36d29', dark: '#2983e3' }}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="subtitle">Tareas</ThemedText>
      </ThemedView>

      {tasks.length > 0 ? (
        tasks.map((data, ide) => {
          return <TaskList key={ide} data={data} deleteTask={deleteTask} />;
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
