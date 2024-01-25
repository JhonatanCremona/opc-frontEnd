import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css'

import { Layout } from './Layout';
import { Panel } from './panel/Panel';
import { PanelControl } from './panel-control/PanelControl';
import { PanelContextProvider } from './context/PanelContext';


function App() {
  const [count, setCount] = useState(0)

  return (
    <PanelContextProvider>
      <Routes>
        <Route path="/" element={ <Layout/> }>
          <Route path="/" element={ <Panel/> }/>
          <Route path="/panel-control/:equipo" element={<PanelControl/>}/>
        </Route>
      </Routes>
    </PanelContextProvider>
  )
}

export default App
