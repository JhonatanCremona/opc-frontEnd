//Dependencias
import { Link } from "react-router-dom"
import {  useContext } from "react";
//Components
import { NavLink } from "./NavLink";
import { Notification, User } from "../Icon/Icon";
import creminoxLogo from "../Icon/creminox-logo.png";
//Styles
import Style from "./NavBar.module.css";
import { PanelContext } from "../context/PanelContext";


export const NavBar = () => {
    const { urlPanel } = useContext(PanelContext);
    const opciones = [
        {
            id: 1,
            nombre: "HOME",
            url: "/"
        },
        {
            id: 2,
            nombre: "PANEL",
            url:urlPanel
        },
        {
            id: 3,
            nombre: "GRAFICOS",
            url: "/graficos"
        },{
            id: 4,
            nombre: "CONTACTO",
            url: "/contacto"
        }
    ]
    return (
        <header className={Style.headernav}>
            <nav className={Style.navbar}>
                {/* ---------------Iconos----------------*/}
                <ul className={Style.listaIconos}>
                    <li>
                            <Link to={"/usuario"}>
                                <User/>
                            </Link>
                    </li>

                    <li>
                            <Link to={"/notification"}>
                                <Notification/>
                            </Link>
                    </li>
                </ul>
                <ul className={Style.lista}>
                    {
                        opciones.map(({id, url, nombre}) => {
                            return (
                                <li key={id} className={Style.itemNav}>
                                    <NavLink to={url}>{nombre}</NavLink>
                                </li>
                            )
                        })
                    }  
                    <div className={Style.logoNav}>
                    <Link className={Style.logo} to="/" > 
                        <img className={Style.logoImagen} src={creminoxLogo} alt="" />
                    </Link>
                </div>
                </ul>
                {/* ---------------Logo----------------*/}
                
            </nav>
            
        </header>
    )
}