//Depending
import { useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import Style from "./PanelControl.module.css"
import ReporteCocina from "../JSON/Reporte.json"
import ReporteEnfriador from "../JSON/ReporteEnfriador.json";
import { getReportMachine, valueStateMachine } from "../service/client";

//Components
import { NavEquipos } from "../navbar/navEquipos/NavEquipos";
import { Title } from "../charts/title/Title";
import { ChartReportMachine } from "../charts/ChartReportMachine";
import { SensorSinGrafico } from "../Components/sensores/SensoresSinGrafico";
import { Productividad } from "./productividad/Productividad";
import { CardComponentChart } from "./cardsComponent/CardComponentChart";

export const ControlPanel = () => {
    const [datos, setDatos] = useState({})
    let { equipo } = useParams();
    let StyleMachine = `${Style.subTitleElement} ${equipo.includes("Cocina") ? Style.card_cocina : equipo.includes("Enfriador") ? Style.card_enfriador : ""}`;

    useEffect(()=> {
        let isFetching = false;
        const fetchDataReporter =  async () => {
            if (!isFetching) {
                isFetching = true;
                try {
                    const response = await getReportMachine(equipo);
                    response.data.componentes.ESTADO = valueStateMachine(response.data.componentes.ESTADO);
                    setDatos(response.data || {});
                } catch (error) {
                    console.error("MENSAJE ERROR READAPI REPORT: ", error);
                    setDatos(equipo === "Cocina1" ? ReporteCocina : equipo === "Enfriador1" ? ReporteEnfriador : {});
                } finally {
                    isFetching = false;
                }
                await new Promise((resolve) => setTimeout(resolve,1000));
            }
            fetchDataReporter();
        }
        fetchDataReporter();
    },[]);

    

    return (
        <>
            <NavEquipos/>
            <main className={Style.CabeceraPanelControl}>
                <Title title={datos.NOMBRE_EQUIPO} properties={"RECETA"} description={ datos.NRO_RECETA + " - " +  datos.NOMBRE_RECETA } report={true} />
                <section className={Style.boxDataTime}>
                    <article className={Style.card_component_electrique}>
                        <h2 className={Style.titleElement}>Estado Equipo</h2>
                        <h3 className={`${StyleMachine}`}>{(datos?.componentes?.ESTADO)}</h3>
                        
                        <section className={Style.ElementSensor}>
                            < CardComponentChart name_sensor={"TEMP. INGRESO"} value={datos?.componentes?.TEMP_INGRESO} tipo={"°C"} machine={equipo}/>
                            < CardComponentChart name_sensor={"TEMP. PRODUCTO"} value={datos?.componentes?.TEMP_PRODUCTO} tipo={"°C"} machine={equipo}/>
                            < CardComponentChart name_sensor={"TEMP. AGUA"} value={datos?.componentes?.TEMP_AGUA} tipo={"°C"} machine={equipo}/>

                            { equipo !== "Cocina1" &&
                                <CardComponentChart value={datos?.componentes?.TEMP_CHILLER} name_sensor={"TEMP. CHILLER"} tipo={"°C"} machine={equipo} />
                            }
                        </section>
                    </article>

                    <section className={Style.dataTime}>
                        <h2 className={Style.titleElement}>Ciclo activo</h2>
                        <h3 className={`${StyleMachine}`}>{(datos?.componentes?.ESTADO)}</h3>
                        <section className={Style.ElementSensor +" "+Style.ElementSecond}>
                            <SensorSinGrafico value={ datos.TIEMPO_TRANSCURRIDO } tipo={"hs"}  nSensor={"Tiempo Transcurrido"}/>
                            <SensorSinGrafico value={ datos.NRO_PASOS }  nSensor={"N° Pasos"}/>
                            <SensorSinGrafico value={ datos.NRO_RECETA } nSensor={"N° Receta"}/>
                            <SensorSinGrafico value={ "1"} nSensor={"N° Torres"}/>
                        </section>
                    </section>

                    <section className={Style.dataTime}>
                        <h2 className={Style.titleElement}>Sector IO</h2>
                        <h3 className={`${StyleMachine}`}>{(datos?.componentes?.ESTADO)}</h3>
                        <section className={Style.ElementSensor}>
                            <SensorSinGrafico value={ datos?.componentes?.VAPOR_VIVO ? "Activo" : "Inactivo" } nSensor={"Vapor Vivo"} />
                            <SensorSinGrafico value={ datos?.componentes?.VAPOR_SERPENTINA ? "Activo" : "Inactivo"} nSensor={"Vapor Serpentina"}/>
                        </section>
                    </section>


                </section>
                <Productividad />
            </main>
        </>
    )
}