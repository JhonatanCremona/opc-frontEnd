import Style from "./Footer.module.css"
import { EMAIL, TELEFONO } from "../Icon/Icon"
import linkedin from "../Icon/linkedin.png"
import youtube from "../Icon/youtube.png"
import creminoxLogo from "../Icon/creminox-logo.png";
import { Link } from 'react-router-dom';

export const Footer=() => {
    return (
        <footer className={Style.footer}>
            <section className={Style.footerPart1}>
                <Link to="https://www.creminox.com/" target="_blank" rel="noopener noreferrer" style={{margin:"auto 0"}}>
                    <figure className={Style.logoImagen}>
                        <img src={creminoxLogo} alt="" />
                    </figure>
                </Link>
                
                <article className={Style.lista}>
                    <h2 className={Style.title + " " + Style.n1}>Contacto</h2>
                    <p className={Style.text}>
                        <span className={Style.iconLista}><TELEFONO/>Tel: +54 11 4918 3944</span>
                        <span className={Style.iconLista}><EMAIL/>Email:</span> 
                    </p>
                </article>
                <article className={Style.lista}>
                    <h2 className={Style.title}>Social Media</h2>
                    <article className={Style.iconsRedes}>
                        <Link to="https://www.linkedin.com/company/creminox/mycompany/" target="_blank" rel="noopener noreferrer">
                            <figure className={Style.boxImagen}>
                                <img 
                                className={Style.imagen}
                                src={linkedin} alt="" />
                            </figure>
                        </Link>
                        
                        <Link to="https://www.youtube.com/@creminox7402" target="_blank" rel="noopener noreferrer">
                            <figure className={Style.boxImagen}>
                                <img className={Style.imagen} src={youtube} alt="" />
                            </figure>
                        </Link>
                        
                    </article>
                </article>  
            </section>
            <hr className={Style.Line}/>    
            <section className={Style.footerPart2}>
                <p className={Style.footerText}>© 2024 All Rights Reserved CREMONA INOXIDABLE S.A.</p>    
            </section> 
        </footer>
    )
}