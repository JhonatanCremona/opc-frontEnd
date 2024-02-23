//Depending 
import Style from "../PanelGraficos.module.css"
import { useState } from "react";

//Component
import { ChartWaterLavel } from "../../charts/ChartWaterLevel";

export const CardWater  = ({ chartName, component, urlComponent }) => {
    //const equipo = "Cocina1"

    const [started, setStarted] = useState(false);
    return (
       <section className={Style.c_chart}>
                <article className={Style.c_title}>
                    <h2 className={Style.title}>{ component }</h2>
                    <p className={Style.form_title}> Filtrar por fecha</p>
                </article>

                <nav>
                    <ul className={Style.list_option_component}>
                        <button onClick={() => setStarted(current => !current)} className={ started ? Style.list_button_component  + " " + Style.isActiveButton : Style.list_button_component }><li>Iniciar Lectura</li>
                        </button>

                        <form action="" className={Style.form_date}>
                            <input className={ Style.form_input_one } type="date" name="date_start"/>
                            <input className={ Style.form_input_two } type="date" name="date_end"/>
                            <button className={ Style.list_button_component}><li>Buscar</li></button>
                        </form>

                    </ul>

                </nav>

                <section className={Style.c_chartSeries}>
                    < ChartWaterLavel load = { started } chartName={ chartName } url={urlComponent} />
                </section>
        </section>
    )
}
