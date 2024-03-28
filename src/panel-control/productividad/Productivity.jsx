//Depending
import { useState } from "react";
import Style from "./Productividad.module.css";
import JsonProductividad from "../../JSON/productivad.json";
import JsonListReceta from "../../JSON/productividad_list_receta.json";
import iconCicloProduct from "../../Icon/ciclo-de-vida-del-producto.png";
import { getProductividad } from "../../service/client";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//Component
import { Toaster, toast } from 'sonner';

export const Productivity = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [dataJson, setDataJson] = useState(JsonProductividad);
    const { nombres_recetas } = JsonListReceta;
    const [produccionTotal, setProduccionTotal] = useState(0);
    const [usoTotalEquipo, setUsoTotalEquipo] = useState(0.0);
    const [isLoading, setIsLoading] = useState(false);

    const startYear = 2021;
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - startYear + 1 }, (_, index) => startYear + index);
    const months = [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",];

    let totalProductos = 0;
    let promedio = 0;
    
    const acumular = (acomulador, numero) =>  acomulador + numero;
    function progressBar() {
        let speed = 30;
        let items = document.querySelectorAll(`.${Style.progress_bar} .${Style.progress_bar_item}`);
        items.forEach((item)=> {
            var progressBar = item.querySelector(`.${Style.progress}`);
            console.log(progressBar);
            var itemValue = progressBar.dataset.progress;
            console.log(itemValue);
            var i = 0;
            var value = item;
            console.log(value);
    
            var count = setInterval(function () {
                if (i <= itemValue) {
                    var iStr = i.toString();
                    console.log(iStr);
                    progressBar.style.width = iStr + '%';
                    value.querySelector(`.${Style.item_value}`).innerHTML = iStr + '%';
                    console.log(value.querySelector(`.${Style.item_value}`).innerHTML = iStr + '%');
                } else {
                    clearInterval(count);
                }
                i++;
            }, speed);
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        if ( startDate != null && endDate != null ) {
            try {
                const response = await getProductividad(startDate.toISOString().slice(0,10), endDate.toISOString().slice(0,10));
                console.log(response);
                if ( response.data.error != undefined ) {
                    console.log("NO EXISTEN DATOS PARA ESTE RANGO DE FECHAS");
                    toast.error('No se encontraron datos', {
                        style: {
                            background: "#131313",
                            fontFamily:"Roboto",
                            fontWeight: "lighter",
                            color: "#B9B9B9",
                            border: "1px solid #E82A31"
                        }
                    })
                }
                if ( response.data.ciclos_correctos != undefined ) {
                    console.log("SOLICITUD EXITOSA DE DATOS BDD PRODUCTIVIDAD");
                    //totalProductos = response.data.recetas.length > 0 ? response.data.recetas.reduce(acumular) : 0;
                    //console.log(totalProductos);
                    console.log(response.data.uso_equipo_op, " ", response.data.uso_equipo_pre);
                    let suma = response.data.uso_equipo_op + response.data.uso_equipo_pre ;
                    
                    setUsoTotalEquipo(suma);
                    console.log(usoTotalEquipo);

                    setProduccionTotal(response.data.pesototal == undefined ? "0" : response.data.pesototal / 1000);
                    setDataJson(response.data);

                    toast.promise(
                        getProductividad(startDate.toISOString().slice(0,10), endDate.toISOString().slice(0,10)), {
                        loading: "Cargando...",
                        success: (data) => {
                            console.log(data);
                            progressBar();
                            return `Carga exitosa`;
                        },
                        error:"Error",
                        style: {
                            fontFamily:"Roboto",
                            fontWeight: "lighter",
                            background: '#131313',
                            color: 'white', 
                            border: "1px solid #54C42D"
                        },
                        className:`` ,
                    });
                    
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false); 
            }
        } 
        if (startDate == null && endDate == null) {
            console.log("Debes de completar el formulario");
            toast.info('Debes de completar el formulario', {
                style: {
                    background: "#131313",
                    fontFamily:"Roboto",
                    fontWeight: "lighter",
                    color: "#B9B9B9",
                    border: "1px solid #e9e600"
                }
            })
        } 
    }

    return (
        <>
            <section className={Style.box_component}>
                
            <section className={Style.prod_container + " " + Style.progress_bar}>

                <h2 className={Style.title}>Productividad</h2>

                <article className={Style.progress_bar_item}>
                    <h3 className={Style.sub_title}>% CICLOS REALIZADOS CORRECTAMENTE</h3>
                    <div className={Style.item_bar}>
                        <div className={Style.progress } data-progress={ dataJson.ciclos_correctos / dataJson.ciclos_totales * 100 }>
                            <tool-tip role="tooltip">{`Ciclo Correctos: ${dataJson.ciclos_correctos } / Ciclos Totales: ${dataJson.ciclos_totales})`}</tool-tip>
                        </div>
                    </div>
                    <div className={Style.value_container}>
                        <span className={Style.item_value}>{`0%`}</span> 
                        <span className={Style.item_label}></span>
                    </div>
                </article>

                <article className={Style.progress_bar_item}>
                    <h3 className={Style.sub_title}>% USO DEL EQUIPO</h3>
                    <article className={Style.box_list_usoequipo}> 
                        <article className={ ` ${Style.item_bar} ${Style.bar_equipo_uso} `}>
                            <div className={`${Style.bar_op} `} style={{
                                width: `${dataJson.uso_equipo_op * 100 }%`,
                            }}>
                                <tool-tip role="tooltip"> Mensaje de prueba </tool-tip>
                            </div>
                            <div className={`${Style.bar_pre} `} style={{
                                width: `${dataJson.uso_equipo_pre * 100 }%`,
                            }}></div>
                        </article>
                        
                        <span className={Style.item_value}>{"0 %"}</span>
                    </article>
                </article>

                <hr />

                <article className={ Style.list_receta_container}>
                    <h3 className={Style.sub_title}>% PRODUCTOS REALIZADOS</h3>
                    <article className={Style.box_list_receta}>
                        <div className={Style.list_recetas}>
                            {dataJson.recetas.map((receta, index)=> {
                                if (receta > 0 ) 
                                {
                                    promedio = Math.floor(receta / dataJson.ciclos_correctos * 100) ;
                                    return (
                                        <div className={Style.recetas} key={index} style={{
                                            width: `${promedio}%`,
                                            backgroundColor: nombres_recetas[index].color,
                                            borderRadius: "6px",
                                        }}>
                                    </div>
                                    )
                                }
                            })}
                        </div>
                        <span className={Style.item_label}>{`100% / ${totalProductos}`}</span>
                    </article>
                </article>

                <div className={Style.box_list_name_receta}>
                   {dataJson.recetas.map((receta, index)=> {
                    if (receta>0) return (
                            <div key={index} className={Style.list_name_receta}>
                                <div style={{
                                    width: "6px",
                                    height: "14px",
                                    backgroundColor: nombres_recetas[index].color,
                                    borderRadius: "3px",
                                    }}>
                                </div>
                                <span className={Style.name_receta} >{` ${nombres_recetas[index].nombre} - ${receta}`}</span>
                            </div>
                    )
                })} 
                </div>
                
                <hr />

                <section className={Style.box_results_production}>
                    <div className={Style.box_title_production}>
                        <div className={Style.box_title}>
                            <h3 className={Style.title_production}>{`${dataJson.ciclos_totales}`} </h3>
                            <figure className={Style.icon_ciclo}>
                                <img  src={ iconCicloProduct } alt="" />
                            </figure>
                        </div>
                        <p className={ Style.sub_title_production }>Ciclos realizados</p>
                    </div>
                    <div>
                        <h3 className={Style.title_production }>{ `${produccionTotal} Tn` }</h3>
                        <p className={ Style.sub_title_production }>Produccion Total</p>
                    </div>
                </section>

            </section>
            
            <section className={Style.prod_resumen_equipo}>
                <h2 className={Style.title}>Resumen equipo</h2>

                <form className={Style.form_date} onSubmit={handleSubmit} disabled={isLoading}>
                  <div className={Style.box_date}>
                  <h2 className={Style.sub_title}>Fecha Inicio</h2>
                  <DatePicker
                    showIcon
                                    renderCustomHeader={({
                                        date,
                                        changeYear,
                                        changeMonth,
                                        decreaseMonth,
                                        increaseMonth,
                                        prevMonthButtonDisabled,
                                        nextMonthButtonDisabled,
                                        }) => (
                                        <div
                                            style={{
                                            margin: 10,
                                            display: "flex",
                                            justifyContent: "center",
                                            }}
                                        >
                                            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                                            {"<"}
                                            </button>
                                            <select
                                            value={date.getFullYear()}
                                            onChange={({ target: { value } }) => changeYear(value)}
                                            >
                                            {years.map((option) => (
                                                <option key={option} value={option}>
                                                {option}
                                                </option>
                                            ))}
                                            </select>
                                
                                            <select
                                            value={months[date.getMonth()]}
                                            onChange={({ target: { value } }) =>
                                                changeMonth(months.indexOf(value))
                                            }
                                            >
                                            {months.map((option) => (
                                                <option key={option} value={option}>
                                                {option}
                                                </option>
                                            ))}
                                            </select>
                                
                                            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                                            {">"}
                                            </button>
                                        </div>
                                        )}
                                    closeOnScroll={true}
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    className={`${Style.date_picker}`}
                                    isClearable
                                    placeholderText="Seleccione una Fecha Inicio"
                                    icon={
                                        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 icn">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                                        </svg>
                                    }
                                />
                  <h2 className={Style.sub_title}>Fecha Fin</h2>
                  <DatePicker
                                        showIcon
                                        closeOnScroll={true}
                                        renderCustomHeader={({
                                            date,
                                            changeYear,
                                            changeMonth,
                                            decreaseMonth,
                                            increaseMonth,
                                            prevMonthButtonDisabled,
                                            nextMonthButtonDisabled,
                                            }) => (
                                            <div
                                                style={{
                                                margin: 10,
                                                display: "flex",
                                                justifyContent: "center",
                                                }}
                                            >
                                                <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                                                {"<"}
                                                </button>
                                                <select
                                                value={date.getFullYear()}
                                                onChange={({ target: { value } }) => changeYear(value)}
                                                >
                                                {years.map((option) => (
                                                    <option key={option} value={option}>
                                                    {option}
                                                    </option>
                                                ))}
                                                </select>
                                    
                                                <select
                                                value={months[date.getMonth()]}
                                                onChange={({ target: { value } }) =>
                                                    changeMonth(months.indexOf(value))
                                                }
                                                >
                                                {months.map((option) => (
                                                    <option key={option} value={option}>
                                                    {option}
                                                    </option>
                                                ))}
                                                </select>
                                    
                                                <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                                                {">"}
                                                </button>
                                            </div>
                                            )}
                                        selected={endDate}
                                        onChange={(date) => setEndDate(date)}
                                        className={`${Style.date_picker}`}
                                        isClearable
                                        placeholderText="Seleccione una Fecha Fin"
                                        icon={
                                            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 icn">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                                            </svg>
                                        }
                                    />  
                  </div>
                  <Toaster position="top-center" expand={true} />
                  <button  className={ Style.button_component} >Buscar</button>
                </form>
            </section>

        </section>
        </>
    )
}