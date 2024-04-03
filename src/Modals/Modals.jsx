import Style from "./Modals.module.css";
import { CloseButton } from "../Icon/Icon";
export const Modals = ({estado, switchEstado, openSearch, children}) => {

    return (
        <>
            {estado && 
                <section className={`${Style.container}`}>
                    <div className={`${Style.container_modal}`}>
                        <article className={`${Style.container_title}`}>
                            <h3 className={`${Style.title}`}>Lista Ciclos</h3>
                        </article>
                        <button 
                        onClick={()=> switchEstado(false)}
                        className={`${Style.container_button}`}><CloseButton/></button>
                        {children}
                    </div>
                </section>
            }
        </>
    )
}