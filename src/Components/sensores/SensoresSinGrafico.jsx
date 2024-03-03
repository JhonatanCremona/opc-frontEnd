import Style from "./SensorNoneChart.module.css";
//Imagen
import ImgReloj from "../../Icon/reloj.png";
import ImgRelojInactive from "../../Icon/relojInactive.png";
import ImgValvula from "../../Icon/valvulaActive.png";
import ImgValvulaInactive from "../../Icon/valvulaInactive.png";
import ImgReceta from "../../Icon/recetas.png";
import ImgRecetaInactive from "../../Icon/recetasInactive.png";
import ImgPasos from "../../Icon/pasos.png";
import ImgPasosInactive from "../../Icon/pasosInactive.png";



export const SensorSinGrafico = ({ nSensor, value,tipo }) => {

    function transformDato(value) {
        console.log(value);
        if (value == "NULL"){
            return false;
        }
        if (value) {
            return "Activo" } 
        else if(!value) 
            { return "Inactivo"; }
            
        if (parseFloat(parseFloat(value).toFixed(2)) > 0){
            return true;
        } else { return false; }
    }

    return (
        <section className={Style.dataTimeLive}>
            <div className={Style.titleDataTime}>
                <h3 className={Style.datos}>{ nSensor }</h3>
                <div className={Style.boxImagen}>
                    <img className={Style.Imagen} src={""} alt="ImagenSensors" />  
                </div>
                
            </div>
             <p className={ 
                        transformDato(value) ? 
                        Style.valorDato + " " + Style.ValorDatoActive :
                        Style.valorDato + " " + Style.ValorDatoInactive }>
                    {  !isNaN(parseFloat(parseFloat(value).toFixed(2))) ? parseFloat(parseFloat(value).toFixed(2)) : value }
                    <span className={Style.tipoData}> { value !== "NULL" && tipo }</span>
             </p>      
        </section>
    )
}