import { createContext,useState } from "react";

export const PanelContext = createContext();

export const PanelContextProvider = ({ children }) => {
    const [urlPanel, setUrlPanel] = useState("/panel-control/Cocina1");
    const [urlPanelChart, setUrlPanelChart] = useState("/panel-graficos/Cocina1");

    const StyleTooltip = {
        sensor_temperature: {
            st_initial: `width: 110px; height: 90px; position: absolute; display: none; padding: 8px; box-sizing: border-box; font-size: 12px; text-align: left; z-index: 1000; top: 12px; left: 12px; pointer-events: none; border: 1px solid; border-radius: 2px;font-family: -apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;`,
            st_background: `rgba(${'255, 255, 255'}, 0.25)`,
            st_color: 'black',
            st_border:"rgba( 239, 83, 80, 1)"
        },
        sensor_water_level: {
            sw_initial:`width: 96px; height: 300px; position: absolute; display: none; padding: 8px; box-sizing: border-box; font-size: 12px; text-align: left; z-index: 1000; top: 12px; left: 12px; pointer-events: none; border-radius: 4px 4px 0px 0px; border-bottom: none; box-shadow: 0 2px 5px 0 rgba(117, 134, 150, 0.45);font-family: -apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;`,
            sw_background: `rgba(${'255, 255, 255'}, 0.25)`,
            sw_color: 'white',
            sw_border:"rgba( 239, 83, 80, 1)",
            sw_width: "96px"
        }

    }



    return (
        <PanelContext.Provider value={ 
            {   

                urlPanel, setUrlPanel,
                urlPanelChart,setUrlPanelChart,
                StyleTooltip
            }
        }>
            {children}
        </PanelContext.Provider>
    )
}