import Style from "../../panel-graficos/PanelGraficos.module.css";
import { useState } from "react";

//Component
import { ChartCompTemp } from "../../charts/ChartCompTemp"

export const Chart = () => {
    const [ sensors, setSensors ] = useState([
        {
            id: 1,
            name: "Temp. Ingreso",
            estado: false
        },
        {
            id: 2,
            name: "Temp. Agua",
            estado: false
        },
        {
            id: 3,
            name: "Temp. Producto",
            estado: false
        }
    ])
    function updateSensorState( idSensor) {
        setSensors( (prevSensors) => {
            return prevSensors.map((sensor) =>
                sensor.id === idSensor ? { ...sensor, estado: !sensor.estado } : sensor
            );
        });
    }       
    
    return (
        <>
            <section className={Style.c_chart}>
                <article className={Style.c_title}>
                <h2 className={Style.title}>Sensores de Temperatura</h2>
                
                </article>
                <nav>
                    <ul className={Style.list_option_temp}>
                        {sensors.map( (sensor) => {
                            return (
                                <button key={sensor.id} onClick={() => updateSensorState(sensor.id) }
                                className={sensor.estado ? Style.list_button  + " " + Style.isActiveButton : Style.list_button }><li>{sensor.name}</li></button>
                            )
                        })}
                    </ul>

                </nav>
                <section className={Style.c_chartSeries}>
                    <ChartCompTemp sensorsComponent = { sensors } updateSensorsComponent ={ setSensors } />
                </section>
            </section>
        </>
    )
}