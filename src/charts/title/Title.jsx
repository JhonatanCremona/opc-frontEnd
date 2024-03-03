import Style from "./Title.module.css";


export const Title = (props) => {
    const { title, report, chart, properties, description } = props;
    return (
        <div className={Style.titleBox}>
            { report && (
                <>
                <h2 className={title == "Cocina" ? 
                `${Style.Cocina}` : 
                `${Style.Enfriador}` 
                }> {title} </h2>
                <h3 className={`${Style.title} ${Style.Receta}`}>{ properties + ": " +  description }</h3>
                </>
            )}

            { chart && (
                <>
                <h2 className={Style.title + " "+ Style.Receta }> {title} </h2>
                <h3 className={Style.title + " " + Style.CocinaTitle}>{ props.properties + ": " +  props.description }</h3>
                </>
            )}
            
            
        </div>
    )
}
