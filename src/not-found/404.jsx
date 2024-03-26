import { Navigate } from "react-router"
import Style from "./404.module.css"

export const NotFoundPage = () => {
    return (
        <>
            <section className={Style.flex_person}>
                <h1>LOGO</h1>
                <h2>404 not found</h2>
                <p>Esta pagina ya no existe. Pero todavía hay muchas otras páginas interesantes que puedes visitar.</p>
                <button> <Navigate to="/" />Vista nuestra pagina principal.</button>
            </section>
        </>
    )
}