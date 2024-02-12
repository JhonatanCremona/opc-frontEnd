//Depending on the
import Style from "./PanelGraficos.module.css";
//Component
import { Card } from "./cardsCharts/Card";
import { CardWater } from "./cardsCharts/CardWater";

export const PanelGraficos = () => {
    
    
    return (
        <div className={Style.container}>
            < Card />
            < CardWater />
        </div>
    )
}