
import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle';
import Vente from './pages/vente';
import ListEmps from './pages/listEmps';
import ListMissingOrHier from './pages/listMissingOrHier';
import Login from './pages/login';
import ControlCode from './pages/controleEmp';
import IdleTimeOutHandler from './component/idleTimeContainer';
function App() {
  
  return (
    <>
    <BrowserRouter>
    
      <Routes>
        <Route  path="/" element={<ListMissingOrHier/>}></Route>
        <Route path="/vente" element={<Vente />}></Route>
        <Route path="/parametre" element={<ListEmps />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/empControle/:id" element={<ControlCode />}></Route>
        
        
      </Routes>
    </BrowserRouter>
    
    </>
  );
  
}

export default App;
