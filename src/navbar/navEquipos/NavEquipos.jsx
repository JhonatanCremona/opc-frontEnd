import { useParams } from "react-router"
import Style from "./NavEquipos.module.css"

//Imagenes
import Cocina from "../../IMG/cocina/E1_icono.png";
import Enfriador from "../../IMG/sinfondo/E2_icono.png";

//Context

export const NavEquipos = ({url}) => {
    let { equipo } = useParams();
    return (
        <nav className={Style.equipoNav}>
            <article className={Style.ComponentImagen}>
                <a href= {`/panel-${url}/Cocina1`} className={Style.boxImagen}
                >
                    <img  src={ Cocina } alt="Imagen Cocina" /> 
                </a>
                <div className={equipo == "Cocina1" ? Style.Box : Style.BoxInactive}></div>
            </article>
            
            <article>
            <a 
                href= {`/panel-${url}/Enfriador1`} 
                className={Style.boxImagen}>
                <img src={ Enfriador } alt="Imagen Enfriador" /> 
            </a> 
            <div className={equipo == "Enfriador1" ? Style.Box: Style.BoxInactive }></div>    
            </article> 
        </nav>        
    )

}