//Depending 
import { useState, useEffect, forwardRef, useLayoutEffect,useRef } from "react"
import { createChart } from "lightweight-charts"
import {  getApiJavaHistoricoPrueba, getHistory } from "../service/client.js";
//Component

export const ChartCompTemp = forwardRef(({ sensorsComponent }, ref) => {
  const [chart, setChart] = useState(null);

  const machine = "Cocina1";

  const series1 = useRef(null);
  const series2 = useRef(null);
  const series3 = useRef(null);

  const toolTip = document.createElement('div');
  const toolTipWidth = 80;
  const toolTipHeight = 80;
  const toolTipMargin = 15;

  toolTip.style = `width: 110px; height: 90px; position: absolute; display: none; padding: 8px; box-sizing: border-box; font-size: 12px; text-align: left; z-index: 1000; top: 12px; left: 12px; pointer-events: none; border: 1px solid; border-radius: 2px;font-family: -apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;`;
  toolTip.style.background = 'white';
  toolTip.style.color = 'black';
  toolTip.style.borderColor = 'rgba( 38, 166, 154, 1)';

  useLayoutEffect(() => {
    const container = document.getElementById('chart-container');
    container.appendChild(toolTip);
    // Crear el gráfico
    const chartInstance = createChart(container, {
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

    // Añadir una serie de líneas al gráfico
    const series = chartInstance.addLineSeries({
      priceScaleId: "right",
      color: "red",
      lineType: 2,
    });
    series.setData([]);

    const secondSeries = chartInstance.addLineSeries({
        priceScaleId: "right",
        color: "blue"
      }
    );
    secondSeries.setData([])

    const thirdSeries = chartInstance.addLineSeries({
        priceScaleId: "right",
        color: "orange"
      }
    );
    thirdSeries.setData([])

    series1.current = series;
    series2.current = secondSeries;
    series3.current = thirdSeries;

    setChart(chartInstance);
    
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
        const dateStr = new Date(param.time).toLocaleString() ;
        console.log(dateStr);
        toolTip.style.display = 'block';
        const data = param.seriesData.get(series1.current) || 
                      param.seriesData.get(series2.current) || 
                      param.seriesData.get(series3.current);
        console.log(data);
        let nameSensor = "";

        if (param.seriesData.has(series2.current)) nameSensor = sensorsComponent[1].name;
        if (param.seriesData.has(series1.current)) nameSensor = sensorsComponent[0].name;
        if (param.seriesData.has(series3.current)) nameSensor = sensorsComponent[2].name;

        const price = data.value !== undefined ? data.value : data.close;

        toolTip.innerHTML = `<div style="color: ${'rgba( 38, 166, 154, 1)'}">${ nameSensor }</div>
        <div style="font-size: 24px; margin: 4px 0px; color: ${'black'}">
          ${Math.round(100 * price) / 100 + "°C"}
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


    return () => {
      // Limpiar recursos cuando el componente se desmonta
      if (chartInstance) {
        chartInstance.remove();
      }
    };
  }, []);

  useEffect(() => {
    const updateData = async () => {
      if (sensorsComponent[0].estado) {
        const response = await getHistory(sensorsComponent[0].api, machine)
        const formattedData = response.data.results.map((item) => ({
          time: new Date(item.time).getTime(),
          value: parseFloat(item.value)
        }));
        series1.current.setData(formattedData);
        //getApiJavaHistoricoPrueba(series1, 0)
      }
    }
    //getApiJavaHistoricoPrueba(series1, 0);
    getHistory(sensorsComponent[0].api, machine);
    const interval = setInterval(updateData, 2000);
    return () => {
      clearInterval(interval);
    };
  }, [sensorsComponent[0].estado])

  useEffect(() => {
      const updateData = async () => {
        if (sensorsComponent[2].estado) {
          //getApiJavaHistoricoPrueba(series3, 80)
          const response = await getHistory(sensorsComponent[2].api, machine);
          const formattedData = response.data.results.map((item) => ({
            time: new Date(item.time).getTime(),
            value: parseFloat(item.value) + 40
          }));
          series3.current.setData(formattedData);
        } else {
          series3.current.setData([])
        }
      }
      const interval = setInterval(updateData, 2000);
      return () => {
        clearInterval(interval);
      };
    }, [sensorsComponent[2].estado])

    useEffect(() => {
      const updateData = async () => {
        if (sensorsComponent[1].estado) {
          //getApiJavaHistoricoPrueba(series2, 40)
          const response = await getHistory(sensorsComponent[1].api, machine);
          const formattedData = response.data.results.map((item) => ({
            time: new Date(item.time).getTime(),
            value: parseFloat(item.value)
          }));
          series2.current.setData(formattedData);
        } else {
          series2.current.setData([]);
        }
      }
      const interval = setInterval(updateData, 2000);
      return () => {
        clearInterval(interval);
      };
    }, [sensorsComponent[1].estado])


    return (
        <div id="chart-container" style={
            {
              position: "absolute",
              bottom: 0,
              height: '100%',
              width: '100%',
            }
        }>
        </div>
    );
  });
  
  ChartCompTemp.displayName = 'Charts';

  ChartCompTemp.propTypes = {
    sensorsComponent: IDBObjectStore
  }