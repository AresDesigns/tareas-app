import { useThemeColor } from "@/hooks/useThemeColor";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
interface TaskListProps {
  data: any;
  deleteTask: (id: any) => Promise<void>;
  updateTask: any;
}

const TaskList: React.FC<TaskListProps> = ({ data, deleteTask, updateTask }) => {
  const backgroundColor = useThemeColor({ light: "#D5D6D8", dark: "#ffffff" }, 'background');
  const colorText = useThemeColor({ light: "#D5D6D8", dark: "#ffffff" }, "text");

  const  update = ()=> {
    console.log("update button");
  }
  return (
    <View style={[styles.item, { backgroundColor }]}>
      <Text style={styles.textDate}>{data.date_task}</Text>
      <Text style={styles.title}>{data.title_task}</Text>
      <View style={styles.description}>
        <Text style={styles.textDescription}>{data.description_task}</Text>
      </View>

      <View style={styles.action}>
        <TouchableOpacity
          style={[styles.buttonDelete,styles.button]}
          onPress={() => deleteTask(data.id)}
        >
          <ThemedText style={styles.textButton} lightColor="#000000" darkColor="#ffffff">Delete</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.buttonUpdate,styles.button]}
          onPress={() => {updateTask(data); update(); }}
        >
          <ThemedText style={styles.textButton} lightColor="#000000" darkColor="#ffffff">Actualizar</ThemedText>
        </TouchableOpacity>
      </View>

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
    marginLeft: 7,
    marginRight:7,
  },
  buttonDelete: {
    marginTop: 15,
    backgroundColor: "red",
    width: 100,
    borderRadius: 5,
  },
  textButton: {
    padding: 5,
    textAlign: "center",
  },
  action:{
    flex: 1,
    flexWrap: "wrap",
    flexDirection: 'row',
  },
  textDate: {
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,

  },
  buttonUpdate:{
      backgroundColor:"blue",
      marginTop: 15,
      width: 100,
      borderRadius: 5,
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