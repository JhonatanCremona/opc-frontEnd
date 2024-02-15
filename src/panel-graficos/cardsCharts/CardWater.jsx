//Depending 
import Style from "../PanelGraficos.module.css"
import { useEffect,  useState } from "react";
import { getApiJavaHistorico } from "../../service/client";

//Component
import { ChartWaterLavel } from "../../charts/ChartWaterLevel";

export const CardWater  = (props) => {
    const equipo = "Cocina1"

    const { chartName } = props;

    const [started, setStarted] = useState(false);
    const [initialData, setInitialData] = useState([]);

    
    useEffect(() => {
          const fetchDato = async () => {
            const response = (await getApiJavaHistorico()).data;
            const formattedData = response.map((item) => ({
                time: new Date(item.time).getTime(),
                value: parseFloat(item.value)
              }))
              setInitialData(formattedData);
          }
        fetchDato()
    }, [])
    
    return (
       <section className={Style.c_chart}>
                <article className={Style.c_title}>
                <h2 className={Style.title}>{ props.component }</h2>
                </article>

                <nav>
                <ul className={Style.list_option}>
                    <button onClick={() => setStarted(current => !current)}
                className={ started ? Style.list_button  + " " + Style.isActiveButton : Style.list_button }><li>Started live</li></button>
                </ul>
                    
                </nav>

                <section className={Style.c_chartSeries}>
                    < ChartWaterLavel data = { initialData } load = {started} container={ chartName }/>
                </section>
            </section>
    )
}