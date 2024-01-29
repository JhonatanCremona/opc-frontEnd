import { Arrow } from "../Icon/Icon";
import { Link } from "react-router-dom"
import Style from "./Panel.module.css";
import axios from "axios";

import { Equipos } from "../JSON/equipos.json"

import { useState, useContext, useEffect } from "react";
import { PanelContext } from "../context/PanelContext";

import Cocina from "../IMG/Cocina/COTM-09-0001-r01.png"
import Enfriador from "../IMG/Enfriador/ENTM-09-0001-rev01.png"



export const Panel = () =>{
    const API_HOME = "http://192.168.0.49:5000/Home";
    let result = []
    const [maquina , setMaquina] = useState([])
 
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
            <div className={Style.titleBox}>
                <h2 className={Style.title + " " + Style.n1}>EQUIPOS</h2>
                <h3 className={Style.title + " " + Style.n2}>COCINAS & ENFRIADORES</h3>
            </div>

            
            <section className={Style.equipos}>
            { maquina.map(( eqipos ) => {
                return (
                    <div 
                    className={Style.card} 
                    key={eqipos.numero_equipo || eqipos.ID}>
                        <section className={Style.imagen}>
                            <img 
                            className={Style.imgEquipo}
                            src={eqipos.NOMBRE_EQUIPO == "Cocina 1" ? Cocina : Enfriador} alt="" />
                        </section>

                        <section className={eqipos.ESTADO != "OPERACIONAL" ? Style.tagsContainer : Style.tagsContainerOperativo }>
                            <p className={Style.tags}>{eqipos.ESTADO}</p>
                        </section>

                        <section className={Style.cardDetails}>
                            <article>
                                <h2 
                                    className={Style.titleEquipo}>
                                    {eqipos.NOMBRE_EQUIPO}
                                </h2>
                                <h2 className={Style.titleEstado}> {eqipos.ESTADO}</h2>
                                <p className={Style.textTiempoTrans}>
                                    <span>Tiempo transcurrido:</span> {eqipos.TIEMPO_TRANSCURRIDO}
                                    <span className={
                                        eqipos.ESTADO == "OPERACIONAL" ? Style.textReceta : Style.textRecetaNone
                                    }>{"RECETA: " + eqipos.NOMBRE_RECETA}</span>
                                </p>
                                
                            </article>
                            <Link 
                            to={`/panel-control/${eqipos.NOMBRE_EQUIPO.replace(/\s+/g, '-')}`}
                            className={
                                eqipos.nombre_equipo === "Cocina 1" 
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