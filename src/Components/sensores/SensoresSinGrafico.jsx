import Style from "./SensorNoneChart.module.css";
import { useParams } from "react-router-dom";

export const SensorSinGrafico = ({ nSensor, value, tipo, estado, img }) => {
    let { equipo } = useParams();

    function transformDato(value) {
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

    const valueResponse = (value, nSensor) => {
        if (value == "0" && nSensor =="Tiempo Transcurrido") {
            return "00:00"
        }
        if (!isNaN(parseFloat(parseFloat(value).toFixed(2)))) {
            return parseFloat(parseFloat(value).toFixed(2))
        }
        return value;
    }

    return (
        <section className={Style.dataTimeLive}>
            <div className={Style.titleDataTime}>
                <h3 className={Style.datos}>{ nSensor }</h3>
                <div className={Style.boxImagen}>
                    <img className={Style.Imagen} src={`${img}`} alt="ImagenSensors" />  
                </div>
                
            </div>
             <p className={ 
                        transformDato(value) ? 
                        Style.valorDato + " " + Style.ValorDatoActive :
                        Style.valorDato + " " + Style.ValorDatoInactive }>
                    {  valueResponse( value, nSensor ) }
                    <span className={Style.tipoData}> { value !== "NULL" && tipo }</span>
             </p>      ?
        </section>
    )
}