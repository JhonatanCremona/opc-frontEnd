//Depending 
import Style from "../PanelGraficos.module.css"
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//Component
import { ChartWaterLavel } from "../../charts/ChartWaterLevel";
import { SearchIcon, DownloadReportIcon } from "../../Icon/Icon"

export const CardWater  = ({ chartName, component, urlComponent }) => {
    //const equipo = "Cocina1"
    const [started, setStarted] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const startYear = 2021;
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - startYear + 1 }, (_, index) => startYear + index);
    const months = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
    ];
    /*
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
    };*/
    const handleSubmit = (event) => {
        event.preventDefault(); 
    };
    return (
       <section className={Style.c_chart}>
                

                <nav>
                    <ul className={Style.list_option_component}>
                        <article className={Style.c_title}>
                            <h2 className={Style.title}>{ component }</h2>
                            <button onClick={() => setStarted(current => !current)} className={ started ? Style.button_component  + " " + Style.isActiveButton : Style.button_component }><li>Iniciar Lectura</li>
                            </button>
                        </article>
                        
                        <form className={Style.form_date} onSubmit={handleSubmit}>
                            <section className={Style.form_box_date}>
                                <div className={Style.box_date}>
                                <h2 className={Style.sub_title}>Fecha Inicio</h2>
                                <DatePicker
                                    showIcon
                                    renderCustomHeader={({
                                        date,
                                        changeYear,
                                        changeMonth,
                                        decreaseMonth,
                                        increaseMonth,
                                        prevMonthButtonDisabled,
                                        nextMonthButtonDisabled,
                                        }) => (
                                        <div
                                            style={{
                                            margin: 10,
                                            display: "flex",
                                            justifyContent: "center",
                                            }}
                                        >
                                            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                                            {"<"}
                                            </button>
                                            <select
                                            value={date.getFullYear()}
                                            onChange={({ target: { value } }) => changeYear(value)}
                                            >
                                            {years.map((option) => (
                                                <option key={option} value={option}>
                                                {option}
                                                </option>
                                            ))}
                                            </select>
                                
                                            <select
                                            value={months[date.getMonth()]}
                                            onChange={({ target: { value } }) =>
                                                changeMonth(months.indexOf(value))
                                            }
                                            >
                                            {months.map((option) => (
                                                <option key={option} value={option}>
                                                {option}
                                                </option>
                                            ))}
                                            </select>
                                
                                            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                                            {">"}
                                            </button>
                                        </div>
                                        )}
                                    closeOnScroll={true}
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    className={`${Style.date_picker}`}
                                    isClearable
                                    placeholderText="Seleccione una Fecha Inicio"
                                    icon={
                                        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 icn">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                                        </svg>
                                    }
                                />
                                </div>
                                <div className={Style.box_date}>
                                    <h2 className={Style.sub_title}>Fecha Fin</h2>
                                    <DatePicker
                                        showIcon
                                        closeOnScroll={true}
                                        renderCustomHeader={({
                                            date,
                                            changeYear,
                                            changeMonth,
                                            decreaseMonth,
                                            increaseMonth,
                                            prevMonthButtonDisabled,
                                            nextMonthButtonDisabled,
                                            }) => (
                                            <div
                                                style={{
                                                margin: 10,
                                                display: "flex",
                                                justifyContent: "center",
                                                }}
                                            >
                                                <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                                                {"<"}
                                                </button>
                                                <select
                                                value={date.getFullYear()}
                                                onChange={({ target: { value } }) => changeYear(value)}
                                                >
                                                {years.map((option) => (
                                                    <option key={option} value={option}>
                                                    {option}
                                                    </option>
                                                ))}
                                                </select>
                                    
                                                <select
                                                value={months[date.getMonth()]}
                                                onChange={({ target: { value } }) =>
                                                    changeMonth(months.indexOf(value))
                                                }
                                                >
                                                {months.map((option) => (
                                                    <option key={option} value={option}>
                                                    {option}
                                                    </option>
                                                ))}
                                                </select>
                                    
                                                <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                                                {">"}
                                                </button>
                                            </div>
                                            )}
                                        selected={endDate}
                                        onChange={(date) => setEndDate(date)}
                                        className={`${Style.date_picker}`}
                                        isClearable
                                        placeholderText="Seleccione una Fecha Fin"
                                        icon={
                                            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 icn">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                                            </svg>
                                        }
                                    />  
                                </div>  
                            </section>
                            <section className={Style.form_box_buttom}>
                                <button className={ Style.button_component}> <SearchIcon/> Buscar</button>
                                <button className={ Style.button_component}> <DownloadReportIcon/> Descargar</button>
                            </section>
                        </form>
                    </ul>
                </nav>

                <section className={Style.c_chartSeries}>
                    < ChartWaterLavel load = { started } chartName={ chartName } url={urlComponent} />
                </section>
        </section>
    )
}
