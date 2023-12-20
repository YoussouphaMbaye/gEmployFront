import axios from 'axios';
import React, { useState } from 'react'
import { Navigate, redirect, useNavigate } from 'react-router-dom';
import nafa12 from '../nafa12.png';

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setpassword] = useState("");
    const [error,setUError]=useState("");
    const navigate = useNavigate();
    const burl = process.env.REACT_APP_B_URL+"/api/Api/login";
    const baseUrl = process.env.REACT_APP_B_URL;
    const logIn = (e) => {
        e.preventDefault();
        //console.log("bbbbbbbbbbbbbbbbb");
        axios.post(burl,
            {
                userName: username,
                passWord: password,
                employ:null
            },{
            Authorization: localStorage.getItem('access_token')
                ? 'Bearer ' + sessionStorage.getItem('access_token')
                : null,
            'Content-Type': 'application/json',
            accept: 'application/json',
        }).then((res)=>{
            //console.log("VOISCI LA REPONSE")
            //console.log(res);
            sessionStorage.setItem('access_token','Bearer '+res.data);
           // console.log("BIEN BIEN BIEN")
            getEmployByEmail(username);
            
            
        }).catch((err)=>{
            if(err['response']){
            setUError(err['response']['data']);
            //console.log(err['response']['data']);
          }else{
            setUError("Une erreure c'est produite");
          }
        })
    }
    const getEmployByEmail=async(email)=>{
      const response = await axios.get(baseUrl+'/GetEmployerByemail?email='+email).catch((err) => {
        console.log(err);
        setUError("Invalide email");
        
      });  
    if(response) {
      
      //console.log(response.data)
      sessionStorage.setItem('name',response.data.nameEmp);
      sessionStorage.setItem('idUser',response.data.idEmp);
      navigate('/');
      //console.log(response.data.nameEmp);
    }
    }
     
    return (
        <div className='contain'>
            

            <section className="vh-100" style={{backgroundColor: '#2196F3'}}>
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col col-xl-10">
        <div className="card" style={{borderRradius: '1rem'}}>
          <div className="row g-0">
            <div className="col-md-6 col-lg-5 d-none d-md-block">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                alt="login form" className="img-fluid" style={{borderRadius: '1rem 0 0 1rem'}} />
            </div>
            <div className="col-md-6 col-lg-7 d-flex align-items-center">
              <div className="card-body p-4 p-lg-5 text-black">

                <form onSubmit={logIn} action='POST'>

                  <div className="d-flex align-items-center mb-3 pb-1">
                    <i className="fas fa-cubes fa-2x me-3" style={{color: '#ff6219'}}></i>
                    {/* <span className="h1 fw-bold mb-0">NAFA</span> */}
                    <img src={nafa12} />
                  </div>

                  <h5 className="fw-normal mb-3 pb-3" style={{letterSpacing: '1px'}}>Connectez-vous à votre compte</h5>

                  <div className="form-outline mb-4">
                    <input type="email" id="form2Example17" className="form-control form-control-lg" required onChange={(e) => setUsername(e.target.value)}  value={username}/>
                    <label className="form-label" for="form2Example17">Email addresse</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="password" id="form2Example27" className="form-control form-control-lg" required onChange={(e) => setpassword(e.target.value)}/>
                    <label className="form-label" for="form2Example27" >Mot de passe</label>
                  </div>

                  <div className="pt-1 mb-4">
                    <button className="btn btn-primary btn-lg btn-block" type="submit">Se connecter</button>
                  </div>
                  <br/>
                {
                    (error!=="")?<p style={{color : 'red'}}>{error}</p>:""
                }
                  <a className="small text-muted" href="#!">Mot de passe oublié?</a>
                  <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Vous n'avez pas de compte ? <a href="#!"
                      style={{color: '#393f81'}}>Inscrivez-vous ici</a></p>
                  <a href="#!" className="small text-muted">Terms of use.</a>
                  <a href="#!" className="small text-muted">Privacy policy</a>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
        </div>
    )
}
