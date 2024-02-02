import { useState, useEffect, useRef } from "react"
import { createChart, ColorType } from 'lightweight-charts';
import { readApi } from "./updateData.js"; 

import Style from "./Component.module.css"
import temperatura from "../Icon/temperatura.png"

//IMPORT JSON LOCAL DATA
import { results } from "../JSON/jsonHistorico.json";

export const Test = ({ value, nSensor }) => {
  
  const backgroundColor = "rgba(255, 255, 255, 0.1)";
  const textColor = "white";
  const lineColor= "#2962FF";
  const areaTopColor='#2962FF';
  const areaBottomColor='rgba(41, 98, 255, 0.28)'
  const chartContainerRef = useRef();

  const chartRef = useRef(null);
  const [data, setData] = useState([{value: 0.0}]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await readApi("/opcua/readVariableBoolean/1");
        console.log(apiData);
        setData([{ value: apiData.value }]);
        console.log(data);

        if (chartRef.current) {
          const time = new Date().getTime();
          const value = apiData.value;
          chartRef.current.addBar({ time, value });
        }

      } catch (error) {
        console.error("Error al obtener datos:", error); // Puedes manejar el error actualizando el estado según sea necesario
      }
    };
  
    fetchData();
  
    const intervalId = setInterval(fetchData, 1000);
    console.log(intervalId);
  
    return () => clearInterval(intervalId);
  }, []);

	useEffect(
		() => {
			const handleResize = () => {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      };
  
      const chart = createChart(chartContainerRef.current, {
        layout: {
          background: { type: ColorType.Solid, color: backgroundColor },
          textColor,
        },
        width: chartContainerRef.current.clientWidth,
        height: 110,
        grid: {
          vertLines: { visible: false },
          horzLines: { visible: false },
        },
        handleScale: false,
      });
  
      // Ocultar valores en el eje X (tiempo)
      chart.timeScale().applyOptions({
        visible: false,
      });
      // Ocultar valores en el eje Y (precio)
      
      chart.timeScale().fitContent();
      chart.applyOptions({
        rightPriceScale: {
          scaleMargins: {
            top: 0.1,
            bottom: 0.1,
          },
          invertScale: false,
          visible: false,
          width: '100%',
        },
      });

      const newSeries = chart.addAreaSeries({
        lineColor,
        topColor: areaTopColor,
        bottomColor: areaBottomColor,
        priceLineVisible: false,
        lastValueVisible: false,
      });
  
      newSeries.setData(results);
      chartRef.current = chart;
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
        chart.remove();
      };
		},
		[

      backgroundColor, 
      lineColor, 
      textColor, 
      areaTopColor, 
      areaBottomColor
    ]
	);

      return (
        <section className={Style.dataTime}>
          <div className={Style.titleDataTime}>
            <h3 className={Style.datos}>{ "TEMP. INGRESO" }</h3>
            <div className={Style.boxImagen}>
              <img className={Style.Imagen} src={temperatura} alt="" />  
            </div>
          </div>
          
          {
            data.map((num, index) => {
              console.log(num);
              return (
                  <p key={index} className={Style.dataComponent}>
                    {num.value}
                    <span className={Style.tipoData}>°C</span></p>
              
              )
            })
          }
          <section>
            <div
              ref={chartContainerRef}
              style = {
                {
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '100%',
                  height: '100%',
                  cursor: "none"
                }
              }
            />
          </section>
        </section>
      )
}



       