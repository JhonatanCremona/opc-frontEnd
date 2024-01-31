import axios from "axios";

//const BASE_URL = "http://192.168.0.95:5000";
const BASE_URL = "http://localhost:5010"

async function mapApiResults(results) {
  return results.map((objeto) => ({
    time: objeto.timestamp,
    value: parseFloat(parseFloat(objeto.value).toFixed(2))
  }));
}


async function ObtenerDatoMasReciente(results) {
  let valorMasReciente = null;
  let marcaDeTiempoMaxima = 0;

  results.forEach(elemento => {
    const marcaDeTiempoActual = new Date(elemento.timestamp).getTime();

    if (marcaDeTiempoActual > marcaDeTiempoMaxima) {
      marcaDeTiempoMaxima = marcaDeTiempoActual;
      valorMasReciente = {
        value: parseFloat(parseFloat(elemento.value).toFixed(2)) 
      }
    }
  });

  // Devolver el valor del elemento más reciente
  return valorMasReciente;
}


async function ReadApiComponents(url, tipo) {
  const API_URL = `${BASE_URL}${url}`;

  switch (tipo) {
    case 1:
      return await readApiHistorico(API_URL)
    case 2:
      return await readApi(API_URL);
  }

}

async function readApi(url) {
  const API_URL = `${BASE_URL}${url}`;
  
  try {
    const response = await axios.get(API_URL);
    console.log(response.data);
    const apiResults = response.data.value || [];
    const estadoMasReciente = {
      value: parseFloat(parseFloat(await apiResults).toFixed(2)) 
    }
    console.log("Resultado final:", estadoMasReciente);
    return estadoMasReciente;
  } catch (error) {
    console.error("Error al realizar la solicitud:", error.message);
    return [];
  }
}


async function readApiHistorico(url) {
  const API_URL = `${BASE_URL}${url}`;
  try {
    const response = await axios.get(API_URL);
    console.log(response.data);
    const apiResults = response.data || [];

    const result = await mapApiResults(apiResults);

    console.log("Resultado final:", result);
    return result;
  } catch (error) {
    console.error("Error al realizar la solicitud:", error.message);
    return [];
  }
}

export { readApi };