import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import App from './App.jsx'

import './index.css'

import Login from "./pages/Login.jsx"
import Home from "./pages/Home.jsx"
import Cadastro from "./pages/Cadastro.jsx"
import Regear from "./pages/Regear.jsx"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path='/' element={<Login />}/>
          <Route path='/insanity' element={<Home />}/>
          <Route path='/cadastro' element={<Cadastro />}/>
          <Route path='/regear' element={<Regear />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
