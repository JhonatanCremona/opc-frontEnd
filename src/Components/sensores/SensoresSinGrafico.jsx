import Style from "./SensorNoneChart.module.css";

export const SensorSinGrafico = ({ nSensor, value, tipo, estado, img }) => {

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
                    {  !isNaN(parseFloat(parseFloat(value).toFixed(2))) ? parseFloat(parseFloat(value).toFixed(2)) : value }
                    <span className={Style.tipoData}> { value !== "NULL" && tipo }</span>
             </p>      
        </section>
    )
}