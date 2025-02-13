const Config = ({
    api: "http://localhost:80/"
})

const apiGet = 'server/v1/tasks/get-tasks.php';
const apiDelete = 'server/v1/tasks/delete-task.php';
const apiNew = 'server/v1/tasks/new-task.php';
const apiUpdate = 'server/v1/tasks/update-task.php';

export function getApiGet(){
  return apiGet;
};
export function getApiDelete(){
  return apiDelete;
};
export function getApiNew(){
  return apiNew;
}
export function getApiUpdate(){
  return apiUpdate;
}

export const checkServerConnection = async (api) => {
    try {
        const response = await fetch(`${api}?check=connection`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });
  
        const data = await response.json();
        console.error('Respuesta del servidor:', {
          status: response.status,
          data: data,
          headers: response.headers
        });
        
      } catch (error) {
        console.error('Error de conexión:', {
          message: error.message,
          stack: error.stack
        });
      }
  };
  
  // Y usarla antes de saveTask
  const handleSaveTask = async () => {
    const isConnected = await checkServerConnection();
    if (!isConnected) {
      Alert.alert(
        "Error de conexión",
        "No se puede conectar al servidor. Verifica la URL y que el servidor esté funcionando."
      );
      return;
    }
    
    await saveTask();
  };

function getApi() {
    return checkPort();
}

//funciones de fetch, pero no se estan usando, posible modulización
export const saveTask = async (newTask) => {
    const res = await fetch(API, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });
    console.log('Status:', res.status);
    console.log('Status Text:', res.statusText);
    return await res.json();
  };

export const updateTask = async (taskId, newTask) => {
    console.log('Intentando acceder a:', api + "new-task.php");
    console.log(taskId, newTask)
    const res = await fetch(`${checkPort()}/${taskId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });
    console.log('Status:', res.status);
    console.log('Status Text:', res.statusText);
    return res;
  };

  export default Config;