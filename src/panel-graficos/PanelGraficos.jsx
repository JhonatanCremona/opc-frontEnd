//Depending on the
import Style from "./PanelGraficos.module.css";
import { useParams } from 'react-router-dom';
//Component
import { Card } from "./cardsCharts/Card";
import { CardWater } from "./cardsCharts/CardWater";
import { Title } from "../charts/title/Title";


export const PanelGraficos = () => {
    let { equipo } = useParams();
    
    return (
        <div className={Style.container}>
            < Title title={"GRÁFICOS"} properties={"MAQUINA"} description={ equipo } chart={true} />
            <div className={Style.container_chart}>
                < Card />
                < CardWater component= {"Temp. Producto"} chartName={ "container-otro" } urlComponent={"TEMP_PRODUCTO"} />
                < CardWater component= {"Temp. Ingreso"} chartName={ "container-otro2" } urlComponent={"TEMP_INGRESO"} />
                < CardWater component= {"Temp. Agua"} chartName={ "container-otro3" } urlComponent={"TEMP_AGUA"} />
                {equipo == "Enfriador1" && 
                < CardWater component= {"Temp. Chiller"} chartName={ "container-otro4" } urlComponent={"TEMP_CHILLER"} />
                }
                < CardWater component= {"Nivel de Agua"} chartName= { "container-nv-agua" } urlComponent={"NIVEL_AGUA"}/>    
            </div>
        </div>
    )
}