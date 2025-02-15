import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Stack, useRouter, useLocalSearchParams, useGlobalSearchParams } from 'expo-router'
import ConfigApi, { updateTask } from '@/api/config'; // Importar funciones de API
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import EmptyTask from '@/components/Tasks/TaskListEmty';
import UpdateTask from '@/components/Tasks/TaskUpdate';

export default function UpdateTaskScreen() {
  console.error("updateTask ","1. Entramos a la pantalla de actualizar tarea");

  const  params  = useLocalSearchParams();

  let task = typeof params.task === 'string' ? JSON.parse(params.task) : params.task;


  const [title, setTitle] = useState<string>(task.title_task || '');
  const [description, setDescription] = useState<string>(task.description_task || '');

  console.error("updateTask ");


  /*const handleSave = async () => {
    try {
      const response = await fetch(apiUpdate, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: params.id, title, description }),
      });
      const data = await response.json();
      if (data.success) {
        Alert.alert('Éxito', 'Tarea actualizada correctamente.');
        router.push('/'); // Regresar a la pantalla principal
      } else {
        Alert.alert('Error', 'No se pudo actualizar la tarea.');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar la tarea.');
      console.error('Error al actualizar la tarea:', error);
    }
  */
    return (
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#e36d29', dark: '#2983e3' }}
      >
  
        {task ? (
            <UpdateTask data={task} />
       
        ) : (
          //<UpdateTask data={null}/>
            <EmptyTask/>
        )}
  
  
      </ParallaxScrollView>
    );
    /*
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Actualizar Tarea</Text>
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Guardar Cambios" onPress={handleSave} />
    </View>
  );*/
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
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
})
