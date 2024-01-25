import { createContext,useState } from "react";

export const PanelContext = createContext();

export const PanelContextProvider = ({children}) => {
    
    const [urlPanel, setUrlPanel] = useState("/panel-control/COCINA-1");


    return (
        <PanelContext.Provider value={ 
            {urlPanel, setUrlPanel}
        }>
            {children}
        </PanelContext.Provider>
    )
}