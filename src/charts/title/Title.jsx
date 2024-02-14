import Style from "./Title.module.css";


export const Title = (props) => {
    return (
        <div className={Style.titleBox}>
            <h2 className={Style.title + " "+ Style.Receta }> {props.title} </h2>
            <h3 className={Style.title + " " + Style.CocinaTitle}>{ props.properties + ": - " +  props.description }</h3>
        </div>
    )
}