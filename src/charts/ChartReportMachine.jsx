import { useState, useEffect, useRef } from "react"
import { createChart, ColorType } from 'lightweight-charts';

export const ChartReportMachine = ({ value, machine }) => {
    const StyleChartCocina ={
        backgroundColor: "rgba(255, 255, 255, 0.01)",
        textColor: "white",
        lineColor: "#2962FF",
        areaTopColor: '#2962FF',
        areaBottomColor: 'rgba(41, 98, 255, 0.28)',
    };

    const StyleChartEnfriador={
        backgroundColor: "rgba(255, 255, 255, 0.01)",
        textColor: "white",
        lineColor: "#2962FF",
        areaTopColor: '#2962FF',
        areaBottomColor: 'rgba(41, 98, 255, 0.28)',
    };
    const chartRef = useRef(null);
    

    return (
        <>
        </>
    )
}