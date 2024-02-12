//Depending 
import Style from "../PanelGraficos.module.css"
import { useEffect, useRef, useState } from "react";

//Component
import { ChartWater } from "../../charts/ChartWater"
import { SeriesWater } from "../../charts/series/SeriesWater"
import { getApiJavaHistorico } from "../../service/client";

export const CardtWaterLavel = () => {
    const [chartLayoutOptions, setChartLayoutOptions] = useState({});
    const series = useRef(null);
    const [started, setStarted] = useState(false);
    const [initialData, setInitialData] = useState([]);
    const lineColor = '#2962FF'; 
    let backgroundColor = 'white';
    let textColor = 'black'
    
    useEffect(() => {
      setChartLayoutOptions({
        background: {
          color: backgroundColor,
        },
        textColor,
      });
    }, [backgroundColor, textColor]);
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = (await getApiJavaHistorico()).data;
          const formattedData = response.map((item) => ({
            time: new Date(item.time).getTime(),
            value: parseFloat(item.value),
          }));
          setInitialData(formattedData);

          console.log("Me ejecute: ", formattedData);
          console.log("Tengo Datos api: ",initialData);
    
          series.current = formattedData;
        } catch (error) {
          console.error('Error al obtener datos de la API:', error);
        }
      };
    
      fetchData(); // Llamarlo una vez al inicio
    
      const updateData = () => {
        if (started) {
          fetchData();
        }
      };
    
      const interval = setInterval(updateData, 2000);
      return () => {
        clearInterval(interval);
      };
    }, [started]);


    
    return (
        <>
            <section className={Style.c_chart}>
                <article className={Style.c_title}>
                <h2 className={Style.title}>Nivel de Agua</h2>
                </article>

                <nav>
                <ul className={Style.list_option_temp}>
                    <button onClick={() => setStarted(current => !current)}
                className={ started ? Style.list_button  + " " + Style.isActiveButton : Style.list_button }><li>Start update series</li></button>
                </ul>
                    
                </nav>

                <section className={Style.c_chartSeries}>
                    < ChartWater layout = { chartLayoutOptions }>
                        <SeriesWater 
                            ref = {series}
                            type={'line'} data={ initialData } color={ lineColor }
                        />
                    </ChartWater>
                </section>
            </section>
        </>
    )
}