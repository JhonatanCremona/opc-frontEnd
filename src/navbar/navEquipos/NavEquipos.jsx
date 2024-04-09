import { useParams } from "react-router"
import { Link } from "react-router-dom"
import Style from "./NavEquipos.module.css"
import { useContext } from "react"

//Imagenes
import Cocina from "../../IMG/Cocina/COTM-09-0001-r01.png"
import Enfriador from "../../IMG/Enfriador/ENTM-09-0001-rev01.png"

//Context
import { PanelContext } from "../../context/PanelContext";

export const NavEquipos = ({url}) => {
    let { equipo } = useParams();



    return (
        <nav className={Style.equipoNav}>
            <article className={Style.ComponentImagen}>
                <a href= {`/panel-${url}/Cocina1`} className={Style.boxImagen}
                >
                    <img className={Style.Imagen} src={Cocina} alt="Imagen Cocina" />    
                </a>
                <div className={equipo == "Cocina1" ? Style.Box : Style.BoxInactive}></div>
            </article>
            
            <article>
            <a 
                href= {`/panel-${url}/Enfriador1`} 
                className={Style.boxImagen}>
                <img className={Style.Imagen} src={Enfriador} alt="Imagen Enfriador" /> 
            </a> 
            <div className={equipo == "Enfriador1" ? Style.Box: Style.BoxInactive }></div>    
            </article> 
        </nav>        
    )

}