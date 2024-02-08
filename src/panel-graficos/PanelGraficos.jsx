import { ChartTemp } from "../charts/ChartTemp";
import Style from "./PanelGraficos.module.css";

export const PanelGraficos = () => {
    return (
        <div className={Style.container}>
            
            <section className={Style.c_chart}>
                <article className={Style.c_title}>
                <h2 className={Style.title}>Sensores de Temperatura</h2>
                <button 
                    className={Style.buttonDownload}
                    onClick={"Descarga"}
                >
                    Descargar
                </button>
                </article>
                <nav>
                    <ul className={Style.list_option_temp}>
                        <li>Temp. Producto</li>
                        <li>Temp. Ingreso</li>
                        <li>Temp. Agua</li>
                        <li></li>
                    </ul>
                </nav>
                <ChartTemp />
            </section>

        </div>
    )
}