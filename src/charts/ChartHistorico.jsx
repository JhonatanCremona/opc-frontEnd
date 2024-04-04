import { createChart } from "lightweight-charts";
import { forwardRef, useEffect, useLayoutEffect, useRef,useContext, useState } from "react";
import { PanelContext } from "../context/PanelContext";
import { getDataComponent } from "../service/client";

import Style from "../panel-graficos/PanelGraficos.module.css"


export const ChartHistorico = forwardRef(({}, ref) => {
    
    const { ChartLayoutOptions, StyleSeriesBase, StyleTooltip, ciclo,watermarkStyle } = useContext(PanelContext);

    const seriesOne = useRef(null);
    const seriesTwo = useRef(null);
    const seriesThree = useRef(null);

    const [maxValue, setMaxValue] = useState("");
    const [minValue, setMinValue] = useState("");
    const toolTip = document.createElement("div");

    toolTip.style = StyleTooltip.sensor_water_level.sw_initial;
    toolTip.style.background = StyleTooltip.sw_bcakgraund;
    toolTip.style.color = StyleTooltip.sw_color;
    toolTip.style.borderColor = StyleTooltip.sw_border;

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

    console.log(ChartLayoutOptions);
    console.log(StyleSeriesBase);

    

    useLayoutEffect(() => {
        const container = document.getElementById("chart-container-register-historico");
        container.appendChild(toolTip);
        const chartInstance = createChart(container, {
            ...ChartLayoutOptions,
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
        chartInstance.applyOptions({
            watermark: watermarkStyle,
        });
        
        // add line Price series to chart (TEMP_PRODUCTO, TEMP_AGUA, TEMP_INGRESO):
        const series = chartInstance.addLineSeries({
            color: "rgba(239, 83, 80, 1)", lineWidth: 2
            });
        series.setData([]);

        const secondSeries = chartInstance.addLineSeries( { priceScaleId: "right", color: "#33A7FD"});
        secondSeries.setData([]);

        const thirdSeries = chartInstance.addLineSeries( { priceScaleId:"right", color: "#3c8a64"});
        thirdSeries.setData([]);

        seriesOne.current = series;
        seriesTwo.current = secondSeries;
        seriesThree.current = thirdSeries;

        return () => {
            if(chartInstance) {
                chartInstance.remove();
            }
        }
    }, []);

    useEffect(()=> {
        console.log("ME EJECUTE DESDE EL PANEL " + ciclo);
        const fetchDataHistorico = async() => {
          try {
            const apiData = await getDataComponent("TEMP_PRODUCTO", ciclo);
            console.log(apiData.data.data);
            const formatter = apiData.data.data.map((item)=> {
              console.log(item);
              return {
                time: new Date(item[1]).getTime(),
                value: parseFloat(item[0])
            }});
            console.log(formatter);

            return seriesOne.current.setData(formatter);
          } catch (error) {
            console.log(error);
          }
        }
        fetchDataHistorico();
        //seriesOne.current.createPriceLine(maxPriceLine);
        //seriesOne.current.createPriceLine(minPriceLine);

      }, [ciclo])
      useEffect(()=> {
        const fetchDataHistorico = async() => {
          try {
            const apiData = await getDataComponent("TEMP_AGUA", ciclo);
            console.log(apiData.data.data);
            const formatter = apiData.data.data.map((item)=> {
              console.log(item);
              return {
                time: new Date(item[1]).getTime(),
                value: parseFloat(item[0])
            }});
            return seriesTwo.current.setData(formatter);
          } catch (error) {
            console.log(error);
          }
        }
        fetchDataHistorico();
        //seriesOne.current.createPriceLine(maxPriceLine);
        //seriesOne.current.createPriceLine(minPriceLine);

      }, [ciclo])
      useEffect(()=> {
        console.log("ME EJECUTE DESDE EL PANEL " + ciclo);
        const fetchDataHistorico = async() => {
          try {
            const apiData = await getDataComponent("TEMP_INGRESO", ciclo);
            console.log(apiData.data.data);
            const formatter = apiData.data.data.map((item)=> {
              return {
                time: new Date(item[1]).getTime(),
                value: parseFloat(item[0])
            }});
            return seriesThree.current.setData(formatter);
          } catch (error) {
            console.log(error);
          }
        }
        fetchDataHistorico();
        //seriesOne.current.createPriceLine(maxPriceLine);
        //seriesOne.current.createPriceLine(minPriceLine);

      }, [ciclo])
      const components = [
        {name: "Temp. de Producto", color: "rgba(239, 83, 80, 1)"},
        {name: "Temp. de Agua", color: "#33A7FD"},
        {name: "Temp. de Ingreso", color: "#3c8a64"}
      ]


    return ( 
        <section className={Style.c_chart}>
                    <ul className={Style.list_option_component}>
                            <section style={{display: "flex",alignItems: "center",gap:"10px" }}>
                                {components.map((component, index) => {
                                    return (
                                            <>
                                            <div className={Style.component_point_series} style={{background: component.color, }}></div><h3 className={Style.component_name} style={{margin:"0px"}}>{component.name}</h3>
                                            </>
                                    )
                                })}
                            </section>
                    </ul>
                <section className={Style.c_chartSeries}>
                    <div id="chart-container-register-historico" style={
                        {
                            position:"absolute",
                            width:"100%",
                            bottom:0,
                        }
                    }>

                    </div>
                </section>
        </section>
    )
})
ChartHistorico.displayName = "ChartHistorico"