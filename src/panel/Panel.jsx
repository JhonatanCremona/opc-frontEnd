import { Arrow } from "../Icon/Icon";
import { Link, useParams } from "react-router-dom"
import Style from "./Panel.module.css";
import axios from "axios";

import { Equipos } from "../JSON/equipos.json"

import { useState,  useEffect, useContext } from "react";

import Cocina from "../IMG/Cocina/COTM-09-0001-r01.png"
import Enfriador from "../IMG/Enfriador/ENTM-09-0001-rev01.png"
import { PanelContext } from "../context/PanelContext";


export const Panel = () =>{
    let { setUrlPanel } = useContext(PanelContext);
    const API_HOME = "http://192.168.0.95:5000/Home";
    let result = []
    const [maquina , setMaquina] = useState([])

    function EstadoMaquina(value) {
        switch (value) {
            case 1:
                return "Pre Operativo"
            case 2:
                return "OPERATIVO"
            case 3:
                return "PAUSA"
            case 4:
                return "INACTIVO"
            case 5:
                return "CANCELADO"
            case 6:
                return "FINALIZADO"
            default:
                return "Error"
        }
    }
 
      async function readApi(){
         try {
            const response = await axios.get(API_HOME);
            console.log(response);
            result = response.data.Equipos || [];
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
        <>
            <div className={Style.titleBox}>
                <h2 className={Style.title + " " + Style.n1}>EQUIPOS</h2>
                <h3 className={Style.title + " " + Style.n2}>COCINAS & ENFRIADORES</h3>
            </div>

            
            <section className={Style.equipos}>
            { maquina.map(( eqipos ) => {
                return (
                    <div className={Style.card} key={eqipos.NOMBRE_EQUIPO || eqipos.ID}>
                        <section className={Style.imagen}>
                            <img 
                            className={Style.imgEquipo}
                            src={eqipos.NOMBRE_EQUIPO == "Cocina" ? Cocina : Enfriador} alt="" />
                        </section>

                        <section className={EstadoMaquina(eqipos.ESTADO) != "OPERATIVO" ? Style.tagsContainer : Style.tagsContainerOperativo }>
                            <p className={Style.tags}>{EstadoMaquina(eqipos.ESTADO) }</p>
                        </section>

                        <section className={Style.cardDetails}>
                            <article>
                                <h2 
                                    className={Style.titleEquipo}>
                                    {eqipos.NOMBRE_EQUIPO}
                                </h2>

                                <h2 className={Style.titleEstado}> { EstadoMaquina(eqipos.ESTADO) }</h2>

                                <p className={Style.textTiempoTrans}>
                                    <span>Tiempo transcurrido:</span> {eqipos.TIEMPO_TRANSCURRIDO}
                                    <span className={
                                        EstadoMaquina(eqipos.ESTADO) == "OPERATIVO" ? Style.textReceta : Style.textRecetaNone
                                    }>{"RECETA: " + eqipos.NRO_RECETA +"-"+ eqipos.NOMBRE_RECETA}</span>
                                    <span className={Style.textReceta}>{"N° TORRES:  " + eqipos.NRO_TORRES}</span>
                                </p>
                                
                            </article>
                            <Link 
                            to={`/panel-control/${eqipos.NOMBRE_EQUIPO.replace(/\s+/g, '-')}`}
                            onClick={setUrlPanel(`/panel-control/${eqipos.NOMBRE_EQUIPO.replace(/\s+/g, '-')}`)}
                            className={
                                eqipos.NOMBRE_EQUIPO === "Cocina" 
                                ? Style.buttonArrow + " " + Style.buttonCocina 
                                : Style.buttonArrow + " " + Style.buttonEndriador
                                }>VER MAS DETALLES {<Arrow/>}</Link>
                        </section>
                    </div>
                )
            })
            }
            </section>
        </>
    )
} 