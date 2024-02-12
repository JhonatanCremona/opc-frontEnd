import { createChart } from "lightweight-charts";
import { forwardRef, useEffect, useLayoutEffect, useRef, useState } from "react";
import { getApiJavaHistorico } from "../service/client";

export const ChartWaterLavel = forwardRef((props, ref) => {
    const seriesRef = useRef(null);
    const [chart, setChart] = useState(null);

    const toolTip = document.createElement("div");
    
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

    useLayoutEffect(( ) => {
        const container = document.getElementById("container");
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
        
        const series = chartInstance.addBaselineSeries({
            StylesSeries
        })
        series.setData(props.data)
         
        seriesRef.current = series;
        setChart(chartInstance);

        return () => {

            if (chartInstance) {
              chartInstance.remove();
            }
          };

    },[])

    useEffect(()=> {
        console.log(props.load);
        async function fetchData () {
            const response = ((await getApiJavaHistorico()).data)
            const formatter = response.map((item)=> (
                {
                    time: new Date(item.time).getTime(),
                    value: parseFloat(item.value)
                }
            ))
            seriesRef.current.setData(formatter)
        } 
        fetchData()
        const updateData = () => {
            if (props.load) {
                 fetchData()   
            }
        };

        const interval = setInterval(updateData, 2000);
        return () => {
            clearInterval(interval);
        };
    }, [props.load])

    return (
        <>
            <div id="container" style={
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