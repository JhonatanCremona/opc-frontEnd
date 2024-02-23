//Depending on the
import Style from "./PanelGraficos.module.css";
//Component
import { Card } from "./cardsCharts/Card";
import { CardWater } from "./cardsCharts/CardWater";
import { Title } from "../charts/title/Title";

export const PanelGraficos = () => {
    
    return (
        <div className={Style.container}>
            < Title title={"GRÁFICOS"} properties={"MAQUINA"} description={"COCINA 1"} />
            <div className={Style.container_chart}>
                < Card />
                < CardWater component= {"Nivel de Agua"} chartName= { "container-nv-agua" } urlComponent={"NIVEL_AGUA"}/>
                < CardWater component= {"Temp. Agua"} chartName={ "container-otro" } urlComponent={"TEMP_AGUA"} />
            </div>
        </div>
    )
}