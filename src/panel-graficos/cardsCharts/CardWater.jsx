//Depending 
import Style from "../PanelGraficos.module.css"
import { useState } from "react";
import { ChartWaterLavel } from "../../charts/ChartWaterLevel";
import Logo from "../../IMG/logo/MARCA-AGUA-CREMINOX.png";
//Component

export const CardWater  = ({ chartName, component, urlComponent, numeroCiclo }) => {
    const [started, setStarted] = useState(false);
   
    return (
       <section className={Style.c_chart}>
                    <ul className={Style.list_option_component}>
                            <h2 className={Style.title}>{ component }</h2>
                    </ul>
                <section className={Style.c_chartSeries}>
                    <img src={ Logo } alt="" style={{
                        position:"absolute", zIndex:"10000", width:"300px", left:"0", right:"0", bottom:"0", top:"0", margin: "auto",  opacity:"0.3",   
                    }}/>
                    < ChartWaterLavel load = { started } chartName={ chartName } url={urlComponent} idCiclo={numeroCiclo}/>
                </section>
        </section>
    )
}
