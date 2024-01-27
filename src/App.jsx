import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css'

import { Layout } from './Layout';
import { Panel } from './panel/Panel';
import { PanelContextProvider } from './context/PanelContext';
import { PanelControl } from "./panel-control/PanelControl";
import { Footer } from './footer/Footer';
import { Test } from "./test/Test";

function App() {

  return (
    <PanelContextProvider>
      <Routes>
        <Route path="/" element={ <Layout/> }>
          <Route path="/" element={ <Panel/> }/>
          <Route path="/panel-control/:equipo" element={<PanelControl/>}/>
          <Route path='/panel-control/test' element={<Test/>}/>
        </Route>
      </Routes>
      <Footer/>
    </PanelContextProvider>
  )
}

export default App
