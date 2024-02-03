import { Routes, Route } from 'react-router-dom';
import './App.css'

//Components
import { Layout } from './Layout';
import { PanelContextProvider } from './context/PanelContext';
import { PanelControl } from "./panel-control/PanelControl";
import { Footer } from './footer/Footer';
import { Test } from "./test/Test";
import { Home } from './panel/Home';
import { Charts } from './charts/Charts';

function App() {

  return (
    <PanelContextProvider>
      <Routes>
        <Route path="/" element={ <Layout/> }>
          <Route path="/" element={ <Home/> }/>
          <Route path="/panel-control/:equipo" element={<PanelControl/>}/>
          <Route path='/panel-control/test' element={<Test/>}/>
          <Route path='/graficos' element={<Charts/>}/>
        </Route>
      </Routes>
      <Footer/>
    </PanelContextProvider>
  )
}

export default App
