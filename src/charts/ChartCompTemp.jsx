//Depending 
import { useState, useEffect, forwardRef, useImperativeHandle, useLayoutEffect,useRef } from "react"
import { createChart } from "lightweight-charts"
import {  getHistory } from "../service/client";
//Component

export const ChartCompTemp = forwardRef(({startAgua, setStartAgua },ref) => {

    const [chart, setChart] = useState(null);
    // const [started, setStarted] = useState(true);
    const series1 = useRef(null);
    const series2 = useRef(null);
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
        width: 740,
        height: 300,
        layout: {
            textColor: '#d1d4dc',
			background: '#000000',
        },
        rightPriceScale: {
        scaleMargins: {
          top: 0.3,
          bottom: 0.25,
        },
        },
        crosshair: {
          vertLine: {
            width: 4,
            color: 'rgba(224, 227, 235, 0.1)',
            style: 0,
          },
          horzLine: {
            visible: false,
            labelVisible: false,
          },
        },
        grid: {
          vertLines: {
            color: 'rgba(42, 46, 57, 0)',
          },
          horzLines: {
            color: 'rgba(42, 46, 57, 0)',
          },
        },
        handleScroll: {
          vertTouchDrag: false,
        },
      });

      chartInstance.timeScale().applyOptions({
        timeVisible: false,
        secondsVisible: false,
        tickMarkFormatter: (time, tickMarkType, locale) => {
          const date = new Date(time); 
          const formattedDate = date.toLocaleDateString(locale, {
            month: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
          });
          return formattedDate;
        },
      });
      const seriesparte = chartInstance.addLineSeries({
        priceScaleId: "left",
        color: "blue"
      });

      chartInstance.subscribeCrosshairMove(param => {
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
              console.log(series1);
              const data = param.seriesData.get(series1.current);
              console.log(data);

              const price = data.value !== undefined ? data.value : data.close;
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

        seriesparte.setData([
          { time: '2024-02-06', value: 55.00 },
          // ... (otros datos iniciales)
        ]);

      setChart(chartInstance);
      series2.current = seriesparte;
  
      return () => {
        // Limpiar recursos cuando el componente se desmonta
        if (chartInstance) {
          chartInstance.remove();
        }
      };
    }, []);

      useEffect(() => {
        // Función para obtener datos de la API
        const fetchData = async () => {
          try {
            const responseSensorTem = await (await getHistory("TEMP_AGUA")).data.results
            console.log(responseSensorTem);
            const formattedData = responseSensorTem.map((item) => ({
              time: new Date(item.time).getTime(),
              value: parseFloat(item.value),
            }));
            console.log(formattedData);
            console.log(series2);
            series2.current.setData(formattedData);
            console.log(series2.current.setData(formattedData));
            
          } catch (error) {
            console.error('Error al obtener datos de la API:', error);
          }
        };
        const updateData = () => { if (startAgua) { fetchData() }};
        fetchData();
    
        const interval = setInterval(updateData, 2000);
    
        return () => {
          clearInterval(interval);
        };
      }, [startAgua]);


    useImperativeHandle(
      ref,
      () => ({
        startUpdating: () => setStartAgua(true),
        stopUpdating: () => setStartAgua(false),
      }),
      []
    );
  
    return (
        <div id="chart-container" style={
            {
                height: '100%',
            }
        }>
        </div>
    );
  });
  
  ChartCompTemp.displayName = 'Charts';