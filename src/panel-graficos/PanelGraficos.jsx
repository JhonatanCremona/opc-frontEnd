import { useState } from "react";
import { ChartTemp } from "../charts/ChartTemp";
import Style from "./PanelGraficos.module.css";

export const PanelGraficos = () => {
    const [startTempIngreso, setStartTempIngreso] = useState(false);
    const [ startAgua, setStartAgua] = useState(false); 
    
    return (
        <div className={Style.container}>
            
            <section className={Style.c_chart}>
                <article className={Style.c_title}>
                <h2 className={Style.title}>Sensores de Temperatura</h2>
                
                </article>
                <nav>
                    <ul className={Style.list_option_temp}>
                        <button onClick={() => setStartTempIngreso((prev) => !prev)}
                        className={ startTempIngreso ? Style.list_button  + " " + Style.isActiveButton : Style.list_button } ><li className={Style.list_component}>Temp. Producto</li></button>
                        <button 
                        className={Style.list_button}><li>Temp. Ingreso</li></button>
                        <button onClick={() => setStartAgua ((prev) => !prev)}
                        className={startAgua ? Style.list_button  + " " + Style.isActiveButton : Style.list_button }><li>Temp. Agua</li></button>
                    </ul>
                </nav>
                <ChartTemp 
                startIngreso ={ startTempIngreso } setStart={ setStartTempIngreso } 
                startAgua ={ startAgua } setStartAgua={ setStartAgua }
                />

            </section>
        </div>
    )
}