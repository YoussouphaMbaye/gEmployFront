
import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import Vente from './pages/vente';
import ListEmps from './pages/listEmps';
import ListMissingOrHier from './pages/listMissingOrHier';
import Login from './pages/login';
function App() {
  return (
    
    <BrowserRouter>
    <nav>
      <ul>

        <li>
          <Link to={"/"}> &gt; Accueil </Link>
        </li>
        <li>
          <Link to={"/vente"}> &gt; Départements </Link>
        </li>
        <li>
          <Link to={"/misOrhier"}> &gt; Présence </Link>
        </li>

      </ul>
    </nav>
      <Routes>
        <Route  path="/" element={<ListEmps />}></Route>
        <Route path="/vente" element={<Vente />}></Route>
        <Route path="/misOrhier" element={<ListMissingOrHier />}></Route>
        <Route path="/login" element={<Login />}></Route>
        
        
      </Routes>
    </BrowserRouter>
  );
  
}

export default App;
