//Depending 
import Style from "../PanelGraficos.module.css"
import { useState } from "react";
import { ChartWaterLavel } from "../../charts/ChartWaterLevel";

//Component

export const CardWater  = ({ chartName, component, urlComponent, numeroCiclo }) => {
    const [started, setStarted] = useState(false);
   
    return (
       <section className={Style.c_chart}>
                    <ul className={Style.list_option_component}>
                            <h2 className={Style.title}>{ component }</h2>
                            <button onClick={() => setStarted(current => !current)} className={ started ? Style.button_component  + " " + Style.isActiveButton : Style.button_component }><li>Iniciar Lectura</li>
                            </button>
                    </ul>
                <section className={Style.c_chartSeries}>
                    < ChartWaterLavel load = { started } chartName={ chartName } url={urlComponent} idCiclo={numeroCiclo}/>
                </section>
        </section>
    )
}
