//Dependencies
import { Link } from "react-router-dom"
import Style from "./Panel.module.css";
import { useState,  useEffect, useContext } from "react";
import { transformDataMachine } from "../service/client";

//Images
import Cocina from "../IMG/Cocina/COTM-09-0001-r01.png"
import Enfriador from "../IMG/Enfriador/ENTM-09-0001-rev01.png"
import { Arrow } from "../Icon/Icon";

//Context
import { PanelContext } from "../context/PanelContext";

//Component

export const Home = () => {
    const [machines , setMachines] = useState([])
    let { setUrlPanel } = useContext(PanelContext);



    useEffect(() => {
        const fetchData = async () => { setMachines(await transformDataMachine())};
        console.log(machines)
        fetchData();
        const intervalId = setInterval(fetchData, 10000);
        return () => clearInterval(intervalId);
      }, []);
    

    return (
        <>
            <div className={Style.titleBox}>
                <h2 className={Style.title + " " + Style.n1}>EQUIPOS</h2>
                <h3 className={Style.title + " " + Style.n2}>COCINAS & ENFRIADORES</h3>
            </div>
            
            <section className={Style.equipos}>
            {machines.map ((machine) =>{
                return (
                    <div className={Style.card} key={machine.ID}>
                        <section className={Style.imagen}>
                            <img className={Style.imgEquipo}
                            src={machine.NOMBRE_EQUIPO == "Cocina" ? Cocina : Enfriador} alt="ImagenEquipo" />
                        </section>

                        <section className={ machine.ESTADO != "OPERATIVO" ? Style.tagsContainer : Style.tagsContainerOperativo }>
                            <p className={Style.tags}> { machine.ESTADO }</p>
                        </section>

                        <section className={Style.cardDetails}>
                            
                            <article>
                                <h2 className={Style.titleEquipo}> { machine.NOMBRE_EQUIPO } </h2>

                                <h2 className={Style.titleEstado}> { machine.ESTADO }</h2>

                                <p className={Style.textTiempoTrans}>
                                    <span>Tiempo transcurrido: </span> 
                                    { machine.TIEMPO_TRANSCURRIDO }
                                    { machine.ESTADO == "OPERATIVO" && <span className={Style.textReceta}> { `RECETA: ${machine.RECETA}` } </span>}
                                    <span className={Style.textReceta}>{`N° Torres: ${ machine.NRO_TORRES }`}</span>
                                </p>
                            </article>

                            <Link 
                                to={`/panel-control/${machine.NOMBRE_EQUIPO.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')}`}
                                onClick={() => setUrlPanel(`/panel-control/${machine.NOMBRE_EQUIPO.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')}`)}
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