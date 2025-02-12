const Config = ({
    API: checkPort()
    
})

export default function checkPort() {
  //añadimos los puertos donde alojen los servicios si es expo tiene que estar el backend fuera
    const ports = ["http://localhost:80/", "http://localhost:443/","http://localhost:8081/"]; // Agrega más puertos si es necesario
    for (let port of ports) {
        if (isPortAvailable(port)) {
            return port;
        }
    }
    return ports[0]; // Valor por defecto si no se encuentra ningún puerto disponible
}

function isPortAvailable(port) {
    // Aquí puedes agregar la lógica para verificar si el puerto está disponible
    // Por ejemplo, puedes hacer una solicitud HTTP y verificar la respuesta
    return true; // Cambia esto según la lógica de verificación
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