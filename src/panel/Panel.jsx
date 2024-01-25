import { Arrow } from "../Icon/Icon";
import { Link } from "react-router-dom"
import Style from "./Panel.module.css";

import { Equipos } from "../JSON/equipos.json"

import { useState, useEffect } from "react";


export const Panel = () =>{
    const [equipos, setEquipos] = useState(Equipos);

    const API_HOME = "http://192.168.0.85:5000/Home"

    const [ data, setData ]= useState(null);

    useEffect(()=>{
        async function getData() {
                 fetch(API_HOME)
            .then(response => response.json())
            .then(data => console.log(data))
            }
    },[]) 

    

    const transformData  = (equipo_online) =>{
        equipo_online.map((online) => {
            if(online.ESTADO !== "SIN OPERACION ") {
                
                equipos.forEach((equipo) => {
                    if(equipo.NOMBRE_EQUIPO === online.NOMBRE_EQUIPO
                        && equipo.numero_equipo === online.numero_equipo) {
                        equipo.ESTADO = online.ESTADO;
                        equipo.TIEMPO_TRANSCURRIDO = online.TIEMPO_TRANSCURRIDO;
                        equipo.NOMBRE_RECETA = online.NOMBRE_RECETA;
                    }
                })
            }
        })
    }
        
    return (
        <>
            <div className={Style.titleBox}>
                <h2 className={Style.title + " " + Style.n1}>EQUIPOS</h2>
                <h3 className={Style.title + " " + Style.n2}>COCINAS & ENFRIADORES</h3>
            </div>

            
            <section className={Style.equipos}>
            { Equipos.map(( eqipos ) => {
                return (
                    <div className={Style.card} key={eqipos.numero_equipo}>
                        <section>
                            <img src="" alt="" />
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
                                    <span className={eqipos.ESTADO === "OPERACIONAL" ? Style.textReceta : Style.textRecetaNone}>{"RECETA: " + eqipos.NOMBRE_RECETA}</span>
                                </p>
                                
                            </article>
                            <Link className={
                                eqipos.NOMBRE_EQUIPO === "COCINA 1" 
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