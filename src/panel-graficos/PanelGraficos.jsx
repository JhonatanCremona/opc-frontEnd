//Depending on the
import Style from "./PanelGraficos.module.css";
//Component
import { Card } from "./cardsCharts/Card";
import { CardWater } from "./cardsCharts/CardWater";
import { Title } from "../charts/title/Title";
import { useParams } from "react-router";

export const PanelGraficos = () => {
    console.log("RUTA ACTUAL: ", useParams);
    
    return (
        <div className={Style.container}>
            < Title title={"GRÁFICOS"} properties={"MAQUINA"} description={"COCINA 1"} />
            <div className={Style.container_chart}>
                < Card />
                < CardWater component= {"Nivel de Agua"} chartName= { "container-nv-agua" }/>
                < CardWater component= {"Válvula"} chartName={ "container-otro" }/>
            </div>
        </div>
    )
}