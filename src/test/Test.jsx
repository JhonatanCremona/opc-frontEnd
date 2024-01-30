import { useState, useEffect, useRef } from "react"
import axios from "axios";
import { createChart, ColorType } from 'lightweight-charts';

import Style from "./Component.module.css"
import temperatura from "../Icon/temperatura.png"

//IMPORT JSON LOCAL DATA
import { results } from "../JSON/jsonHistorico.json";

const colors = {
  backgroundColor: 'black',
  lineColor:'#2962FF',
  textColor:'white',
  areaTopColor:'#2962FF',
  areaBottomColor:'rgba(41, 98, 255, 0.28)',
} 


export const Test = () => {
  let resultDataHistory = [];
  const [data, setData] = useState([]);
  const backgroundColor = "rgba(255, 255, 255, 0.1)";
  const textColor = "white";
  const lineColor= "#2962FF";
  const areaTopColor='#2962FF';
  const areaBottomColor='rgba(41, 98, 255, 0.28)'
  const chartContainerRef = useRef();
  

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
      /*
      // Configurar handleScroll para bloquear el zoom
      const handleCrosshairMove = (param) => {
        if (!param.point) {
          return;
        }
  
        // Mantén constante la escala de tiempo y precio
        chart.timeScale().scrollToRealTime(param.time)
      };
  
      // Suscribirse al evento de movimiento del puntero (crosshair)
      chart.subscribeCrosshairMove(handleCrosshairMove);
      */
      const newSeries = chart.addAreaSeries({
        lineColor,
        topColor: areaTopColor,
        bottomColor: areaBottomColor,
        priceLineVisible: false,
        lastValueVisible: false,
      });
  
      newSeries.setData(results);
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
        chart.remove();
      };
		},
		[
      results, 
      colors.backgroundColor, 
      colors.lineColor, 
      colors.textColor, 
      colors.areaTopColor, 
      colors.areaBottomColor
    ]
	);



      return (
        <section className={Style.dataTime}>
          <div className={Style.titleDataTime}>
            <h3 className={Style.datos}>TEM. INGRESO</h3>
            <div className={Style.boxImagen}>
              <img className={Style.Imagen} src={temperatura} alt="" />  
            </div>
          </div>

          <p className={Style.dataComponent}>22,45<span className={Style.tipoData}>°C</span></p>
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



       