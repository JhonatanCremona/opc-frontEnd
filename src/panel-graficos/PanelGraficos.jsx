//Depending on the
import Style from "./PanelGraficos.module.css";
import { Navigate, useParams } from 'react-router-dom';
import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SearchIcon,DownloadReportIcon } from "../Icon/Icon";
import { getCiclo,getDataComponent } from "../service/client";
//Component
import { Card } from "./cardsCharts/Card";
import { CardWater } from "./cardsCharts/CardWater";
import { Title } from "../charts/title/Title";
import { NavEquipos } from "../navbar/navEquipos/NavEquipos";
import { Modals } from "../Modals/Modals";
import { ChartWaterLavel } from "../charts/ChartWaterLevel";
import { PanelContext } from "../context/PanelContext";


export const PanelGraficos = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [estadoModalOne, setEstadoModalOne] = useState(false);
    const [dataCiclos, setListDataCiclos] = useState([{}]);
    const [ cicloId, setIdCiclo ] = useState(0);

    let { setCiclo } = useContext(PanelContext);
    let { equipo } = useParams();
    if (equipo != "Cocina1" && equipo != "Enfriador1") { return <Navigate to="/" />;}

    const startYear = 2021;
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - startYear + 1 }, (_, index) => startYear + index);
    const months = [ "Enero", "Febrero","Marzo", "Abril", "Mayo", "Junio","Julio",  "Agosto","Septiembre","Octubre","Noviembre", "Diciembre",];
    const handleSubmitCiclo = async (idCiclo)=>{
        setEstadoModalOne(false);
        setIdCiclo(idCiclo);
        setCiclo(idCiclo);
        console.log(idCiclo);
        console.log(await getDataComponent("TEMP_AGUA", idCiclo));
    }

    const handleSubmit = async(event) => {
        event.preventDefault(); 
        let machine = equipo == "Cocina1" ? "1" : "2";

        if ( startDate !== null && endDate !== null ) {
            try {
                //const response = getCiclo(machine, startDate.toISOString().slice(0,10), endDate.toISOString().slice(0,10));
                const response = await getCiclo(machine, "2024-01-01", "2024-04-01");
                console.log( response.data.ciclos);
                setListDataCiclos(response.data.ciclos)
            } catch (error) {
                console.error(error);
            }
        }
    };
    

    return (
        <div className={Style.container}>
            <NavEquipos />
            < Title title={"GRÁFICOS"} properties={"MAQUINA"} description={ equipo } chart={true} />
            <div className={Style.container_chart}>
                < Card />
                <section className={`${Style.c_chart_header}`}>
                    <h2 className={ `${Style.title_chart_historico} `}>Temperaturas - Registro histórico</h2>
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
                                <button className={ Style.button_component}
                                onClick={()=> setEstadoModalOne(!estadoModalOne)}
                                > 
                                <SearchIcon/> Buscar</button>
                                <button className={ Style.button_component}> <DownloadReportIcon/> Descargar</button>
                            </section>
                        </form>
                        <Modals estado={estadoModalOne} switchEstado={setEstadoModalOne}>
                            <div className={`${Style.table_header}`}>
                                <section><h3 className={`${Style.title_model}`}>Id Ciclo</h3></section>
                                <section><h3 className={`${Style.title_model}`}>N° Lote</h3></section>
                                <section><h3 className={`${Style.title_model}`}>Recetas</h3></section>
                                <section><h3 className={`${Style.title_model}`}>Fecha Inicio</h3></section>
                            </div>

                            {dataCiclos.map((ciclo)=> {
                                return (
                                    <>
                                        <button key={ciclo.id_cliclo} 
                                        onClick={()=>handleSubmitCiclo(ciclo.id_cliclo)} 
                                        className={`${Style.c_container_model}`}>
                                            <section><p>{ciclo.id_cliclo}</p></section>
                                            <section><p>{ciclo.Lote}</p></section>
                                            <section> <p>{ciclo.Receta}</p></section>
                                            <section><p>{ciclo.fecha_inicio}</p></section>
                                        </button>
                                    </>
                                )
                            })}
                        </Modals>
                </section>
                <section className={`${Style.c_chart_component}`}>
                    < CardWater component= {"Temp. Producto"} chartName={ "container-otro2" } urlComponent={"TEMP_PRODUCTO"} numeroCiclo={cicloId} />
                    < CardWater component= {"Temp. Agua"} chartName={ "container-otro3" } urlComponent={"TEMP_AGUA"} numeroCiclo={cicloId} />
                    < CardWater component= {"Nivel de Agua "} chartName={ "container-otro4" } urlComponent={"NIVEL_AGUA"} numeroCiclo={cicloId} />
                </section>
            </div>
        </div>
    )
}