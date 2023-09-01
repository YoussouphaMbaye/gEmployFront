import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Pagination from '../component/Pagination';
import ListHoraire from '../component/listHoraire';
import person from '../img/person.jpg';
export default function ListEmps() {
  let baseUrl='http://localhost:5172/api/Api'
  const bUrl='http://localhost:5172'
  const [show, setShow] = useState(false);
  const [showDf, setShowDf] = useState(false);
  const [showD, setShowD] = useState(false);
  const [view, setView] = useState(false);
  const [nameEmp,setnameEmp]=useState("");
  
  const [email,setEmail]=useState("");
  const [phoneEmp,setPhoneEmp]=useState("");
  const [birthDay,setBirthDay]=useState("");
  const [beginDay,setBeginDay]=useState("");
  const [endDay,setEndDay]=useState("");
  const [status,setStatus]=useState(true);
  const [occupation,setOccupation]=useState(true);
  const [idHoraire,setIdHoraire]=useState("")
  const [employe,setEmploye]=useState(null);
  const [idEmp,setIdEmp]=useState(0);
  const [codeEmp,setCodeEmp]=useState("");
  const [departement,setDepartement]=useState("");

  const [emps, setEmps] = useState([]);
  const [dayOffs, setDayOffs] = useState([]);
  const [dayOff, setDayOff] = useState("");
  const [horaire, setHoraires] = useState([]);
  const [listDayOfEmp, setListDayOfEmp] = useState([]);
  const [listDayOffDayEmp, setListDayOfFDayEmp] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);
  
  const handleDf=()=>{
    getDayOffs();
    setShowDf(true);
  }
  const handleCloseDf=()=>{
    setShowDf(false)

    setDayOffs("");
  }
  const handleCloseD = () => {
    setShowD(false);
    setEndDay("");
    setEndDay("");
  }
  const handleShowD=()=>{
    setShowD(true);
    
  }
  const handleDayOff=(id)=>{
      setIdEmp(id);
      
      setShowD(true)
  }
  const deactiveOrActiveDayOfDay=(id,idEmp)=>{
    axios.put(bUrl+'/DeactiveDayOfDay?id='+id).then((res)=>{
      console.log(res);
      getDayOffDayEmmp(idEmp);

    }).catch((err)=>{
      console.log(err);
    })
  }
  const postDayOf=(id)=>{
    console.log("mmmmmmmmmmmm"+ dayOff);
    console.log("mmmmmmmmmmmm"+ id);
    axios.post(bUrl+"/PostDayOffEmployer", {
      idEmp: id,
      idDayOff: dayOff
      },{header:header})
      .then(function (response) {
        //postRequest();
        console.log(response);
        getDayOffEmmp(id)
        handleCloseDf();
        //return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });

  }
  const postDayOffDay = () => {
    axios.post(bUrl+"/PostDayOffDay", {
      
      birthDay: birthDay,
      dateStart:beginDay,
      dateEnd:endDay,
      active: true,
      employerId: 38
      
      },{header:header})
      .then(function (response) {
        //postRequest();
        console.log(response);
        handleCloseD();
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });

  }
  const handleClose = () => {
    setBirthDay("")
    setnameEmp("")
    setEmail("")
    setPhoneEmp("")
    setOccupation("")
    setIdHoraire("")
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const viewShow = (id) => { 
    viewEmploy(id);
    getDayOffDayEmmp(id);
    getDayOffEmmp(id);
    setView(true);
    console.log("=========================ppppppppppppppppppppppp==========");
    
  }
  const formateDate=(today)=>{
      let formattedToday="";
      if(today!=""){
        console.log("nnn: "+today);
        let tt=today.split("-");
        formattedToday = tt[0]+ '-'+ tt[1] + '-' + tt[2].substring(0, 2);
        console.log("my date : "+formattedToday);
        setBirthDay(formattedToday);
      } 
      setBirthDay(formattedToday);
    }
    const formateBeginDate=(today)=>{
  
      let tt=today.split("-");
      let formattedToday = tt[0]+ '-'+ tt[1] + '-' + tt[2] ;//value="2013-01-08"
      console.log("my date : "+formattedToday);
      setBeginDay(formattedToday);
    
      }
      const formateEndDate=(today)=>{
        let tt=today.split("-");
        console.log(today);
        // const yyyy = today.getFullYear();
        // let mm = today.getMonth(); // Months start at 0!
        // let dd = today.getDate();
        // if (dd < 10) dd = '0' + dd;
        // if (mm < 10) mm = '0' + mm;
        let formattedToday = tt[0]+ '-'+ tt[1] + '-' + tt[2] ;//value="2013-01-08"
        console.log("my date : "+formattedToday);
        setEndDay(formattedToday);
      
        }
  
  const hanadleUpdate=async(id)=>{
    setShow(true);
    const response = await axios.get(baseUrl+'/'+id).catch((err) => {
      console.log(err);
      
    });  
  if(response) {
    //setEmploye(response.data);
    //console.log("Hier: "+response.data["birthDay"]);
    
    setIdEmp(response.data["idEmp"])
    formateDate(response.data["birthDay"])
    setnameEmp(response.data["nameEmp"])
    setEmail(response.data["emailEmp"])
    setPhoneEmp(response.data["phoneEmp"])
    setOccupation(response.data["occupation"])
    setIdHoraire(response.data["horaireId"])
    
    console.log(response.data)
  }
    
  }
  const updateEmp=()=>{
    axios.put(baseUrl+'/', {
      idEmp:idEmp,
      nameEmp: nameEmp,
      emailEmp: email,
      phoneEmp: phoneEmp,
      birthDay: birthDay,
      status: true,
      occupation: occupation,
      codeEmp: '',
      horaireId:idHoraire,
      urlPicture: '',
      urlQrcode: '',
      login:null
     
      },{header:header})
      .then(function (response) {
        //postRequest();
        console.log(response);
        handleClose();
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const viewClose = () => setView(false);
  
  const viewEmploy=async(id)=>{
    const response = await axios.get(baseUrl+'/'+id).catch((err) => {
      console.log(err);
      
    });  
  if(response) {
    setEmploye(response.data);
    console.log(response.data)
  }
  }
    
    let header=
  {
        'Content-Type': 'application/json'
    };
  const postRequest=()=>{
    //e.preventDefault();
    console.log("===================================");
    axios.post(baseUrl, {
    nameEmp: nameEmp,
    emailEmp: email,
    phoneEmp: phoneEmp,
    birthDay: birthDay,
    status: true,
    occupation: occupation,
    codeEmp: '',
    horaireId:idHoraire,
    urlPicture: '',
    urlQrcode: '',
    login:null
    },{header:header})
    .then(function (response) {
      //postRequest();
      console.log(response);
      handleClose();
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  //===============
  const getDayOffs=async()=>{
    const response = await axios.get(bUrl+"/GetDayOffs").catch((err) => {
      console.log(err);
      
    });  
  if(response) {
    setDayOffs(response.data);
    console.log(response.data)
  }
  
  }
  //===============
  //===============
  const getEmps=async(codeEmpt,departementt)=>{
    setCodeEmp(codeEmpt);
    setDepartement(departementt);
    if(codeEmpt!=""){
      baseUrl+="?codeEmp="+codeEmpt;
    }if(codeEmpt!="" && departementt!=""){
      baseUrl+="&";
    }else if(codeEmpt=="" && departementt!=""){
      
      baseUrl+="?";
    }
    if(departementt!=""){
      baseUrl+="departement="+departementt;
    }
    const response = await axios.get(baseUrl).catch((err) => {
      console.log(err);
      
    });  
  if(response) {
    setEmps(response.data);
    console.log(response.data)
  }
  
  }
  //===============
  //===============
  const getDayOffDayEmmp=async(id)=>{
    const response = await axios.get(bUrl+"/GetDayOffDayByEmp/"+id).catch((err) => {
      console.log(err);
      
    });  
  if(response) {
    setListDayOfFDayEmp(response.data);
    console.log(response.data)
  }
  
  }
  //===============
  //===============
  const getDayOffEmmp=async(id)=>{
    const response = await axios.get(bUrl+"/GetDayOfEmployer?idEmp="+id).catch((err) => {
      console.log(err);
      
    });  
  if(response) {
    setListDayOfEmp(response.data);
    console.log(response.data)
  }
  
  }
  //===============
  const getHoraires=async()=>{
    const response = await axios.get(bUrl+"/GetHoraires").catch((err) => {
      console.log(err);
      
    });  
  if(response) {
    setHoraires(response.data);
    console.log(response.data)
  }
  
  }
  useEffect(()=>{
    
    getEmps(codeEmp,departement)
    getHoraires()
  },[]);
  const deleteDayOff=async(idEmp,idDayOff)=>{
    if(window.confirm("Etes vous sure de vouloir supprimer")){
      const response = await axios.delete(bUrl+'/deleteDayOffEmp?idEmp='+idEmp+'&idDayOff='+idDayOff).catch((err) => {
      console.log(err);
      
    });  
  if(response) {
    getDayOffEmmp(idEmp);
    console.log(response)
  }
    }

  }
  const handleDelete=async(id)=>{
    if(window.confirm("Etes vous sure de vouloir supprimer employé")){
      const response = await axios.delete(baseUrl+'/'+id).catch((err) => {
      console.log(err);
      
    });  
  if(response) {
    getEmps(codeEmp,departement);
    console.log(response)
  }
    }

  }
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentEmps = emps.slice(firstPostIndex, lastPostIndex);
  return (
    <div className="">
      
      <div className="container">
 

<div className='c-search card-shadow'>
<div className="my-row">
<div className="col-sm-3 m-3">
    <div className="static-card">
      <h2>Employés</h2>
      <h2 className='chif'>{emps.length>0?emps.length:0}</h2>
    </div>
</div>
  <div className="col-sm-3 m-3">
    <div className="static-card">
      <h2>Présence</h2>
      <h2 className='chif'>{emps.length>0?emps.length:0}</h2>
    </div>
  </div>
  <div className="col-sm-3 m-3">
    <div className="static-card">
      <h2>Départements</h2>
      <h2 className='chif'>40</h2>
    </div>
  </div>
  
</div>
</div>
<div className="my-4 p-3 container-search">
  <div>
    <h5>Départements</h5>
  <input type="text" placeholder="Search..." className='input-sh' onChange={(e)=>getEmps(codeEmp,e.target.value)} value={departement}/>
  </div>
  <div>
    <h5>N employés</h5>
  <input type="text" placeholder="N..." className='input-sh' onChange={(e)=>getEmps(e.target.value,departement)} value={codeEmp}/>
  </div>
  
    
    
  </div>
  <Button variant="primary" onClick={handleShow}>
  <i className="bi bi-database-add"></i>
  New client
      </Button>
  {/* <a href="/Home/Create" className="btn btn-primary mb-1"> </a> */}
<table className="table card-shadow mt-2 list-table">
    <thead>
        <tr>
            <th>id</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Code employer</th>
             <th>Actions</th>
             <th>Actions</th>
        </tr>
    </thead>
    
   <tbody>
    {currentEmps.length > 0 ? currentEmps.map((e,i) => {
                 return <tr key={i}>
                    <td>{e.idEmp}</td>
                    <td>{e.nameEmp}</td>
                    <td>{e.emailEmp}</td>
                    <td>{e.phoneEmp}</td>
                    <td>{e.codeEmp}</td>
                    <td>
                    <i class="bi bi-eye btn btn-primary" onClick={()=>viewShow(e.idEmp)}></i>&nbsp;
                      <i className="bi bi-pencil-square btn btn-primary" onClick={()=>hanadleUpdate(e.idEmp)}></i>&nbsp;
                      <i className="bi bi-trash btn btn-danger " onClick={()=>handleDelete(e.idEmp)}></i> 
                      {/* <i className="bi bi-trash btn btn-primary " onClick={()=>handleDayOff(e.idEmp)}></i> */}
                    </td>
                    <td><img src={e.urlQrcode} width="60px"/></td>
                </tr>
              })
              :""}
    </tbody>
    
</table>

<Pagination totalPosts={emps.length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
      <ListHoraire listHoraires={horaire}/>
      <Modal show={showD} onHide={handleCloseD} className="modal-lg">
        <Modal.Header closeButton>
          <Modal.Title>Nouveau Congé</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div class="form-group mb-2">
              <input type="date"  name="DateBegin" className='form-control' onChange={(e)=>formateBeginDate(e.target.value)} value={beginDay}/>
            </div>
            <div class="form-group mb-2">
              <input type="date"  name="birthDateEnd" className='form-control' onChange={(e)=>formateEndDate(e.target.value)} value={endDay}/>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseD}>
            Close
          </Button>
          {idEmp===1?
          <Button variant="primary" onClick={postDayOffDay}>
            Ajouter
          </Button>:
          <Button variant="primary" onClick={postDayOffDay}>
           Modifier
          </Button>
          }
        </Modal.Footer>
        </Modal>

        <Modal show={showDf} onHide={handleCloseDf} className="modal-lg">
        <Modal.Header closeButton>
          <Modal.Title>Nouveau Day Off</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div class="form-group mb-2">
            <select class="form-control" id="dayoff" placeholder='' onChange={(e)=>setDayOff(e.target.value)} value={dayOff}>
            <option >Jour semaine</option>
            {
              dayOffs.length>0?dayOffs.map((d,i)=>{
                return <option value={d.idDayOff}>{d.weeDay}</option>;
            }):""
            }
              
          </select>
            </div>
            
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDf}>
            Close
          </Button>
          
          <Button variant="primary" onClick={()=>postDayOf(employe.idEmp)}>
            Ajouter
          </Button>
          
        </Modal.Footer>
        </Modal>
        
      <Modal show={show} onHide={handleClose} className="modal-lg">
        <Modal.Header closeButton>
          <Modal.Title>Nouveau employé</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form>
        <div class="form-group mb-2">
          <input type="text" placeholder="Nom" name="nomEmp" className='form-control ' value={nameEmp} onChange={(e)=>setnameEmp(e.target.value)}/>
        </div>
        <div class="form-group mb-2">
          <input type="email" placeholder="Email" name="emailEmp" className='form-control' onChange={(e)=>setEmail(e.target.value)} value={email}/>
        </div>
        <div class="form-group mb-2">
          <input type="text" placeholder="Phone" name="phoneEmp" className='form-control' onChange={(e)=>setPhoneEmp(e.target.value)} value={phoneEmp}/>
        </div>
        <div class="form-group mb-2">
          <input type="date" placeholder="Phone" name="birthDate" className='form-control' onChange={(e)=>setBirthDay(e.target.value)} value={birthDay}/>
        </div>
        <div class="form-check mb-2">
          <input type="checkbox" class="form-check-input" id="exampleCheck1" onChange={(e)=>setStatus(e.target.value)} value={status} checked={status}/>
          <label class="form-check-label" for="exampleCheck1">Statu</label>
        </div>
        <div class="form-group">
        <select class="form-control" id="exampleFormControlSelect1" placeholder='Département' onChange={(e)=>setOccupation(e.target.value)} value={occupation}>
          <option >Département</option>
          <option value={"IT suport"}>IT suport</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
    </div>
    <div class="form-group">
        <select class="form-control" id="exampleFormControlSelect1" placeholder='Département' onChange={(e)=>setIdHoraire(e.target.value)}  value={idHoraire}>
          <option >Horaire</option>
          {
            horaire.map((h,i)=>(
              <option value={h.idHoraire} selected={idHoraire == h.idHoraire}>{h.type}</option>
            ))
          }
          </select>
          </div>
        </form>
         </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {idEmp===0?
          <Button variant="primary" onClick={postRequest}>
            Ajouter
          </Button>:
          <Button variant="primary" onClick={updateEmp}>
           Modifier
          </Button>
          }
        </Modal.Footer>
      </Modal>
      {employe!=null?
      <Modal show={view} onHide={viewClose} className="modal-xl">
        <Modal.Header closeButton>
          <Modal.Title>Détails</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='contain'>
          <div className='row d-flex justify-content-center'>
            <div className='col-md-3'><img src={employe.urlPicture} alt='img' className='w-100'/></div>
            <div className='col-md-9'>
              <div className='row mb-2'>
                <div className='col-3'>Nom:</div>
                <div className='col-9 fw-bold'>{employe.nameEmp}</div>
              </div>
              <div className='row mb-2'>
                <div className='col-3'>Email:</div>
                <div className='col-9 fw-bold'>{employe.emailEmp}</div>
              </div>
              <div className='row mb-2'>
                <div className='col-3 '>Departement:</div>
                <div className='col-9 fw-bold'>{employe.occupation}</div>
              </div>
              <div className='row mb-2'>
                <div className='col-3'>Tel:</div>
                <div className='col-9 fw-bold'>{employe.phoneEmp}
              </div>
              </div>
              
            </div>
            <hr className='my-4'/>
            
            <div className='row'>
              <div className='col'>
              <i className="bi bi-database-add btn btn-primary mb-2" onClick={()=>handleDayOff(employe.idEmp)}>&nbsp;Nouveau</i>
              <div className='w-100 d-flex justify-content-center bg-primary text-light'>
              <div className=''>
                <h3>Congés</h3>
                </div>
              </div>
              <div>
              
                {listDayOffDayEmp.length>0?
              <div className='row'>
                <table className='table table-borderless'>
                <thead>
                  <tr>
                    <th>Nº</th><th>Début</th><th>Fin</th><th>Active</th><th>Actions</th>
                  </tr>
                </thead>
                  <tbody>
                    {
                      listDayOffDayEmp.map((l,i)=>{
                        return<tr>
                    
                        <td>{i}</td><td>{l.dateStart}</td><td>{l.dateEnd}</td><td style={{color:l.active?'green':'red'}}>{l.active?'Activé':"Désactivé"}</td>
                        <td><i className="btn btn-primary " onClick={()=>deactiveOrActiveDayOfDay(l.idDayOffDay,employe.idEmp)}>{l.active?'Désactivé':'Activé'}</i></td>
                        </tr>
                      })
                    }
                  
                  </tbody>
                  
                </table>
              </div>
              :""}
                </div>
            

              </div>
              <div className='col'>
                
              <div className='col'>
              <i className="bi bi-database-add btn btn-primary mb-2" onClick={handleDf}>&nbsp;Nouveau</i>
              <div className='w-100 d-flex justify-content-center bg-primary text-light'>
              <div className=''>
                <h3>Day off</h3>
                </div>
              </div>
              <div>
            {listDayOfEmp.length>0?
              <div className='row'>
                <table className='table table-borderless'>
                <thead>
                  <tr>
                    <th>Nº</th><th>Jour Semaine</th>
                  </tr>
                </thead>
                  <tbody>
                    {
                      listDayOfEmp.map((l,i)=>{
                        return<tr>
                    
                        <td>{i}</td><td>{l.dayOff['weeDay']}</td>
                        <td><i className="btn btn-danger " onClick={()=>deleteDayOff(employe.idEmp,l.idDayOff)}>Supprimé</i></td>
                        </tr>
                      })
                    }
                    
                  
                  </tbody>
                  
                </table>
              </div>
              :""}
              </div>
              </div>
              </div>
            </div>
            
          </div>
          </div>
         </Modal.Body>
        <Modal.Footer>
         
        </Modal.Footer>
      </Modal>:""}
    </div>
      
    </div>
  );
}
