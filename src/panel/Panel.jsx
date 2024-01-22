import { Arrow } from "../Icon/Icon";
import Style from "./Panel.module.css";



export const Panel = () =>{
    return (
        <>
            <div className={Style.titleBox}>
                <h2 className={Style.title + " " + Style.n1}>EQUIPOS</h2>
                <h3 className={Style.title + " " + Style.n2}>COCINAS & ENFRIADORES</h3>
            </div>

            
            <div>
                <section>

                </section>

                <section>
                    <article>
                        <h2>COCINA</h2>
                        <h2>PRE - OPERACIONAL</h2>
                        <p><span>Tiempo transcurrido:</span> {}</p>
                    </article>
                    <button>VER MAS DETALLES {<Arrow/>}</button>
                </section>
            </div>
        </>
    )
} 