import './App.css';

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

//importamos componentes
import NavBarExample from './Layouts/navbar';
import MapView  from './Components/MapView';
import Login from './Components/Login';
import Register from './Components/Register';
import RegBicicleta from './Components/RegBicicleta';
import FAQ from './Components/FAQ';
import InfoLegal from './Components/InfoLegal';
import InfoBicisafe from './Components/Nosotros';
import Ruta from './Components/Ruta';
import Reportes from './Components/Reportes';
import QuienesSomos from './Components/QuienesSomos';

function App() {

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<NavBarExample/>}>
            <Route index element={<MapView/>} />
            <Route path='login' element={<Login/>} />
            <Route path='register' element={<Register/>} />
            <Route path='regBicicleta' element={<RegBicicleta/>} />
            <Route path='ruta' element={<Ruta />} />
            <Route path='preguntasFrecuentes' element={<FAQ />} />
            <Route path='informacionLegal' element={<InfoLegal />} />
            <Route path='nosotros' element={<InfoBicisafe />} />
            <Route path='reportes' element={<Reportes />} />
            <Route path='quienesSomos' element={<QuienesSomos />} />

            <Route path='*' element={<Navigate replace to="/" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
