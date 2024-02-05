//Depending 
import { useState, useEffect, forwardRef, createContext, useImperativeHandle, useLayoutEffect,useRef } from "react"
import { createChart } from "lightweight-charts"

import { getApiJavaHistorico } from "../service/client";


const Context = createContext();

//Component

export const Charts = forwardRef((_, ref) => {

    const [chart, setChart] = useState(null);
    const [started, setStarted] = useState(false);
    const currentDate = new Date();
    const series1 = useRef(null);


  
    useLayoutEffect(() => {
      const container = document.getElementById('chart-container');
  
      // Crear el gráfico
      const chartInstance = createChart(container, {
        width: container.clientWidth,
        height: 300,
      });
  
      // Añadir una serie de líneas al gráfico
      const series = chartInstance.addLineSeries();
      series.setData([
        { time: '2018-10-11', value: 52.89 },
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
            console.log("llegue");
            const response = await getApiJavaHistorico(); // Reemplaza con la URL de tu API
            console.log(response.data);
            const datos = response.data.sort((a, b) => new Date(a.time) - new Date(b.time));
            const formattedData = datos.map((item) => ({
                time: new Date(item.time).toISOString().split('T')[0],
                value: parseFloat(item.value)
            }));
            // Actualizar la serie con los datos de la API
            series1.current.setData(formattedData);
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
        fetchData();
    
        // Actualizar los datos cada 5 segundos (ajusta según sea necesario)
        const interval = setInterval(updateData, 5000);
    
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
      <div>
        <button type="button" onClick={() => setStarted((prev) => !prev)}>
          {started ? 'Stop updating' : 'Start updating series'}
        </button>
        <div id="chart-container"></div>
      </div>
    );
  });
  
  Charts.displayName = 'Charts';