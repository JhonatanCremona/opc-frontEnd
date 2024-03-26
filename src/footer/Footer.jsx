import Style from "./Footer.module.css"
import { EMAIL, TELEFONO } from "../Icon/Icon"
import linkedin from "../Icon/linkedin.png"
import youtube from "../Icon/youtube.png"
import creminoxLogo from "../Icon/creminox-logo.png";

export const Footer=() => {
    return (
        <footer className={Style.footer}>
            <section className={Style.footerPart1}>
                <figure className={Style.logoImagen}>
                    <img src={creminoxLogo} alt="" />
                </figure>
                <article className={Style.lista}>
                    <h2 className={Style.title + " " + Style.n1}>Contacto</h2>
                    <p className={Style.text}>
                        <span className={Style.iconLista}><TELEFONO/>Teléfono:1126089412</span>
                        <span className={Style.iconLista}><EMAIL/>Email:</span> 
                    </p>
                </article>
                <article className={Style.lista}>
                    <h2 className={Style.title}>Social Media</h2>
                    <article className={Style.iconsRedes}>
                        <figure className={Style.boxImagen}>
                            <img 
                            className={Style.imagen}
                            src={linkedin} alt="" />
                        </figure>
                        <figure className={Style.boxImagen}>
                                <img className={Style.imagen} src={youtube} alt="" />
                        </figure>
                        
                    </article>
                </article>  
            </section>
            <hr className={Style.Line}/>    
            <section className={Style.footerPart2}>
                <p className={Style.footerText}>© 2024 All Rights Reserved cremona inoxidable</p>    
            </section> 
        </footer>
    )
}