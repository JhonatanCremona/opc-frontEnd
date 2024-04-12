//Depending
import { useEffect, useState} from "react";
import { Navigate, useParams } from 'react-router-dom';
import Style from "./PanelControl.module.css"
import ReporteCocina from "../JSON/Reporte.json"
import ReporteEnfriador from "../JSON/ReporteEnfriador.json";
import { getReportMachine, valueStateMachine } from "../service/client";
import { Link } from "react-router-dom"

//Components
import { NavEquipos } from "../navbar/navEquipos/NavEquipos";
import { Title } from "../charts/title/Title";
import { SensorSinGrafico } from "../Components/sensores/SensoresSinGrafico";
import { CardComponentChart } from "./cardsComponent/CardComponentChart";
import { Card } from "../panel-graficos/cardsCharts/Card";

//Image Component
import ImgValvula from "../Icon/valvulaActive.png";
import ImgValvulaInactive from "../Icon/valvulaInactive.png";
import ImgPasos from "../Icon/pasos.png";
import ImgPasosInactive from "../Icon/pasosInactive.png";
import ImgReloj from "../Icon/reloj.png";
import ImgRelojInactive from "../Icon/relojInactive.png";
import ImgReceta from "../Icon/recetas.png";
import ImgRecetaInactive from "../Icon/recetasInactive.png";
import ImgSensorAguar from "../Icon/el-ciclo-del-agua.png";
import { Productivity } from "./productividad/Productivity";
import { ArrowButton } from "../Icon/Icon";

export const ControlPanel = () => {
    const [datos, setDatos] = useState({})
    let { equipo } = useParams();
    let StyleMachine = `${Style.subTitleElement} ${equipo.includes("Cocina") ? Style.card_cocina : equipo.includes("Enfriador") ? Style.card_enfriador : ""}`;

    useEffect(()=> {
        let isFetching = false;
        const fetchDataReporter =  async () => {
            let response;
            if (!isFetching) {
                isFetching = true;
                try {
                    response = await getReportMachine(equipo);
                    console.log(response);
                    response.data.componentes.ESTADO = valueStateMachine(response.data.componentes.ESTADO);
                    setDatos(response.data || {});
                } catch (error) {
                    console.error("MENSAJE ERROR READAPI REPORT: ", error);
                    setDatos(equipo === "Cocina1" ? ReporteCocina : equipo === "Enfriador1" ? ReporteEnfriador : {});
                } finally {
                    isFetching = false;
                }
                await new Promise((resolve) => setTimeout(resolve,5000));
            }
            fetchDataReporter();
            console.log(datos);
        }
        fetchDataReporter();
    },[]);

    if (equipo != "Cocina1" && equipo != "Enfriador1") {
        return <Navigate to="/" />;
    }
    
    return (
        <>
            <NavEquipos url= {"control"}/>
            <main className={Style.CabeceraPanelControl}>
                <Title title={ equipo } properties={"RECETA"} description={ `${ datos?.componentes?.ESTADO == "INACTIVO" ? "": datos.NRO_RECETA +" - "+datos.NOMBRE_RECETA }` } report={true} />
                
                <section className={Style.boxDataTime}>
                    < Card controlpanel={true} value={ datos?.componentes?.ESTADO }/>

                    <article className={Style.card_component_electrique}>
                        <div className={Style.flex_person}>
                            <h2 className={Style.titleElement}>Estado Equipo</h2>
                            <Link 
                                to={`/panel-graficos/${equipo.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')}`}
                                className={Style.card_button}>Ver graficos <ArrowButton />
                            </Link>
                        </div>
                        <h3 className={`${StyleMachine}`}>{(datos?.componentes?.ESTADO)}</h3>
                        
                        <section className={Style.ElementSensor}>
                            < CardComponentChart name_sensor={"TEMP. INGRESO"} value={datos?.componentes?.TEMP_INGRESO} tipo={"°C"} machine={equipo}/>
                            < CardComponentChart name_sensor={"TEMP. PRODUCTO"} value={datos?.componentes?.TEMP_PRODUCTO} tipo={"°C"} machine={equipo}/>
                            < CardComponentChart name_sensor={"TEMP. AGUA"} value={datos?.componentes?.TEMP_AGUA} tipo={"°C"} machine={equipo}/>

                            { equipo !== "Cocina1" &&
                                <CardComponentChart value={datos?.componentes?.TEMP_CHILLER} name_sensor={"TEMP. CHILLER"} tipo={"°C"} machine={equipo} />
                            }
                            <SensorSinGrafico value={datos?.componentes?.NIVEL_AGUA} tipo={"mm"}  nSensor={"NIVEL DE AGUA"} img={ImgSensorAguar}/>
                        </section>
                    </article>

                    <section className={Style.dataTime}>
                    <div className={Style.flex_person}>
                        <h2 className={Style.titleElement}>Ciclo activo</h2>
                            <Link 
                                to={`/panel-graficos/${equipo.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')}`}
                                className={Style.card_button} >Ver graficos <ArrowButton />
                            </Link>
                        </div>
                        <h3 className={`${StyleMachine}`}>{(datos?.componentes?.ESTADO)}</h3>
                        <section className={Style.ElementSensor +" "+Style.ElementSecond}>
                            <SensorSinGrafico value={ datos.TIEMPO_TRANSCURRIDO } tipo={"hs"}  nSensor={"Tiempo Transcurrido"} 
                            img={ datos?.componentes?.ESTADO == 2 || datos?.componentes?.ESTADO == "OPERACIONAL" ? ImgReloj : ImgRelojInactive }/>
                            <SensorSinGrafico value={ datos.NRO_PASOS }  nSensor={"N° Pasos"} img={ datos?.componentes?.ESTADO == 2 || datos?.componentes?.ESTADO == "OPERACIONAL" ? ImgPasos : ImgPasosInactive }/>
                            <SensorSinGrafico value={ datos.NRO_RECETA } nSensor={"N° Receta"} img={ datos?.componentes?.ESTADO == 2 || datos?.componentes?.ESTADO == "OPERACIONAL" ? ImgReceta : ImgRecetaInactive }/>
                            <SensorSinGrafico value={ "1"} nSensor={"N° Torres"} img={ImgSensorAguar}/>
                            <SensorSinGrafico value={ datos.LOTEPESO } nSensor={"N° de Lote actual"} img={ datos?.componentes?.ESTADO == 2 || datos?.componentes?.ESTADO == "OPERACIONAL" ? ImgPasos : ImgPasosInactive }/>
                        </section>
                    </section>

                    <section className={`${Style.dataTime} ${Style.dateTimeSectorIO}` }>
                        <div className={Style.flex_person}>
                        <h2 className={Style.titleElement}>Sector IO</h2>
                            <Link 
                                to={`/panel-graficos/${equipo.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')}`}
                                className={Style.card_button}>Ver graficos <ArrowButton />
                            </Link>
                        </div>
                        <h3 className={`${StyleMachine}`}>{(datos?.componentes?.ESTADO)}</h3>
                        <section className={Style.ElementSensor}>
                            { equipo == "Enfriador1" ? 
                                <SensorSinGrafico value={datos?.componentes?.VAPOR_SERPENTINA ? "Abierta" : "Cerrada"} nSensor={"Válvula Amoníaco"} img={datos?.componentes?.VAPOR_SERPENTINA ? ImgValvula : ImgValvulaInactive} /> :
                              equipo == "Cocina1" ?  
                              <>
                              <SensorSinGrafico value={datos?.componentes?.VAPOR_SERPENTINA ? "Abierta" : "Cerrada"} nSensor={"Vapor Serpentina"} img={datos?.componentes?.VAPOR_SERPENTINA ? ImgValvula : ImgValvulaInactive}/>
                              <SensorSinGrafico value={datos?.componentes?.VAPOR_VIVO ? "Abierta" : "Cerrada"} nSensor={"Vapor Vivo"} img={datos?.componentes?.VAPOR_VIVO ? ImgValvula : ImgValvulaInactive}/>
                              </> :
                                {}
                            }
                        </section>
                    </section>
                </section>
                <Productivity />
            </main>
        </>
    )
}