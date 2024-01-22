import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css'

import { Layout } from './Layout';
import { Panel } from './panel/Panel';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={ <Layout/> }>
          <Route path="/" element={ <Panel/> }/>
        </Route>
      </Routes>
    </>
  )
}

export default App
