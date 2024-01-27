import { useState, useEffect } from "react"
import { Equipos } from "../JSON/equipos.json"
import axios from "axios";


export const Test = () => {
    const API_HOME = "http://192.168.0.49:5000/Home";
    let result = []
    const [maquina , setMaquina] = useState([])
 
      async function readApi(){
         
         try {
            const response = await axios.get(API_HOME);
            console.log(response);
            result = response.data.Eqipos || [];
            console.log(result);
         } catch (error) {
             console.error(error);
             result = Equipos
         }
         console.log("Resultado final:", result);
         return result;
      }
 
      useEffect(() => {
        const fetchData = async () => {
          try {
            const apiData = await readApi();
            setMaquina(apiData);
            console.log(apiData);
          } catch (error) {
            console.error("Error al obtener datos:", error); // Puedes manejar el error actualizando el estado según sea necesario
          }
        };
      
        fetchData();
      
        const intervalId = setInterval(fetchData, 1000);
        console.log(intervalId);
      
        return () => clearInterval(intervalId);
      }, []);



      return (
        <>
          <h2>Mensaje</h2>
          {maquina.map((equipoApi) => {
            console.log(equipoApi);
            return (
              <>
                <h2 >Mensaje: {equipoApi.NOMBRE_EQUIPO == undefined ? "no hay dato" : equipoApi.NOMBRE_EQUIPO }</h2>
                <h2 >Mensaje: {equipoApi.NOMBRE_RECETA == undefined ? "no hay dato" : equipoApi.NOMBRE_RECETA }</h2>
                <h2 >Mensaje: {equipoApi.TIEMPO_TRANSCURRIDO == undefined ? "no hay dato" : equipoApi.TIEMPO_TRANSCURRIDO }</h2>
              </>
            )
          })}
        </>
      )
}



       