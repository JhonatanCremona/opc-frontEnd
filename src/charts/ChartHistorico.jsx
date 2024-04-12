import { createChart } from "lightweight-charts";
import { forwardRef, useEffect, useLayoutEffect, useRef,useContext, useState } from "react";
import { PanelContext } from "../context/PanelContext";
import { getDataComponent } from "../service/client";

import Logo from "../IMG/logo/MARCA-AGUA-CREMINOX.png";

import Style from "../panel-graficos/PanelGraficos.module.css"


export const ChartHistorico = forwardRef(({}, ref) => {
    const [components, setComponents] = useState([
      {name: "Temp. de Producto", color: "rgba(239, 83, 80, 1)", minValue: "0", maxValue:"0" },
        {name: "Temp. de Agua", color: "#33A7FD", minValue: "0", maxValue:"0" },
        {name: "Temp. de Ingreso", color: "orange", minValue: "0", maxValue:"0" }
    ])
    const { ChartLayoutOptions, ciclo, leyendaCiclo } = useContext(PanelContext);
    const [chart, setChart] = useState(null);
    console.log(leyendaCiclo);

    const seriesOne = useRef(null);
    const seriesTwo = useRef(null);
    const seriesThree = useRef(null);

    const [maxValue, setMaxValue] = useState("");
    const [minValue, setMinValue] = useState("");
    const [leyenda, setLeyenda] = useState({
      Receta: "",
      Lote: "",
      FechaInicio: ""
    })

    function formatearFecha(fechaStr) {
      var fecha = new Date(fechaStr);
      return fecha.getUTCDate() + " " + fecha.toLocaleString('default', { month: 'long' }) + " " + fecha.getUTCFullYear() + " : " + fecha.getUTCHours() + ":" + fecha.getUTCMinutes() + " hs";
  }

    useLayoutEffect(() => {
        const container = document.getElementById("chart-container-register-historico");
        const chartInstance = createChart(container, {
            ...ChartLayoutOptions,
            width: container.clientWidth
        });

        chartInstance.timeScale().fitContent();
        
        chartInstance.timeScale().applyOptions({
            timeVisible: false,
            secondsVisible: false,
            tickMarkFormatter: (time, tickMarkType, locale) => {
              const date = new Date(time * 1000); 
              console.log("HORA DEL CICLO !!!!!!:", date.getHours(), "VALOR DEL TIEMSTAPPP:" , time);
              const formattedDate = date.toLocaleDateString(locale, {
                month:"numeric",
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
              });
              console.log(formattedDate);
              return formattedDate;
            },
          });
        // add line Price series to chart (TEMP_PRODUCTO, TEMP_AGUA, TEMP_INGRESO):
        const series = chartInstance.addLineSeries({
            color: "rgba(239, 83, 80, 1)", lineWidth: 2
            });
        series.setData([]);

        const secondSeries = chartInstance.addLineSeries( { priceScaleId: "right", color: "#33A7FD"});
        secondSeries.setData([]);

        const thirdSeries = chartInstance.addLineSeries( { priceScaleId:"right", color: "orange"});
        thirdSeries.setData([]);

        seriesOne.current = series;
        seriesTwo.current = secondSeries;
        seriesThree.current = thirdSeries;
        setChart(chartInstance);

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
                time: item[1],
                value: parseFloat(item[0])
            }});
            console.log(formatter);

            
            setComponents(prevComponents => [
              {
                ...prevComponents[0], // Copiar el objeto existente en el índice uno
                minValue: apiData.data.min,
                maxValue: apiData.data.max
              },
              ...prevComponents.slice(1) // Mantener los últimos objetos sin cambios
            ]);
            return seriesOne.current.setData(formatter);
          } catch (error) {
            console.log(error);
          }
        }
        fetchDataHistorico();
        console.log(leyendaCiclo.length);
        console.log(leyendaCiclo[0]);
        if (leyendaCiclo.length > 0) {
          console.log("llegue");
          setLeyenda({
            Receta: leyendaCiclo[0].Receta,
            Lote: leyendaCiclo[0].Lote,
            FechaInicio: formatearFecha(leyendaCiclo[0].fecha_inicio)
          })
        }
        console.log(leyenda);
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
                time: item[1],
                value: parseFloat(item[0])
            }});
            console.log(formatter);
            setComponents(prevComponents => [
              ...prevComponents.slice(0, 1), // Mantener los primeros objetos sin cambios
              {
                ...prevComponents[1], // Copiar el objeto existente en el índice uno
                minValue: apiData.data.min,
                maxValue: apiData.data.max
              },
              ...prevComponents.slice(2) // Mantener los últimos objetos sin cambios
            ]);
            return seriesTwo.current.setData(formatter);
          } catch (error) {
            console.log(error);
          }
        }
        fetchDataHistorico();

      }, [ciclo])
      useEffect(()=> {
        console.log("ME EJECUTE DESDE EL PANEL " + ciclo);
        const fetchDataHistorico = async() => {
          try {
            const apiData = await getDataComponent("TEMP_INGRESO", ciclo);
            console.log(apiData.data.data);
            const formatter = apiData.data.data.map((item)=> {
              return {
                time: item[1],
                value: parseFloat(item[0])
            }});
            setComponents(prevComponents => [
              ...prevComponents.slice(0, 2), // Mantener los primeros objetos sin cambios
              {
                ...prevComponents[2], // Copiar el objeto existente en el índice dos
                minValue: apiData.data.min,
                maxValue: apiData.data.max
              }
            ]);
            return seriesThree.current.setData(formatter);
          } catch (error) {
            console.log(error);
          }
        }
        fetchDataHistorico();
        console.log(components);
        //seriesOne.current.createPriceLine(maxPriceLine);
        //seriesOne.current.createPriceLine(minPriceLine);

      }, [ciclo])
      

    return ( 
        <section className={Style.c_chart}>
                    <ul className={Style.list_option_component}>
                            <section style={{display: "flex",alignItems: "center",gap:"10px" }}>
                                {components.map((component, index) => {
                                    return (
                                            <div key={index} style={{display:"flex", flexDirection:"column", gap:"10px", padding:"10px", border:"1px solid #3D3D3D", borderRadius:"5px", minWidth:"175px"}}>
                                              <div style={{display: "flex",alignItems: "center",gap:"10px" }}>
                                                <div className={Style.component_point_series} style={{background: component.color, }}></div>
                                                <h3 className={Style.component_name} style={{margin:"0px"}}>{component.name}</h3>
                                              </div>
                                              <div style={{display:"flex", flexDirection:"column", gap:"10px", marginLeft:"20px" }}>
                                                <span className={Style.component_title_value} style={{color:"#fff"}}>Max: {component.maxValue} °C</span>
                                                <span className={Style.component_title_value} style={{color:"#fff"}}>Min: {component.minValue} °C</span>
                                              </div>
                                            </div>
                                    )
                                })}
                            </section>
                            <section className={Style.component_leyenda_ciclo}>
                                <h3 className={Style.component_leyenda_title }>Receta: {` ${leyenda.Receta}`}</h3>
                                <h3 className={Style.component_leyenda_title }>Lote:  {` ${leyenda.Lote}`}</h3>
                                <h3 className={Style.component_leyenda_title }>Fecha Incio: {`${leyenda.FechaInicio}`}</h3>
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
                    <img src={ Logo } alt="" style={{
                        position:"absolute", zIndex:"100", width:"320px", left:"0", right:"0", bottom:"0", top:"0", margin: "auto",  opacity:"0.3",   
                    }}/>
                </section>
        </section>
    )
})
ChartHistorico.displayName = "ChartHistorico"