import { useThemeColor } from "@/hooks/useThemeColor";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import {ThemedText} from "@/components/ThemedText";
  interface TaskListProps {
    data: any;
    deleteTask: (id: any) => Promise<void>;
}

const TaskList: React.FC<TaskListProps> = ({ data, deleteTask }) => {
    const backgroundColor = useThemeColor({ light: "#D5D6D8", dark: "#ffffff" }, 'background');
    const colorText = useThemeColor({ light: "#D5D6D8", dark: "#ffffff" },"text");

    return (
      <View style={[styles.item,{ backgroundColor }]}>
        <Text style={styles.textDate}>{data.date_task}</Text>
        <Text style={styles.title}>{data.title_task}</Text>
        <View style={styles.description}>
          <Text style={styles.textDescription}>{data.description_task}</Text>
        </View>
  
        <TouchableOpacity
          style={styles.button}
          onPress={() => deleteTask(data.id)}
                 >
                  <ThemedText style={styles.textButton} lightColor="#000000" darkColor="#ffffff">Delete</ThemedText>
        </TouchableOpacity>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    item: {
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 5,
      borderColor: "#AAA",
      borderWidth: 1,
      marginTop: 15,
    },
    button: {
      marginTop: 15,
      backgroundColor: "red",
      width: 100,
      borderRadius: 5,
    },
    textButton: {
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
  
  export default TaskList;