import axios from "axios";

const templateEquipos = {
    "Equipos": [
        {
            "ID": 1,
            "NOMBRE_EQUIPO":  "Cocina",
            "ESTADO": "OPERATIVO",
            "RECETA": "5 JAMON 5LBS",
            "TIEMPO_TRANSCURRIDO": "00:00hs",
            "NRO_TORRES": "2"
        },
        {
            "ID": 2,
            "NOMBRE_EQUIPO":  "Enfriador",
            "ESTADO": "INACTIVO",
            "RECETA": "5 JAMON 5LBS",
            "TIEMPO_TRANSCURRIDO": "00:00hs",
            "NRO_TORRES": "0"
        }
    ]
}
export const valueStateMachine = (value) =>  {
        switch (value) {
            case 1:
                return "PRE OPERATIVO"
            case 2:
                return "OPERATIVO"
            case 3:
                return "PAUSA"
            case 4:
                return "INACTIVO"
            case 5:
                return "CANCELADO"
            case 6:
                return "FINALIZADO"
            default:
                return "Error"
        }
    }
export const transformDataMachine = async () => {
    try {
        const equipos = await getMachineHome().Equipos;
        return equipos.map(({ NOMBRE_RECETA, NRO_RECETA, ...restoPropiedades }) => {
            return {
               ...restoPropiedades,
               ESTADO: valueStateMachine(restoPropiedades.ESTADO),
               TIEMPO_TRANSCURRIDO: `${restoPropiedades.TIEMPO_TRANSCURRIDO} hs`,
               RECETA: `${NRO_RECETA} ${NOMBRE_RECETA}`
            }
       })
    } catch (error) {
        return templateEquipos.Equipos;
    }
}

export const getMachineHome =  async () => {
    try {
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/Home`,
        )
    } catch (error) {
        console.log(" Mensaje: ", error);
        return error.message;
    }
}



export const getReportCocina = async () => {
    try {
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/Reporte/Cocina1`,
        )
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const getReportEnfriador = async () => {
    try {
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/Reporte/Enfriador1`,
        )
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const getHistory = async (componente) => {
    try {
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/Historico/Cocina1/${componente}`,
        )
    } catch (error) {
        console.log(error);
        throw error;
    }
}
