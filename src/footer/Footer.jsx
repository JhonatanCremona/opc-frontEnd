import { useState } from "react"
import Style from "./Footer.module.css"
import { EMAIL, TELEFONO } from "../Icon/Icon"
import linkedin from "../Icon/linkedin.png"
import youtube from "../Icon/youtube.png"
import creminoxLogo from "../Icon/creminox-logo.png";

export const Footer=() => {
    return (
        <footer className={Style.footer}>
            <section>
                <figure>
                    <img src={creminoxLogo} alt="" />
                </figure>
                <article>
                    <h2 className={Style.title + " " + Style.n1}>CONTACTO</h2>
                    <p className={Style.text}>
                        <span><TELEFONO/>Teléfono:</span> 0000000000
                        <span><EMAIL/>Email:</span> 
                    </p>
                </article>
                <article >
                    <h2>Social Media</h2>
                    <img src={linkedin} alt="" />
                    <img src={youtube} alt="" />
                </article>  
            </section>    
            <section>
                <p>© 2024 All Rights Reserved cremona inoxidable</p>    
            </section> 
        </footer>
    )
}