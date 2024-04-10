import { createContext,useState, useContext,  } from "react";
import Logo from "../IMG/logo/MARCA-AGUA-CREMINOX.png"

export const PanelContext = createContext();
export const useAuth = () => {
    const auth = useContext(PanelContext)
    return auth
}

export const PanelContextProvider = ({ children }) => {
    const [urlPanel, setUrlPanel] = useState("/panel-control/Cocina1");
    const [urlPanelChart, setUrlPanelChart] = useState("/panel-graficos/Cocina1");
    const [ciclo, setCiclo] = useState(0);
    const [ leyendaCiclo, setLeyectaCiclo] = useState({});
    console.log(Logo);
    //const [isAuthenticated, setIsAuthenticated] = useState(false);
    

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
    const ChartLayoutOptions =  {
            height:350,
            layout: {
                textColor: '#d1d4dc',
                background: '#000000',
            },
            rightPriceScale: {
            scaleMargins: {
              top: 0.3,
              bottom: 0.25,
            },
            
            },
            crosshair: {
              vertLine: {
                width: 4,
                color: 'rgba(224, 227, 235, 0.1)',
                style: 0,
              },
              horzLine: {
                visible: false,
                labelVisible: false,
              },
            },
            grid: {
              vertLines: {
                color: 'rgba(42, 46, 57, 0)',
              },
              horzLines: {
                color: 'rgba(42, 46, 57, 0)',
              },
            }
    }
    const StyleSeriesBase = {
        baseValue: { type: 'price', price: 40 }, 

            topLineColor: 'rgba( 221, 132, 30, 1)', 
            topFillColor1: 'rgba( 221, 132, 30, 0.28)', 
            topFillColor2: 'rgba( 221, 132, 30, 0.05)', 

            bottomLineColor: 'rgba( 221, 132, 30, 1)', 
            bottomFillColor1: 'rgba( 221, 132, 30, 0.05)', 
            bottomFillColor2: 'rgba( 221, 132, 30, 0.28)'
    }
    const watermarkStyle = {
      visible: true,
      fontSize: 54,
      fontFamily:"Roboto",
      horzAlign: 'center',
      vertAlign: 'center',
      color: 'rgba(232, 42, 49, 0.3)',
      text: 'Creminox',
    }

    return (
        <PanelContext.Provider value={ 
            {   
                StyleTooltip,
                urlPanel, setUrlPanel,
                urlPanelChart,setUrlPanelChart,
                ciclo, setCiclo,
                leyendaCiclo, setLeyectaCiclo,
                StyleSeriesBase,
                ChartLayoutOptions,
                watermarkStyle,
              
            }
        }>
            {children}
        </PanelContext.Provider>
    )
}