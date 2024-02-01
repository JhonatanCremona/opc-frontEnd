import { useParams } from "react-router"
import Style from "./PanelControl.module.css"
import { Test } from "../test/Test";

//Imagenes
import Cocina from "../IMG/Cocina/COTM-09-0001-r01.png"
import Enfriador from "../IMG/Enfriador/ENTM-09-0001-rev01.png"

export const PanelControl = () => {
    const { equipo } = useParams();

    console.log(equipo);

    return (
        <div>
            
            <nav className={Style.equipoNav}>
                <article className={Style.boxImagen}>
                    <img className={Style.Imagen} src={Cocina} alt="Imagen Cocina" />
                </article>
                <article className={Style.boxImagen}>
                    <img className={Style.Imagen} src={Enfriador} alt="Imagen Enfriador" />
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
                        <h2 className={Style.titleElement}>Ciclo activo</h2>
                        <section>
                            <article></article>
                            <article></article>
                            <article></article>
                        </section>
                    </section>

                    <section className={Style.dataTime}>
                        <h2 className={Style.titleElement}>Sector IO</h2>
                        <section>
                            <article></article>
                            <article></article>
                            <article></article>
                        </section>
                    </section>

                </section>
            </main>
        
        </div>
    )
}