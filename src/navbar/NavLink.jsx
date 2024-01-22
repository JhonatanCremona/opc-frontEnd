//Dependencias
import { NavLink as NavLinkReactRouter } from "react-router-dom";

//Styles
import Style from "./NavLink.module.css";

export const NavLink = ({ to, children, ...props }) => {
    return (
        <NavLinkReactRouter 
            {...props}
            className={({isActive}) => isActive ? `${Style.options} ${Style.isactive}` : Style.options } 
            to={to}
        >
            {children}
        </NavLinkReactRouter>
    )
}