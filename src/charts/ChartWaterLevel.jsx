import { createChart } from "lightweight-charts";
import { forwardRef, useEffect, useLayoutEffect, useRef,useContext, useState } from "react";
import { getHistory } from "../service/client";

//Component
import { PanelContext } from "../context/PanelContext";

export const ChartWaterLavel = forwardRef(({ chartName, load, url }, ref) => {

    const seriesRef = useRef(null);
    const { StyleTooltip } = useContext(PanelContext);
    const machine ="Cocina1";
    const [maxValue, setMaxValue] = useState("");
    const [minValue, setMinValue] = useState("");

    const StylesSeries = {
            baseValue: { type: 'price', price: 40 }, 

            topLineColor: 'rgba( 38, 166, 154, 1)', 
            topFillColor1: 'rgba( 38, 166, 154, 0.28)', 
            topFillColor2: 'rgba( 38, 166, 154, 0.05)', 

            bottomLineColor: 'rgba( 239, 83, 80, 1)', 
            bottomFillColor1: 'rgba( 239, 83, 80, 0.05)', 
            bottomFillColor2: 'rgba( 239, 83, 80, 0.28)'
        }
    const chartLayoutOptions = {
            height:300,
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
            }
        }
    const toolTip = document.createElement("div");
    toolTip.style = StyleTooltip.sensor_water_level.sw_initial;
    toolTip.style.background = StyleTooltip.sw_bcakgraund;
    toolTip.style.color = StyleTooltip.sw_color;
    toolTip.style.borderColor = StyleTooltip.sw_border;

    // CREATE LINE TEMPORAL 
    let minPriceLine = {
          price: minValue,
          color: '#be1238',
          lineWidth: 2,
          lineStyle: 3,
          axisLabelVisible: true,
          title: 'Minimo Valor',
     };
    let maxPriceLine = {
        price: maxValue,
        color: '#be1238',
        lineWidth: 2,
        lineStyle: 3,
        axisLabelVisible: true,
        title: 'Maximo valor',
    };
    // END LINE TEMPORAL
    
    function subScribeToolTip(param, container, series, toolTipWidth, chartIntance) {
      if (
        param.point === undefined ||
        !param.time ||
        param.point.x < 0 ||
        param.point.x > container.clientWidth ||
        param.point.y < 0 ||
        param.point.y > container.clientHeight
      ) {
        toolTip.style.display = 'block';
      } else {
        const dateStr = new Date(param.time).toLocaleString();
        toolTip.style.display = 'block';
        const data = param.seriesData.get(series);
        const price = data.value !== undefined ? data.value : data.close;
        toolTip.innerHTML = `
          <div style="color: ${'rgba( 239, 83, 80, 1)'}">
          ⬤${ url }
          </div>
          <div style="font-size: 24px; margin: 4px 0px; color: ${'white'}">
            ${Math.round(100 * price) / 100}
          </div>
          <div style="color: ${'white'}">
            ${dateStr}
          </div>`;
    
        let left = param.point.x; // relative to timeScale
        const timeScaleWidth = chartIntance.timeScale().width();
        const priceScaleWidth = chartIntance.priceScale('left').width();
        const halfTooltipWidth = toolTipWidth / 2;
        left += priceScaleWidth - halfTooltipWidth;
        left = Math.min(left, priceScaleWidth + timeScaleWidth - toolTipWidth);
        left = Math.max(left, priceScaleWidth);
    
        toolTip.style.left = left + 'px';
        toolTip.style.top = 0 + 'px';
      }
    }
    function setSeriesPriceLine(value) {
          seriesRef.current.createPriceLine({
            price: parseFloat(value),
            color: '#be1238',
            lineWidth: 2,
            lineStyle: 3,
            axisLabelVisible: true,
            title: 'Máximo',
          });
    }

    useLayoutEffect(( ) => {
        const container = document.getElementById(chartName);
        container.appendChild(toolTip);
        const chartInstance = createChart(container, {
            ...chartLayoutOptions,
            width: container.clientWidth
        });

        chartInstance.timeScale().fitContent();
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
        
        const series = chartInstance.addBaselineSeries({ StylesSeries })

        series.setData([]);
        seriesRef.current = series;

        //series.createPriceLine(minPriceLine);
        //series.createPriceLine(maxPriceLine);
        
        chartInstance.subscribeCrosshairMove(param => {
          subScribeToolTip(param, container, seriesRef.current, StyleTooltip.sensor_water_level.sw_width, chartInstance);
        })
        return () => {
            if (chartInstance) {
              chartInstance.remove();
            }
          };

    },[])
    
let contador = 0;

    useEffect(()=> {
        async function fetchData () {
            //const response = ((await getApiJavaHistorico()).data)
            const response = await getHistory(url,machine)
            const formatter = response.data.results.map((item)=> {
              return {
                time: new Date(item.time).getTime(),
                value: parseFloat(item.value)
            }
            })
            setMaxValue(parseFloat(response.data.MAX));
            setMinValue(parseFloat(response.data.MIN));
            if (maxValue > contador ) {
              seriesRef.current.createPriceLine(maxPriceLine);
              contador = maxValue;
            } else {
              seriesRef.current.remove(seriesRef.current.createPriceLine(maxPriceLine))
            }
            
            seriesRef.current.createPriceLine(minPriceLine);
            return seriesRef.current.setData(formatter);
        } 
        fetchData()
        const updateData = () => {
            if (load) {
                 fetchData()   
            }
        };

        const interval = setInterval(updateData, 2000);
        return () => {
            clearInterval(interval);
        };
    }, [load])

    return (
        <>
            <div id={ chartName } style={
                {
                    position: "absolute",
                    width: "100%",
                    bottom:0,
                }
            }></div>
        </>
    )
})
ChartWaterLavel.displayName = 'ChartWaterLavel';