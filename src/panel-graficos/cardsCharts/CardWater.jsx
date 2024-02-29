//Depending 
import Style from "../PanelGraficos.module.css"
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//Component
import { ChartWaterLavel } from "../../charts/ChartWaterLevel";

export const CardWater  = ({ chartName, component, urlComponent }) => {
    //const equipo = "Cocina1"

    const [started, setStarted] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const abrirCalendario = (e) => {
        e.preventDefault();
        console.log("Clic en el botón");
        const inputFecha = document.getElementById("datepicker_aux");
      
        if (inputFecha) {
          inputFecha.focus(); 
          console.log(inputFecha.focus());
          console.log(inputFecha);
        } else {
          console.error("No se pudo encontrar el elemento input.");
        }
      };
    return (
       <section className={Style.c_chart}>
                <article className={Style.c_title}>
                    <h2 className={Style.title}>{ component }</h2>
                    <p className={Style.form_title}> Filtrar por fecha</p>
                </article>

                <nav>
                    <ul className={Style.list_option_component}>
                        <button onClick={() => setStarted(current => !current)} className={ started ? Style.list_button_component  + " " + Style.isActiveButton : Style.list_button_component }><li>Iniciar Lectura</li>
                        </button>

                        <form action="" className={Style.form_date}>
                            <div className={Style.form_input}>
                                <input className={ Style.form_input_one } type="date" name="date_start" id="datepicker_aux" />
                                <button
                                    onClick={abrirCalendario}
                                >
                                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 icn ${Style.icon_calender}`}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                                    </svg>
                                </button>
                                
                            </div>
                            <div className={Style.form_input}>
                                <input className={ Style.form_input_one } type="date" name="date_start" id="datepicker_aux" />
                                <button
                                    onClick={abrirCalendario}
                                >
                                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 icn ${Style.icon_calender}`}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                                    </svg>
                                </button>
                                
                            </div>


                            


                            <button className={ Style.list_button_component}><li>Buscar</li></button>
                        </form>


                    </ul>

                </nav>

                <section className={Style.c_chartSeries}>
                    < ChartWaterLavel load = { started } chartName={ chartName } url={urlComponent} />
                </section>
        </section>
    )
}
