//Depending 
import { useState, useEffect, forwardRef, useImperativeHandle, useLayoutEffect,useRef } from "react"
import { createChart } from "lightweight-charts"
import { getApiJavaHistorico } from "../service/client";
import Style from "./Charts.module.css";
//Component

export const Charts = forwardRef((_, ref) => {

    const [chart, setChart] = useState(null);
    const [started, setStarted] = useState(false);
    const series1 = useRef(null);
    const toolTip = document.createElement('div');
    const toolTipWidth = 80;
    const toolTipHeight = 80;
    const toolTipMargin = 15;

    toolTip.style = `width: 96px; height: 90px; position: absolute; display: none; padding: 8px; box-sizing: border-box; font-size: 12px; text-align: left; z-index: 1000; top: 12px; left: 12px; pointer-events: none; border: 1px solid; border-radius: 2px;font-family: -apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;`;
    toolTip.style.background = 'white';
    toolTip.style.color = 'black';
    toolTip.style.borderColor = 'rgba( 38, 166, 154, 1)';
  


    useLayoutEffect(() => {
      const container = document.getElementById('chart-container');
      container.appendChild(toolTip);
      // Crear el gráfico
      const chartInstance = createChart(container, {
        layout: {
          fontSize:20
        },

        crosshair: {
          mode: 1,
          horzLine: {
            visible: false,
            labelVisible: false,
            // Otras opciones para la línea horizontal
          },
          vertLine: {
            visible: false,
            labelVisible: false,
            // Otras opciones para la línea vertical
          },
        },
        width: container.clientWidth,
        height: 300,
        
      });

      chartInstance.timeScale().applyOptions({
        timeVisible: false,
        secondsVisible: false,
        tickMarkFormatter: (time, tickMarkType, locale) => {
          console.log(time);
          const date = new Date(time); 
          console.log(date);
          const formattedDate = date.toLocaleDateString(locale, {
            month: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
          });
          console.log(formattedDate);
          return formattedDate;
        },
      });
  
      // Añadir una serie de líneas al gráfico
      const series = chartInstance.addLineSeries({
        priceScaleId: "right",
      });

      chartInstance.subscribeCrosshairMove(param => {

        console.log(param.time);
            if (
              param.point === undefined ||
              !param.time ||
              param.point.x < 0 ||
              param.point.x > container.clientWidth ||
              param.point.y < 0 ||
              param.point.y > container.clientHeight
            ) {
              toolTip.style.display = 'none';
            } else {
              // time will be in the same format that we supplied to setData.
              // thus it will be YYYY-MM-DD
              const dateStr = new Date(param.time).toLocaleString() ;
              console.log(dateStr);
              toolTip.style.display = 'block';
              console.log(series1.current);
              const data = param.seriesData.get(series1.current);
              console.log(data);

              const price = data.value !== undefined ? data.value : data.close;
              console.log(price);
              toolTip.innerHTML = `<div style="color: ${'rgba( 38, 166, 154, 1)'}">Sensor.</div>
              <div style="font-size: 24px; margin: 4px 0px; color: ${'black'}">
                ${Math.round(100 * price) / 100}
                </div>
                <div style="color: ${'black'}">
                ${dateStr}
                </div>`;
          
              const y = param.point.y;
              let left = param.point.x + toolTipMargin;
              if (left > container.clientWidth - toolTipWidth) {
                left = param.point.x - toolTipMargin - toolTipWidth;
              }
          
              let top = y + toolTipMargin;
              if (top > container.clientHeight - toolTipHeight) {
                top = y - toolTipHeight - toolTipMargin;
              }
              toolTip.style.left = left + 'px';
            
          }
        })

      series.setData([
        { time: '2024-02-05', value: 11.00 },
        // ... (otros datos iniciales)
      ]);
  

      setChart(chartInstance);
      series1.current = series;
  
      return () => {
        // Limpiar recursos cuando el componente se desmonta
        if (chartInstance) {
          chartInstance.remove();
        }
      };
    }, []);
  /*
    useEffect(() => {
      // Actualizar la serie de datos en tiempo real si está habilitada
      if (started) {
        const interval = setInterval(() => {
          currentDate.setDate(currentDate.getDate() + 1);
          const next = {
            time: currentDate.toISOString().slice(0, 10),
            value: 53 - 2 * Math.random(),
          };
          series1.current.update(next);
        }, 1000);
  
        return () => clearInterval(interval);
      }
    }, [started]); */

    



    useEffect(() => {
        // Función para obtener datos de la API
        const fetchData = async () => {
          try {
            const response = await getApiJavaHistorico(); 
            const datos = response.data;
            console.log(datos);
            const formattedData = datos.map((item) => ({
              time: new Date(item.time).getTime(),
              value: parseFloat(item.value),
            }));
            // Actualizar la serie con los datos de la API
            console.log(
              formattedData[0].time
            );
            series1.current.setData(formattedData);
            console.log(series1);
            console.log(formattedData);
          } catch (error) {
            console.error('Error al obtener datos de la API:', error);
          }
        };
    
        // Actualizar la serie de datos en tiempo real si está habilitada
        const updateData = () => {
          if (started) {
            fetchData();
          }
        };
    
        // Llamar a fetchData inmediatamente para obtener datos iniciales
        console.log(started);
        fetchData();
    
        // Actualizar los datos cada 2 segundos (ajusta según sea necesario)
        const interval = setInterval(updateData, 2000);
    
        // Limpiar el intervalo cuando el componente se desmonta o cuando se detiene la actualización
        return () => {
          clearInterval(interval);
        };
      }, [started]);
  
      
      

    useImperativeHandle(
      // Permitir al componente padre acceder al API del gráfico
      ref,
      () => ({
        startUpdating: () => setStarted(true),
        stopUpdating: () => setStarted(false),
      }),
      []
    );
  
    return (
      <div className={Style.boxChart}>
        <button type="button" onClick={() => setStarted((prev) => !prev)}>
          {started ? 'Stop updating' : 'Start updating series'}
        </button>
        <div id="chart-container">
        </div>

      </div>
    );
  });
  
  Charts.displayName = 'Charts';