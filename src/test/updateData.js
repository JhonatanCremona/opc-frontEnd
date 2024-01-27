function realizarSolicitud() {
  const API_HOME = "http://localhost:5005/opcua/equipos";
  // Tu lógica para la solicitud Fetch aquí
  fetch(API_HOME)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // Esperar 5 segundos antes de iniciar la siguiente solicitud
      return new Promise(resolve => setTimeout(resolve, 5000));
    })
    .then(() => realizarSolicitud()) // Llamada recursiva para la siguiente solicitud
    .catch(error => console.error('Error:', error));
}

// Iniciar la secuencia de solicitudes
realizarSolicitud();
  