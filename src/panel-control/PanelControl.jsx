import { useParams } from "react-router"
import Style from "./PanelControl.module.css"
import { Test } from "../test/Test";

export const PanelControl = () => {
    const { equipo } = useParams();



    console.log(equipo);


    return (
        <>
            <nav>
                <article>
                    <img src="" alt="" />
                </article>
                <article>
                    <img src="" alt="" />
                </article>
            </nav>

            <main className={Style.CabeceraPanelControl}>
                <div className={Style.titleBox}>
                    <h2 className={Style.title + " " + Style.CocinaTitle}>COCINA 1</h2>
                    <h3 className={Style.title + " " + Style.Receta}>RECETA: SIN ASIGNAR</h3>
                </div>
                <section
                className={Style.boxDataTime}
                >
                    <section className={Style.dataTime}>
                        <h2 className={Style.titleElement}>Estado Equipo</h2>
                        <section className={Style.ElementSensor}>
                            <Test/>
                            <Test/>
                            <Test/>
                            <Test/>
                            <Test/>
                            <Test/>
                        </section>
                    </section>

                    <section className={Style.dataTime}>
                        <h2 className={Style.titleElement}>Produccion en Ciclo</h2>
                        <section>
                            <article></article>
                            <article></article>
                            <article></article>
                        </section>
                    </section>

                    
                    
                </section>
            </main>
        
        </>
    )
}