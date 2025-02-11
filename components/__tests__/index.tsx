import { Image, StyleSheet, Platform, View ,Text, Alert} from 'react-native';
import { useState, useEffect } from "react";
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import  Task  from '@/components/Tasks/TaskListEmty';

import  Task1  from '@/components/Tasks/TaskList';
import { white } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

export default function HomeScreen() {
  const [tasks, setTasks] = useState([]);
  const api = "";
    useEffect(() => {
        fetch('http://localhost:80/server/api.php') // Ajusta TU_IP_LOCAL y el puerto si es necesario
            .then(response => response.json())
            .then(data => setTasks(data))
            .catch(error => console.error('Error al recuperar los datos:', error));
    }, []);




  return (

    <View>
    {tasks.map((item, index) => (
        <Text style={styles.text} key={index}>{JSON.stringify(item)}</Text>
    ))}
</View>
  
  );} 


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
    color: "white",
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
