import { Routes, Route } from 'react-router-dom';
import './App.css'

//Components
import { Layout } from './Layout';
import { PanelContextProvider } from './context/PanelContext';
import { Footer } from './footer/Footer';
import { Home } from './panel/Home';
import { PanelGraficos } from './panel-graficos/PanelGraficos';
import { ControlPanel } from './panel-control/ControlPanel';

function App() {

  return (
    <PanelContextProvider>
      <Routes>
        <Route path="/" element={ <Layout/> }>
          <Route path="/" element={ <Home/> }/>
          <Route path="/panel-control/:equipo" element={<ControlPanel/>}/>
          <Route path='/panel-graficos/:equipo' element={<PanelGraficos/>}/>
        </Route>
      </Routes>
      <Footer/>
    </PanelContextProvider>
  )
}

export default App
