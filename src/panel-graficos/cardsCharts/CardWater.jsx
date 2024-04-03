//Depending 
import Style from "../PanelGraficos.module.css"
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//Component
import { ChartWaterLavel } from "../../charts/ChartWaterLevel";
import { SearchIcon, DownloadReportIcon } from "../../Icon/Icon"

export const CardWater  = ({ chartName, component, urlComponent, children }) => {
    //const equipo = "Cocina1"
    const [started, setStarted] = useState(false);
   
    return (
       <section className={Style.c_chart}>
                    <ul className={Style.list_option_component}>
                            <h2 className={Style.title}>{ component }</h2>
                            <button onClick={() => setStarted(current => !current)} className={ started ? Style.button_component  + " " + Style.isActiveButton : Style.button_component }><li>Iniciar Lectura</li>
                            </button>
                    </ul>
                {/*<section className={Style.c_chartSeries}>
                    < ChartWaterLavel load = { started } chartName={ chartName } url={urlComponent} />
    </section>*/}
            {children}
        </section>
    )
}
