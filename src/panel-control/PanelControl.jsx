import { useState } from "react"
import { useParams } from "react-router"


export const PanelControl = () => {
    const { equipo } = useParams();
    const { data, setData } = useState({});



    console.log(equipo);


    return (
        <main>
            <section>
                <h2>
                {equipo}
                </h2>
                <h2>
                RECETA: <span>SIN ASIGNAR</span>
                </h2>
            </section>
            <section>
                <article></article>
                <article></article>
                <article></article>
            </section>
        </main>
    )
}