import axios from 'axios';
import React, { useState } from 'react'
import { Navigate, redirect, useNavigate } from 'react-router-dom';

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setpassword] = useState("");
    const [error,setUError]=useState("");
    const navigate = useNavigate();
    const burl = "http://localhost:5172/api/Api/login";
    const logIn = (e) => {
        e.preventDefault();
        console.log("bbbbbbbbbbbbbbbbb");
        axios.post(burl,
            {
                userName: username,
                passWord: password,
                employ:null
            },{
            Authorization: localStorage.getItem('access_token')
                ? 'Bearer ' + localStorage.getItem('access_token')
                : null,
            'Content-Type': 'application/json',
            accept: 'application/json',
        }).then((res)=>{
            console.log(res);
            localStorage.setItem('access_token','Bearer '+res);
            console.log("BIEN BIEN BIEN")
            navigate('/');
            
        }).catch((err)=>{
            if(err['response']){
            setUError(err['response']['data']);
            console.log(err['response']['data']);}
        })
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
                    <span className="h1 fw-bold mb-0">NAFA</span>
                  </div>

                  <h5 className="fw-normal mb-3 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>

                  <div className="form-outline mb-4">
                    <input type="email" id="form2Example17" className="form-control form-control-lg" required onChange={(e) => setUsername(e.target.value)}  value={username}/>
                    <label className="form-label" for="form2Example17">Email address</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="password" id="form2Example27" className="form-control form-control-lg" required onChange={(e) => setpassword(e.target.value)}/>
                    <label className="form-label" for="form2Example27" >Password</label>
                  </div>

                  <div className="pt-1 mb-4">
                    <button className="btn btn-primary btn-lg btn-block" type="submit">Login</button>
                  </div>
                  <br/>
                {
                    (error!=="")?<p style={{color : 'red'}}>{error}</p>:""
                }
                  <a className="small text-muted" href="#!">Forgot password?</a>
                  <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Don't have an account? <a href="#!"
                      style={{color: '#393f81'}}>Register here</a></p>
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
