import axios from "axios";

const templateEquipos = {
    "Equipos": [
        {
            "ID": 1,
            "NOMBRE_EQUIPO":  "Cocina1",
            "ESTADO": "OPERATIVO",
            "RECETA": "5 JAMON 5LBS",
            "TIEMPO_TRANSCURRIDO": "00:00hs",
            "NRO_TORRES": "2"
        },
        {
            "ID": 2,
            "NOMBRE_EQUIPO":  "Enfriador1",
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
        const equipos = await getMachineHome();
        console.log(equipos.data.Equipos)
        return equipos.data.Equipos.map(({ NOMBRE_RECETA, NRO_RECETA, ...restoPropiedades }) => {
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

export const getReportMachine = async (machine) => {
    console.log("PARAMS ID EQUIPO EN CLIENT JS: ", machine);
    try {
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/Reporte/${machine}`,
        )
    } catch (error) {
        console.log(error);
        throw error;
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


export const getHistory = async ( component, machine ) => {
    try {
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/Historico/${machine}/${component}`,
        )
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export const getProductividad = async (fechaStart, fechaEnd) => {
    try {
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/productividad/${fechaStart}/${fechaEnd}`
        )
    } catch (error) {
        console.error(error);
    }
}

export const getApiJavaHistorico = async () => {
    try {
        return await axios.get(
            `http://localhost:5011/opcua/get-stored-sensor-value`
        )
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getApiJavaHistoricoPrueba = async (series, suma) => {
    try {
        const response =  await axios.get(
            `http://localhost:5011/opcua/get-stored-sensor-value`
        )
        console.log(response);
        const formattedData = response.data.map((item) => ({
            time: new Date(item.time).getTime(),
            value: parseFloat(item.value) + suma,
          }));
          console.log(formattedData);
        series.current.setData(formattedData);
        //Experimental
    } catch (error) {
        console.log(error);
        throw error;
    }
}
