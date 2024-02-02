import Style from "./SensorNoneChart.module.css";

export const SensorSinGrafico = ({ nSensor, value, imgSensor,tipo }) => {

    console.log("Dato Sensor: ", parseFloat(parseFloat(value).toFixed(2)) < 0);

    function transformDato(value) {
        console.log(value);
        if (value == "NULL"){
            return false;
        }
        if (value) { 
            console.log("LLEGUE");
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
                    <img className={Style.Imagen} src={imgSensor} alt="" />  
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