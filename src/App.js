
import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle';
import Vente from './pages/vente';
import ListEmps from './pages/listEmps';
import ListMissingOrHier from './pages/listMissingOrHier';
import Login from './pages/login';
import ControlCode from './pages/controleEmp';
function App() {
  return (
    
    <BrowserRouter>
    <nav className='card-shadow'>
      <div>
        <ul>

          <li>
            <Link to={"/"} >Accueil </Link>
          </li>
          
          <li>
            <Link to={"/misOrhier"} > Présence </Link>
          </li>
          

        </ul>
      </div>
      <div>
        <ul className='ml-5'>
        <div class="dropdown">
  <button class="dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
  <i className='bi bi-person-bounding-box text-primary'></i>
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li>Youssoupha Mbaye CISSE</li>
    
  </ul>
</div>
          
        </ul>
        
      </div>

      
      
    </nav>
      <Routes>
        <Route  path="/" element={<ListEmps />}></Route>
        <Route path="/vente" element={<Vente />}></Route>
        <Route path="/misOrhier" element={<ListMissingOrHier />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/empControle/:id" element={<ControlCode />}></Route>
        
        
      </Routes>
    </BrowserRouter>
  );
  
}

export default App;
