import './index.css'
import "leaflet/dist/leaflet.css"
import React from 'react'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import ReactDOM from 'react-dom/client'
import { SensorDetails } from './pages/SensorDetails'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StoreProvider } from 'easy-peasy';
import { store } from './store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StoreProvider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/SensorDetails/:id" element={<SensorDetails />} />
          </Routes>
        </BrowserRouter>
    </StoreProvider>
  </React.StrictMode>,
)
