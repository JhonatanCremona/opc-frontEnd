import { createChart } from "lightweight-charts";
import { forwardRef, useEffect, useLayoutEffect, useRef,useContext, useState } from "react";
import { PanelContext } from "../context/PanelContext";


export const ChartHistorico = forwardRef(({children, idCiclo, chartName }, ref) => {
    console.log(" Nª Ciclo", idCiclo);
    
    const { ChartLayoutOptions, StyleSeriesBase, StyleTooltip } = useContext(PanelContext);
    const seriesRef = useRef(null);
    const [maxValue, setMaxValue] = useState("");
    const [minValue, setMinValue] = useState("");
    const toolTip = document.createElement("div");

    toolTip.style = StyleTooltip.sensor_water_level.sw_initial;
    toolTip.style.background = StyleTooltip.sw_bcakgraund;
    toolTip.style.color = StyleTooltip.sw_color;
    toolTip.style.borderColor = StyleTooltip.sw_border;

    console.warn(ChartLayoutOptions);
    console.warn(StyleSeriesBase);

    useLayoutEffect(() => {
        const container = document.getElementById(chartName);
        container.appendChild(toolTip);
        const chartInstance = createChart(container, {
            ...ChartLayoutOptions,
            width: container.clientWidth
        });
        chartInstance.timeScale().fitContent();
    })
    return ( 
        <>
            {children}
        </>
    )
})
ChartHistorico.displayName = "ChartHistorico"