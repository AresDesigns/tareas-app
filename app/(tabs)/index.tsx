import { StyleSheet, Alert } from 'react-native';
import { useState, useEffect } from "react";
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import EmptyTask from '@/components/Tasks/TaskListEmty';
import { useRouter, useSegments } from 'expo-router';
import TaskList from '@/components/Tasks/TaskList';
import ConfigApi, { getApiGet, getApiDelete } from '@/api/config';
// Define los tipos de parámetros de la ruta


export default function HomeScreen() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const segments = useSegments();
  const api = ConfigApi.api
  const apiGet = api + getApiGet();
  const apiDelete = api + getApiDelete();
  useEffect(() => {
    getTasks();
  }, [tasks.length]);


  const getTasks = async () => {
    fetch(apiGet)
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
    if (segments && segments.length > 0) {
      console.error(segments);
      getTasks();
    }
  }, [segments]);

  const deleteTask = async (id: number) => {
    fetch(apiDelete, {
      method: "post",
      headers: {
        Accept: "application/json",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: id }), // Ensure that the key is 'id'
    })
      .then(response => response.text())
      .then(text => {
        console.error("2-Response text:", text); // Log to check the response text
        try {
          const data = JSON.parse(text);
          console.error("3-Parsed data:", data); // Log to check the parsed data
          if (data.success) {
            console.error('response well', "Exitosa con id Json " + data.id + " con id de entrada: " + id);
            getTasks();
          } else {
            Alert.alert('¡Error!', 'No ha sido posible obtener el resultado');
            console.error('response bad 1', data.error);
          }
        } catch (e) {
          Alert.alert('Error!', 'Inténtalo más tarde');
          console.error('Error al parsear JSON:', text);
        }
      })
      .catch(error => {
        setError('Error al eliminar la tarea');
        console.error('Error al eliminar la tarea:', error);
      });
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
