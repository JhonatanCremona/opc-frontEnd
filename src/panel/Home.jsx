//Dependencies
import { Link } from "react-router-dom"
import Style from "./Panel.module.css";
import { useState,  useEffect, useContext } from "react";
import { transformDataMachine } from "../service/client";
import anime from "animejs";

//import Cocina from "../IMG/cocina/E1_icono.png"
//import Enfriador from "../IMG/enfriador/E2_icono.png"
import Cocina from "../IMG/cocina/E1_sinfondo.png";
import Enfriador from "../IMG/enfriador/E2_sinfondo.png";

import { Arrow } from "../Icon/Icon";

//Context
import { PanelContext } from "../context/PanelContext";

//Component
import "../charts/title/testing.css"

export const Home = () => {
    const [machines , setMachines] = useState([])
    let { setUrlPanel,  } = useContext(PanelContext);

    function animationTitle(className) {
        var textWrapper = document.querySelector(`.${className} .letters`);
        textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
        anime.timeline()
        .add({
            targets: `.${className} .letter`,
            rotateY: [-90, 0],
            duration: 2500,
            delay: (el, i) => 45 * i
        });
    }
    
    useEffect(() => {
        animationTitle("ml10-first");
        animationTitle("ml10-second");
    }, []);
    
    
    
    useEffect(() => {
        const fetchData = async () => { setMachines(await transformDataMachine())};
        fetchData();
        const intervalId = setInterval(fetchData, 5000);
        return () => clearInterval(intervalId);
      }, []);
    

    return (
        <>
            <div className={Style.titleBox}>
                <h2 className={Style.title + " " + Style.n1 +" ml10 ml10-first"}>
                <span className="text-wrapper">
                        <span className="letters">EQUIPOS</span>
                    </span>
                </h2>
                <h3 className={Style.title + " " + Style.n2 + " ml10 ml10-second"}>
                <span className="text-wrapper">
                        <span className="letters">COCINAS & ENFRIADORES</span>
                    </span>
                    </h3>
            </div>

            
            <section className={Style.equipos}>
            {machines.map ((machine) =>{
                return (
                    <div className={Style.card} key={machine.ID}>
                        <section className={Style.imagen}>
                            <img className={Style.imgEquipo}
                            src={machine.NOMBRE_EQUIPO == "Cocina" ? Cocina : Enfriador } alt="ImagenEquipo" />
                        </section>

                        <section className={ machine.ESTADO != "OPERATIVO" ? Style.tagsContainer : Style.tagsContainerOperativo }>
                            <p className={Style.tags}> { machine.ESTADO }</p>
                        </section>

                        <section className={Style.cardDetails}>
                            
                            <article>
                                <h2 className={Style.titleEquipo}> { machine.NOMBRE_EQUIPO } </h2>

                                <h2 className={Style.titleEstado}> { machine.ESTADO }</h2>

                                <p className={Style.textTiempoTrans}>
                                    <span>Tiempo transcurrido: { machine.TIEMPO_TRANSCURRIDO == "0 hs" ? "00:00 hs" : machine.TIEMPO_TRANSCURRIDO }</span> 
                                    
                                    { machine.ESTADO == "OPERATIVO" && <span className={Style.textReceta}> { `RECETA: ${machine.RECETA}` } </span>}
                                    <span className={Style.textReceta}>{`N° Torres: ${ machine.NRO_TORRES }`}</span>
                                </p>
                            </article>

                            <Link 
                                to={`/panel-control/${machine.NOMBRE_EQUIPO.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')}1`}
                                onClick={() => setUrlPanel(`/panel-control/${machine.NOMBRE_EQUIPO.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')}1`)}
                                className={
                                        machine.NOMBRE_EQUIPO === "Cocina" 
                                            ? Style.buttonArrow + " " + Style.buttonCocina 
                                            : machine.NOMBRE_EQUIPO == "Enfriador"
                                            ? Style.buttonArrow + " " + Style.buttonEndriador
                                            : ""
                                    }>VER MAS DETALLES {<Arrow/>}
                            </Link>

                        </section>
                    </div>
                )
            })}
            </section>
        </>
    )
}