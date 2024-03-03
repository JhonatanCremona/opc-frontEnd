import Style from "./Cards.module.css"

//Imagenes
import ImgTemperaturaCocina from "../../Icon/temperatura.png";
import ImgTemperaturaEnfriador from "../../Icon/temperaturaEnfriador.png";

export const CardComponentChart = ({ name_sensor, value, tipo, machine }) => {
    const nameMachine = machine;
    const isCocina = nameMachine.includes("Cocina");
    const isEnfriador = nameMachine.includes("Enfriador");

    let settingsStyle = {
        Style: `${Style.card_value_component} ${isCocina ? Style.card_cocina : isEnfriador ? Style.card_enfriador : ""}`,
        imgen: isCocina ? ImgTemperaturaCocina : isEnfriador ? ImgTemperaturaEnfriador : "",
    };

    return (
        <section className={Style.card_container}>
            <article className={Style.card_header}>
                <h3 className={Style.card_title}>{ name_sensor }</h3>
                <div className={Style.card_box_imagen}>
                    <img className={Style.imagen} src={settingsStyle.imgen} alt="Imgen del sensor" />  
                </div>
            </article>
            <p className={`${settingsStyle.Style}`}>{ parseFloat(parseFloat(value).toFixed(2)) }
                <span className={Style.card_tipo_dato}>{tipo}</span>
            </p>
        </section>
    )
}