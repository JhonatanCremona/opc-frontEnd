import Style from "../../panel-graficos/PanelGraficos.module.css";
import { useState } from "react";
import { ChartCompTemp } from "../../charts/ChartCompTemp" 

export const Chart = () => {
    const [ started, setStarted ] = useState(false)
    
    return (
        <>
            <section className={Style.c_chart}>
                <article className={Style.c_title}>
                <h2 className={Style.title}>Sensores de Temperatura</h2>
                
                </article>
                <nav>
                    <ul className={Style.list_option_temp}>
                        <button onClick={() => setStarted ((prev) => !prev)}
                        className={started ? Style.list_button  + " " + Style.isActiveButton : Style.list_button }><li>Temp. Agua</li></button>
                    </ul>
                </nav>
                <ChartCompTemp 
                startAgua ={ started } setStartAgua={ setStarted }
                />
            </section>
        </>
    )
}