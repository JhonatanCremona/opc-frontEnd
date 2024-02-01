import { useParams } from "react-router"
import axios from "axios";
import { useEffect} from "react";
import Reporte from "../JSON/Reporte.json"
import Style from "./PanelControl.module.css"

//Imagenes
import { NavEquipos } from "../navbar/navEquipos/NavEquipos";
import { Test } from "../test/Test";
import { SensorSinGrafico } from "../Components/sensores/SensoresSinGrafico";

export const PanelControl = () => {
    const { equipo } = useParams();
    const datosPrueba= Reporte;

    const API_HOME = "http://192.168.0.49:5000/Home";
    let result = [];
 
    async function readApi(){
         
         try {
            const response = await axios.get(API_HOME);
            console.log(response);
            result = response.data.Equipos || [];
            console.log(result);
         } catch (error) {
             console.error(error);
             result = Reporte
         }
         console.log("Resultado final:", result);
         return result;
    }
 
      useEffect(() => {
        const fetchData = async () => {
          try {
            const apiData = await readApi();
            console.log(apiData);
          } catch (error) {
            console.error("Error al obtener datos:", error);
          }
        };
      
        fetchData();
      
        const intervalId = setInterval(fetchData, 1000);
        console.log(intervalId);
      
        return () => clearInterval(intervalId);
      }, []);


    return (
        <div>
            <NavEquipos/>

            <main className={Style.CabeceraPanelControl}>
                <div className={Style.titleBox}>
                    <h2 className={Style.title + " " + Style.CocinaTitle}>COCINA 1</h2>
                    <h3 className={Style.title + " " + Style.Receta}>RECETA: {datosPrueba.NOMBRE_RECETA}</h3>
                </div>
                <section
                className={Style.boxDataTime}
                >
                    <section className={Style.dataTime}>
                        <h2 className={Style.titleElement}>Estado Equipo</h2>
                        <section className={Style.ElementSensor}>
                            <Test value={datosPrueba.componentes.TEMP_INGRESO} nSensor={"TEMP. INGRESO"}/>
                            <Test value={datosPrueba.componentes.TEMP_PRODUCTO} nSensor={"TEMP. PRODUCTO"}/>
                            <Test value={datosPrueba.componentes.TEMP_AGUA} nSensor={"TEMP. AGUA"}/>
                            <SensorSinGrafico value={datosPrueba.componentes.NIVEL_AGUA} nSensor={"NIVEL DE AGUA"}
                            
                            />
                        </section>
                    </section>

                    <section className={Style.dataTime}>
                        <h2 className={Style.titleElement}>Ciclo activo</h2>
                        <section>
                            <article></article>
                            <article></article>
                            <article></article>
                        </section>
                    </section>

                    <section className={Style.dataTime}>
                        <h2 className={Style.titleElement}>Sector IO</h2>
                        <section>
                            <article></article>
                            <article></article>
                            <article></article>
                        </section>
                    </section>

                </section>
            </main>
        
        </div>
    )
}