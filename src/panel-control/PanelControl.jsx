import { useParams } from "react-router"
import axios from "axios";
import { useContext, useEffect, useState} from "react";
import Reporte from "../JSON/Reporte.json"
import Style from "./PanelControl.module.css"

//Imagenes
import ImagenAgua from "../Icon/el-ciclo-del-agua.png";
import Reloj from "../Icon/reloj.png";
import ImagenValvulaActiva from "../Icon/valvulaActive.png";
import ImagenTemperatura from "../Icon/temperatura.png";
import ImagenRecetaActiva from "../Icon/recetas.png";

//Components
import { NavEquipos } from "../navbar/navEquipos/NavEquipos";
import { SensorSinGrafico } from "../Components/sensores/SensoresSinGrafico";
import { SensorGrafico } from "../Components/sensores/SensorGrafico";
import { PanelContext } from "../context/PanelContext";

export const PanelControl = () => {
    const datosPrueba= Reporte;
    const [datos, setDatos] = useState({})
    const { urlPanel } = useContext(PanelContext)

    /**/
   const API_REPORTE = "http://192.168.0.95:5000/Reporte/Cocina1";
    let result = [];
 
    async function readApi(){
         try {
            const response = await axios.get(API_REPORTE);
            console.log(response.data);
            result = response.data || [];
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
            setDatos(apiData);
          } catch (error) {
            console.error("Error al obtener datos:", error);
          }
        };
      
        fetchData();
      
        const intervalId = setInterval(fetchData, 10000);
        console.log(intervalId);
      
        return () => clearInterval(intervalId);
      }, []);
      console.log("CONTEXTO_DATA: " + urlPanel);
      

    return (
        <div>
            <NavEquipos/>

            <main className={Style.CabeceraPanelControl}>
                <div className={Style.titleBox}>
                    <h2 className={Style.title + " " + Style.CocinaTitle}>{datos.NOMBRE_EQUIPO}</h2>
                    <h3 className={Style.title + " " + Style.Receta}>RECETA: { datos.NRO_RECETA + " - " +  datos.NOMBRE_RECETA}</h3>
                </div>
                <section
                className={Style.boxDataTime}
                >
                    <section className={Style.dataTime}>
                        <h2 className={Style.titleElement}>Estado Equipo</h2>
                        <h3 className={Style.subTitleElement}>{datosPrueba.componentes.ESTADO}</h3>
                        <section className={Style.ElementSensor}>
                            <SensorGrafico value={datos.componentes.TEMP_INGRESO} tipo={"°C"} nSensor={"TEMP. INGRESO"} imgSensor={ImagenTemperatura}/>
                            <SensorGrafico value={datos.componentes.TEMP_PRODUCTO} tipo={"°C"} nSensor={"TEMP. PRODUCTO"} imgSensor={ImagenTemperatura}/>
                            <SensorGrafico value={datos.componentes.TEMP_AGUA} tipo={"°C"} nSensor={"TEMP. AGUA"} imgSensor={ImagenTemperatura}/>
                            { datos.NOMBRE_EQUIPO !== "Cocina" && 
                                <SensorGrafico value={datos.componentes.TEMP_CHILLER} nSensor={"TEMP. CHILLER"}/>
                            }
                            <SensorSinGrafico value={datos.componentes.NIVEL_AGUA} tipo={"mm"}  nSensor={"NIVEL DE AGUA"} imgSensor={ImagenAgua}/>
                        </section>
                    </section>

                    <section className={Style.dataTime}>
                        <h2 className={Style.titleElement}>Ciclo activo</h2>
                        <h3 className={Style.subTitleElement}>{datosPrueba.componentes.ESTADO}</h3>
                        <section className={Style.ElementSensor +" "+Style.ElementSecond}>
                            <SensorSinGrafico value={"02:00"} tipo={"hs"}  nSensor={"Tiempo Transcurrido"} imgSensor={Reloj}/>
                            <SensorSinGrafico value={ datos.NRO_PASOS }  nSensor={"N° Pasos"}/>
                            <SensorSinGrafico value={ datos.NRO_RECETA } nSensor={"N° Receta"} imgSensor={ImagenRecetaActiva}/>
                            <SensorSinGrafico value={ "2"} nSensor={"N° Torres"}/>
                        </section>
                    </section>

                    <section className={Style.dataTime}>
                        <h2 className={Style.titleElement}>Sector IO</h2>
                        <h3 className={Style.subTitleElement}>{datosPrueba.componentes.ESTADO}</h3>
                        <section className={Style.ElementSensor}>
                            <SensorSinGrafico value={ datos.componentes.VAPOR_VIVO ? "Activo" : "Inactivo" } nSensor={"Vapor Vivo"} imgSensor={ImagenValvulaActiva}/>
                            <SensorSinGrafico value={ datos.componentes.VAPOR_SERPENTINA ? "Activo" : "Inactivo"} nSensor={"Vapor Serpentina"} imgSensor={ImagenValvulaActiva}/>
                        </section>
                    </section>

                </section>
            </main>
        
        </div>
    )
}