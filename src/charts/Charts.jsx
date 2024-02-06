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
    const container = document.getElementById('container');
    const toolTip = document.createElement('div');
    const toolTipWidth = 96;

    const handleMouseMove = () => {
      const param = chart.timeScale().getVisibleRange();
  
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
        const dateStr = param.time;
        toolTip.style.display = 'block';
        const data = param.seriesData.get(series1.current);
        const price = data.value !== undefined ? data.value : data.close;
        toolTip.innerHTML = `<div style="color: ${'rgba( 239, 83, 80, 1)'}">⬤ ABC Inc.</div><div style="font-size: 24px; margin: 4px 0px; color: ${'black'}">
          ${Math.round(100 * price) / 100}
          </div><div style="color: ${'black'}">
          ${dateStr}
          </div>`;
  
        let left = param.point.x;
        const timeScaleWidth = chart.timeScale().width();
        const priceScaleWidth = chart.priceScale('left').width();
        const halfTooltipWidth = toolTipWidth / 2;
        left += priceScaleWidth - halfTooltipWidth;
        left = Math.min(left, priceScaleWidth + timeScaleWidth - toolTipWidth);
        left = Math.max(left, priceScaleWidth);
  
        toolTip.style.left = left + 'px';
        toolTip.style.top = 0 + 'px';
      }
    };
  


    useLayoutEffect(() => {
      const container = document.getElementById('chart-container');
      const tooltip = document.createElement('div');
  
      // Crear el gráfico
      const chartInstance = createChart(container, {
        layout: {
          fontSize:20
        },
        width: container.clientWidth,
        height: 300,
      });

      chartInstance.timeScale().applyOptions({
        timeVisible: false,
        secondsVisible: false,
        tickMarkFormatter: (time, tickMarkType, locale) => {
          const date = new Date(time); // No es necesario multiplicar por 1000, ya que los timestamps son en milisegundos
          const formattedDate = date.toLocaleDateString(locale, {
            month: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
          });
          return formattedDate;
        },
      });
  
      // Añadir una serie de líneas al gráfico
      const series = chartInstance.addLineSeries({
        priceScaleId: "right",
      });


      series.setData([
        { time: '2024-02-06', value: 11.00 },
        // ... (otros datos iniciales)
      ]);
  
      // Añadir event listeners para manejar el tooltip
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', () => {
        toolTip.style.display = 'none';
      });

      setChart(chartInstance);
      series1.current = series;
  
      return () => {
        // Limpiar recursos cuando el componente se desmonta
        if (chartInstance) {
          chartInstance.remove();
          container.removeEventListener('mousemove', handleMouseMove);
          container.removeEventListener('mouseleave', () => {
            toolTip.style.display = 'none';
          });
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
            const response = await getApiJavaHistorico(); // Reemplaza con la URL de tu API
            const datos = response.data;
            const formattedData = datos.map((item) => ({
              time: new Date(item.time).getTime(),
              value: parseFloat(item.value),
            }));
            // Actualizar la serie con los datos de la API
            console.log(
              formattedData[0].time
            );
            series1.current.setData(formattedData);
            console.log();
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
        <div id="chart-container"></div>

      </div>
    );
  });
  
  Charts.displayName = 'Charts';