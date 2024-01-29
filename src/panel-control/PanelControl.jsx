import { useState } from "react"
import { useParams } from "react-router"
import Style from "./PanelControl.module.css"

export const PanelControl = () => {
    const { equipo } = useParams();
    const { data, setData } = useState({});



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

            <main>
                <div className={Style.titleBox}>
                    <h2 className={Style.title + " " + Style.n1}>COCINA 1</h2>
                    <h3 className={Style.title + " " + Style.n2}>COCINAS & ENFRIADORES</h3>
                </div>
                <section
                className={Style.boxDataTime}
                >
                    <section className={Style.dataTime}>
                        <h2>Estado Equipo</h2>
                        <section>
                            <article></article>
                            <article></article>
                            <article></article>
                        </section>
                    </section>

                    <section className={Style.dataTime}>
                        <h2>Produccion en Ciclo</h2>
                        <section>
                            <article></article>
                            <article></article>
                            <article></article>
                        </section>
                    </section>

                    <section className={Style.dataTime}>
                        <h2>Sector IO</h2>
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