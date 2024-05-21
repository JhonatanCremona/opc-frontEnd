import Style from "./Title.module.css";
import anime from "animejs";
import "./testing.css";
import { useEffect } from "react";

export const Title = (props) => {
    const { title, report, chart, properties, description } = props;
    console.log(description);

    let StyleMachine = description == "Cocina1" ? `${Style.CocinaTitle}` : 
    description == "Enfriador1" ? `${Style.EnfriadorTitle}` : `${Style.machine}`

    let data = description.replace(/(\D)(\d+)/, "$1 $2");
    let titlePanel = title.replace(/(\D)(\d+)/, "$1 $2");

    function animationTitle(className) {
        var textWrapper = document.querySelector(`.${className} .letters`);
        textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
        anime.timeline()
        .add({
            targets: `.${className} .letter`,
            rotateY: [-90, 0],
            duration: 2500,
            delay: (el, i) => 45 * i
        });
    }
    
    useEffect(() => {
        animationTitle("ml10-first");
        animationTitle("ml10-second");
    }, []);

    return (
        <div className={Style.titleBox}>
            { report && (
                <>
                <h2 className={title == "Cocina1" ? 
                `${Style.Cocina} ml10 ml10-first` : 
                `${Style.Enfriador} ml10 ml10-first` 
                }> 
                    <span className="text-wrapper">
                        <span className="letters">{ titlePanel.toUpperCase() }</span>
                    </span>
                </h2>
                <h3 className={`${Style.title} ${Style.RecetaPanel} ml10 ml10-second`}>
                    <span className="text-wrapper">
                        <span className="letters">{ properties + ": " +  description }</span>
                    </span>
                </h3>
                </>
            )}

            { chart && (
                <>
                <h2 className={Style.title + " "+ Style.Receta + " ml10 ml10-first" }> 
                    <span className="text-wrapper">
                        <span className="letters">{title}</span>
                    </span>
                 </h2>
                <h3 className={Style.title + " " + Style.CocinaTitle + " ml10 ml10-second"}>
                    <span className="text-wrapper">
                        <span className={`letters ${StyleMachine}`}>{ properties + ": " + data.toUpperCase() }</span>
                    </span>
                </h3>
                </>
            )}

        </div>
    )
}
