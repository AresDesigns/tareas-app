import {
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    View,
  } from "react-native";
  import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
  const Task = () => {
    return (
        <ThemedView style={styles.emptyContainer}>
                   <Image style={styles.reactLogo}
               source={require('@/assets/images/Empty.png')}
               resizeMode="contain"
             />
       
                 <ThemedText style={styles.text} type="subtitle">
                Aún no hay tareas</ThemedText>
       
                <ThemedText style={styles.text} type="default">
                   Agrega tus tareas para{'\n'} 
                   comenzar a organizar tu día.{'\n'}
                   Haz tu primera tarea ahora y {'\n'}
                   haz un seguimiento de tus tareas pendientes.
               </ThemedText>
               </ThemedView>
    );
  };
  
  const styles = StyleSheet.create({
    item: {
      backgroundColor: "#f9f9f9",
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 5,
      borderColor: "#AAA",
      borderWidth: 1,
      marginTop: 15,
    },
    reactLogo: {
        height: 300,
        width: 300,
      },
    text: {
        textAlign: "center",
        marginTop: 20,
      },
    button: {
      marginTop: 15,
      backgroundColor: "red",
      width: 100,
      borderRadius: 5,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
      },
    textButton: {
      color: "#fff",
      padding: 5,
      textAlign: "center",
    },
    textDate: {
      marginBottom: 10,
    },
    title: {
      fontWeight: "bold",
      fontSize: 20,
      marginBottom: 10,
  
    },
    description: {
      borderWidth: 0.5,
      borderRadius: 5,
      backgroundColor: "#fff",
    },
    textDescription: {
      padding: 10,
    }
  });
  
  export default Task