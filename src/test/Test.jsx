import { useState, useEffect } from "react"
import { Equipos } from "../JSON/equipos.json"
import axios from "axios";

import Style from "./Component.module.css"
import temperatura from "../Icon/temperatura.png"


export const Test = () => {

      return (
        <section className={Style.dataTime}>
          <div className={Style.titleDataTime}>
            <h3 className={Style.datos}>TEM. INGRESO</h3>
            <div className={Style.boxImagen}>
              <img className={Style.Imagen} src={temperatura} alt="" />  
            </div>
          </div>

          <p className={Style.dataComponent}>22,45<span className={Style.tipoData}>°C</span></p>
          <section>

          </section>
        </section>
      )
}



       