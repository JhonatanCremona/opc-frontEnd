import { useState } from "react";
import { ChartTemp } from "../charts/ChartTemp";
import Style from "./PanelGraficos.module.css";
import { Chart } from "./charts/Chart";

export const PanelGraficos = () => {
    const [startTempIngreso, setStartTempIngreso] = useState(false);
    const [ startAgua, setStartAgua] = useState(false); 
    
    return (
        <div className={Style.container}>
            
            

            <Chart />
        </div>
    )
}