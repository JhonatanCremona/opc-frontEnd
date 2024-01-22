import { Outlet } from "react-router-dom"

import { NavBar } from "./navbar/NavBar"
export const Layout = () => {
    return (
        <div>
            <NavBar/>
            <Outlet/>
        </div>
    )
}