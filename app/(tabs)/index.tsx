import { Image, StyleSheet, Platform, View ,Text} from 'react-native';
import { useState, useEffect } from "react";
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import  Task  from '@/components/Tasks/TaskListEmty';
export default function HomeScreen() {
  const [tasks, setTasks] = useState([]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#e36d29', dark: '#2983e3' }}
      >
     
     <ThemedView style={styles.titleContainer}>
        <ThemedText  type="subtitle">Tareas</ThemedText>
     </ThemedView>
      
      {tasks.length > 0 ? (
        tasks.map((data, i) => {
          return 0;
        })
      ) : (
         <Task />      
      )}


    </ParallaxScrollView>
  );
}

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
