import Style from "./Productividad.module.css";

export const Productividad = () => {
    document.addEventListener('DOMContentLoaded', function() {
        progress_bar();
    });
    
    function progress_bar() {
        var speed = 30;
        var progressBars = document.querySelectorAll(Style.progress_bar);
    
        progressBars.forEach(function(progressBar) {
            var items = progressBar.querySelectorAll(Style.progress_bar_item);

    
            items.forEach(function(item) {
                var progress = item.querySelector(Style.progress);
                var itemValue = parseInt(progress.getAttribute('data-progress'), 10);
                var i = 0;
                var value = item;
    
                var count = setInterval(function() {
                    if (i <= itemValue) {
                        var iStr = i.toString();
                        progress.style.width = iStr + '%';
                        value.querySelector(Style.item_value).innerHTML = iStr + '%';
                    } else {
                        clearInterval(count);
                    }
                    i++;
                }, speed);
            });
        });
    }
    


    return (
        <section className={Style.box_component}>
            <section className={Style.prod_container + " " + Style.progress_bar}>
                <h2 className={Style.title}>Productividad</h2>
                <article className={Style.progress_bar_item}>
                    <h3>% CICLOS REALIZADOS CORRECTAMENTE</h3>
                    <div className={Style.item_bar}>
                        <div className={Style.progress } data-progress="80"></div>
                    </div>
                    <span className={Style.item_value}>{"87,30 %"}</span>
                </article>
                <article>
                    <h3>% USO DEL EQUIPO</h3>
                    <div>barra de porcentaje...</div>
                    <p><span>{"87,30 %"}</span></p>
                </article>
                <hr />
                <article>
                    <h3>% PRODUCTOS REALIZADOS</h3>
                    <div>barra de porcentaje...</div>
                    <p><span>{"87,30 %"}</span></p>
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