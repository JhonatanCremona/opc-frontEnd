import Style from "../../panel-graficos/PanelGraficos.module.css";
import { useRef, useState } from "react";

//Component
import { ChartCompTemp } from "../../charts/ChartCompTemp"
import { useParams } from "react-router-dom";
import Logo from "../../IMG/logo/MARCA-AGUA-CREMINOX.png"

export const Card = ({ controlpanel, value }) => {
    let {equipo} = useParams();
    let cpanel = controlpanel;
    const [ sensors, setSensors ] = useState([
        {
            id: 1,
            name: "Temp. Producto",
            api:"TEMP_PRODUCTO",
            estado: true
        },
        {
            id: 2,
            name: "Temp. Agua",
            api:"TEMP_AGUA",
            estado: false
        },
        {
            id: 3,
            name: "Temp. Ingreso",
            api:"TEMP_INGRESO",
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
    const childRef = useRef();

    if ( controlpanel ) {
        return (
            <section className={`${Style.c_chart} ${Style.c_chart_panel}`}>
                <article className={Style.c_title}>
                <h2 className={Style.title_panel}>Temperaturas en tiempo real</h2>
                <h3 className={ equipo =='Cocina1' ? Style.sub_title_panel + " " + Style.cocina : Style.sub_title_panel + " " + Style.enfriador }>{ value }</h3>
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
                    <img src={ Logo } alt="" style={{
                        position:"absolute", zIndex:"10000", alignItems:"center", width:"300px", left:"150px", top:"80px", opacity:"0.5",   
                    }}/>
                    < ChartCompTemp sensorsComponent = { sensors } updateSensorsComponent ={ setSensors } panel={ cpanel } ref={childRef}/>
                </section>
            </section>
        )
    }


    return (
            <section className={ `${Style.c_chart} ${Style.c_chart_width}`}>
                <article className={Style.c_title}>
                <h2 className={Style.title}>Temperaturas en tiempo real</h2>
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
                    < ChartCompTemp sensorsComponent = { sensors } updateSensorsComponent ={ setSensors }  ref={childRef} />
                    <img src={ Logo } alt="" style={{
                        position:"absolute", zIndex:"100", width:"320px", left:"0", right:"0", bottom:"0", top:"0", margin: "auto",  opacity:"0.5",   
                    }}/>
                </section>
            </section>
    )
}