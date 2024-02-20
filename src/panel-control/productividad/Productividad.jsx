import { useEffect, useState } from "react";
import Style from "./Productividad.module.css";
import JsonProductividad from "../../JSON/productivad.json"

export const Productividad = () => {
    const [search, setSerch] = useState(false);

    const dataJson = JsonProductividad;
    let promedio;

    const ciclos_correctos = (dataJson.ciclos_correctos/ dataJson.ciclos_totales) * 100;
    console.log(ciclos_correctos);
    
    function progress_bar() {
        var speed = 30;
        var items = document.querySelectorAll(`.${Style.progress_bar} .${Style.progress_bar_item}`);
        console.log(items);
    
        items.forEach(function (item) {
            var progressBar = item.querySelector(`.${Style.progress}`);
            var itemValue = progressBar.dataset.progress;
            console.log(itemValue);
            var i = 0;
            var value = item;
    
            var count = setInterval(function () {
                if (i <= itemValue) {
                    var iStr = i.toString();
                    progressBar.style.width = iStr + '%';
                    value.querySelector(`.${Style.item_value}`).innerHTML = iStr + '%';
                } else {
                    clearInterval(count);
                }
                i++;
            }, speed);
        });
    }

    useEffect(()=> {
        progress_bar();
    },[search])


    return (
        <section className={Style.box_component}>
            <section className={Style.prod_container + " " + Style.progress_bar}>
                <h2 className={Style.title}>Productividad</h2>
                <article className={Style.progress_bar_item}>
                    <h3 className={Style.sub_title}>% CICLOS REALIZADOS CORRECTAMENTE</h3>
                    <div className={Style.item_bar}>
                        <div className={Style.progress } data-progress={ ciclos_correctos }></div>
                    </div>
                    <div className={Style.value_container}>
                        <span className={Style.item_value}>{`0 %`}</span> 
                        <span className={Style.item_label}>{` / ${dataJson.ciclos_totales}`}</span>
                    </div>
                </article>
                <article className={Style.progress_bar_item}>
                    <h3 className={Style.sub_title}>% USO DEL EQUIPO</h3>
                    <div className={Style.item_bar}>
                        <div className={Style.progress } data-progress="60"></div>
                    </div>
                    <span className={Style.item_value}>{"0 %"}</span>
                </article>
                <hr />
                <article className={ Style.list_receta_container}>
                    <h3 className={Style.sub_title}>% PRODUCTOS REALIZADOS</h3>

                    <article className={Style.box_list_receta}>
                        <div className={Style.list_recetas}>
                            {dataJson.recetas.map((receta, index)=> {
                                if (receta > 0 ) 
                                {
                                    promedio = Math.floor(receta/ dataJson.ciclos_correctos * 100) ;
                                    return (
                                    <>
                                        <div className={Style.recetas} key={index} style={{width: `${promedio}%`}}>
                                    {receta}
                                    </div>
                                    </>
                                    )
                                }
                            })}
                        </div>
                        <span className={Style.item_label}>100%</span>
                    </article>
                </article>
                
                {" COMPONENTE "}
                <hr />
                <div>
                    <h3>15 <span>{"icon"}</span></h3>
                    <p>Ciclos realizados</p>
                </div>
                <div>
                    <h3>16,5 <span>{"icon"}</span></h3>
                    <p>Produccion Total</p>
                </div>
            </section>
            
            <section className={Style.prod_resumen_equipo}>
                <h2>Resumen equipo</h2>
                <form className={Style.form_date}>
                    <input className={ Style.form_input_one } type="date" name="date_start"/>
                    <input className={ Style.form_input_two } type="date" name="date_end"/>
                    <button className={ Style.list_button_component}><li>Buscar</li></button>
                </form>
            </section>

        </section>
    )
}