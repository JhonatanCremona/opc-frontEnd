import Style from "./SensorNoneChart.module.css";

export const SensorSinGrafico = ({nSensor, value, imgAgua}) => {
    return (
        <section className={Style.dataTimeLive}>
            <div className={Style.titleDataTime}>
                <h3 className={Style.datos}>{ nSensor }</h3>
                <div className={Style.boxImagen}>
                    <img className={Style.Imagen} src={imgAgua} alt="" />  
                </div>
                
            </div>
                <p className={Style.valorDato}>
                    {value}
                    <span className={Style.tipoData}> mm</span>
                </p>


        </section>
    )
}