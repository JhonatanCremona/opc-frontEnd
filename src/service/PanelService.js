export function tranformDataEquipo(data) {
    return data.map(item => {
        return {
            Equipos: [
                {
                    numero_equipo: 1,
                    NOMBRE_EQUIPO:  data.NOMBRE_EQUIPO || "no hay dato",
                    ESTADO: data.ESTADO || "NO-OPERATIVO",
                    NOMBRE_RECETA: "",
                    NRO_RECETA: "",
                    TIEMPO_TRANSCURRIDO: "00:00hs",
                    NRO_TORRES: ""
                }
            ]
        }
    })
}