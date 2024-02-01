import { useParams } from "react-router"
import { Link } from "react-router-dom"
import Style from "./NavEquipos.module.css"

//Imagenes
import Cocina from "../../IMG/Cocina/COTM-09-0001-r01.png"
import Enfriador from "../../IMG/Enfriador/ENTM-09-0001-rev01.png"

export const NavEquipos = () => {
    const { equipo } = useParams();

    console.log("DATO: ", equipo);

    return (
        <nav className={Style.equipoNav}>
            <article className={Style.ComponentImagen}>
                <Link to= {`/panel-control/COCINA1`} className={Style.boxImagen}>
                    <img className={Style.Imagen} src={Cocina} alt="Imagen Cocina" />    
                </Link>
                <div className={equipo == "COCINA1" ? Style.Box : Style.BoxInactive}></div>
            </article>
            
            <article>
            <Link 
                to= {`/panel-control/ENFRIADOR1`} 
                className={Style.boxImagen}>
                <img className={Style.Imagen} src={Enfriador} alt="Imagen Enfriador" /> 
                
            </Link>   
            <div className={equipo == "ENFRIADOR1" ? Style.Box: Style.BoxInactive }></div>    
            </article> 
        </nav>        
    )

}