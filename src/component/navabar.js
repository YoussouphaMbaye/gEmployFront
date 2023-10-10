import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import IdleTimeOutHandler from './idleTimeContainer';
function Navabar() {
    const navigate = useNavigate();
    const [isActive,setIsActive]=useState(true);
    const logOut=()=>{
        sessionStorage.setItem('name','');
        sessionStorage.setItem('access_token','');
        sessionStorage.setItem('idUser','');
        navigate("/login");
    }
  return (
    <>
<nav className='card-shadow'>
      <div>
        <ul>

          <li>
            <Link to={"/"} >Accueil </Link>
          </li>
          
          <li>
            <Link to={"/parametre"} > Gestion </Link>
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
    <li>{sessionStorage.getItem('name')}</li>
    <li className='btn btn-danger' onClick={()=>logOut()}>log out</li>
    
  </ul>
</div>
          
        </ul>
        
      </div>

      
      
    </nav>

<IdleTimeOutHandler onIdle={()=>{logOut()}} onActive={()=>setIsActive(true)} ></IdleTimeOutHandler>
    </>
      )
}

export default Navabar