import { Arrow } from "../Icon/Icon";
import { Link } from "react-router-dom"
import Style from "./Panel.module.css";

import { Equipos } from "../JSON/equipos.json"
import { EquiposTest } from "../JSON/equipo-inactivo.json"

import { useState, useEffect, useContext } from "react";
import { PanelContext } from "../context/PanelContext";


export const Panel = () =>{
    const [ equipos, setEquipos] = useState(Equipos);
    const { setUrlPanel } = useContext(PanelContext);

    const transformData  = (equipo_online) =>{
        equipo_online.map((online) => {
            if(online.estado !== "SIN OPERACION ") {
                
                equipos.forEach((equipo) => {
                    if(equipo.nombre_equipo === online.nombre_equipo
                        && equipo.numero_equipo === online.numero_equipo) {
                        equipo.estado = online.estado;
                        equipo.tiempo_transcurrido = online.tiempo_transcurrido;
                        equipo.receta = online.receta;
                    }
                })
            }
        })
    }
        transformData(EquiposTest)

    function saveRoute(url) {
        console.log(url);
    }
        
    return (
        <>
            <div className={Style.titleBox}>
                <h2 className={Style.title + " " + Style.n1}>EQUIPOS</h2>
                <h3 className={Style.title + " " + Style.n2}>COCINAS & ENFRIADORES</h3>
            </div>

            
            <section className={Style.equipos}>
            { equipos.map(( eqipos ) => {
                return (
                    <div className={Style.card} key={eqipos.numero_equipo}>
                        <section>
                            <img src="" alt="" />
                        </section>

                        <section className={Style.cardDetails}>
                            <article>
                                <h2 
                                    className={Style.titleEquipo}>
                                    {eqipos.nombre_equipo}
                                </h2>
                                <h2 className={Style.titleEstado}> {eqipos.estado}</h2>
                                <p className={Style.textTiempoTrans}>
                                    <span>Tiempo transcurrido:</span> {eqipos.tiempo_transcurrido}
                                    <span className={eqipos.estado === "OPERACIONAL" ? Style.textReceta : Style.textRecetaNone}>{"RECETA: " + eqipos.receta}</span>
                                </p>
                                
                            </article>
                            <Link 
                            to={`/panel-control/${eqipos.nombre_equipo.replace(/\s+/g, '-')}`}
                            onClick={setUrlPanel(`/panel-control/${eqipos.nombre_equipo.replace(/\s+/g, '-')}`)}
                            className={
                                eqipos.nombre_equipo === "COCINA 1" 
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