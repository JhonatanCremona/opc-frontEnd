//Dependencias
import { Link } from "react-router-dom"
//Components
import { NavLink } from "./NavLink";
import { Notification, User } from "../Icon/Icon";
import creminoxLogo from "../Icon/creminox-logo.png";
//Styles
import Style from "./NavBar.module.css";

export const NavBar = () => {
    const opciones = [
        {
            id: 1,
            nombre: "HOME",
            url: "/"
        },
        {
            id: 2,
            nombre: "PANEL",
            url: "/panel-control"
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
        <>
            <nav className={Style.navbar}>
                {/* ---------------Logo----------------*/}
                
                <ul className={Style.lista}>
                    <li>
                        <Link to={"/usuario"}>
                            <User/>
                        </Link>
                        <Link to={"/notification"}>
                            <Notification/>
                        </Link>
                    </li>
                    {
                        opciones.map(({id, href, text}) => {
                            return (
                                <li key={id}>
                                    <NavLink to={href}>{text}</NavLink>
                                </li>
                            )
                        })
                    }
                    
                </ul>
                <div id="title">
                    <Link className={Style.logo} to="/" > 
                        <img src={creminoxLogo} alt="" />
                    </Link>
                </div>
            </nav>
        </>
    )
}