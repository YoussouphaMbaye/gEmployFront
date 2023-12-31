
import axios from 'axios';
import React, { useState } from 'react'
import { Button} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Pagination from './Pagination';
function ListHoraire({listHoraires,getHoraires}) {
const [showH, setShowH] = useState(false);
const [dateH, setDateH] = useState("");
const [bgTime, setBgTime] = useState("");
const [endTime, setEndTime] = useState("");
const [type, setType] = useState("");
const [showError, setShowErro] = useState(false);
const [currentPage, setCurrentPage] = useState(1);
const [postsPerPage, setPostsPerPage] = useState(5);

const lastPostIndex = currentPage * postsPerPage;
const firstPostIndex = lastPostIndex - postsPerPage;
const currentHoraire = listHoraires.slice(firstPostIndex, lastPostIndex);

const handleCloseError=()=>{
  setShowErro(false);
}
  const bUrl=process.env.REACT_APP_B_URL;
  const handleCloseH=()=>{
    setShowH(false);
    
  }
const handleDelete=async(id)=>{
    if(window.confirm("Etes vous sure de vouloir supprimer employé")){
      const response = await axios.delete(bUrl+'/Horaires/'+id).catch((err) => {
      console.log(err);
      
    });  
  if(response) {
    getHoraires()
    console.log(response)
  }
    }

  }
const hanadleUpdate=()=>{

}

const saveHoraire=()=>{
    
        let tt=endTime.split(":");
        let dd = tt[0]+':'+ tt[1]  ;//value="2013-01-08"
        setEndTime(dd);
        let t=bgTime.split(":");
        let d = t[0]+':'+ t[1]  ;//value="2013-01-08"
        setBgTime(d);
    
    let header=
  {
        'Content-Type': 'application/json'
    };
    axios.post(bUrl+"/PostHoraire", {
        
      timeStart: bgTime,
      timeEnd:endTime,
      type:type
        },{header:header})
        .then(function (response) {
          //postRequest();
          console.log(response);
          getHoraires();
          handleCloseH();
          //return response.data;
        })
        .catch(function (error) {
          setShowErro(true);
          console.log(error);
        });

}
const handleShowH=()=>{
    setShowH(true);
    
  }
  
  return (
    <>
    <Modal show={showError} onHide={handleCloseError} className="modal-sm">
        <Modal.Header closeButton>
          <Modal.Title>Erreure</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <h5 className='text-danger' style={{textAlign:'center'}}>Une erreure c'est produite!</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseError}>
            Fermer
          </Button> 
        </Modal.Footer>
        </Modal>

    <Modal show={showH} onHide={handleCloseH} className="modal-sm">
        <Modal.Header closeButton>
          <Modal.Title>Nouveau Horaire</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div class="form-group mb-2">
              <input type="text"  name="begin" placeholder='00:00' className='form-control' onChange={(e)=>setBgTime(e.target.value)} value={bgTime}/>
            </div>
            <div class="form-group mb-2">
              <input type="text"  name="endTime" placeholder='00:00' className='form-control' onChange={(e)=>setEndTime(e.target.value)} value={endTime}/>
            </div>
            <div class="form-group mb-2">
              <input type="text"  name="type" className='form-control' onChange={(e)=>setType(e.target.value)} value={type}/>
            </div>
            
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseH}>
            Close
          </Button> 
          <Button variant="primary" onClick={saveHoraire}>
            Save
          </Button> 
          
        </Modal.Footer>
        </Modal>
        
    
        <Button variant="primary" onClick={handleShowH}>
  <i className="bi bi-database-add"></i>
  Nouveau Horaire
      </Button>
    <table className="table card-shadow mt-2 list-table">
    <thead>
        <tr>
            <th>Nº</th>
            <th>Début</th>
            <th>Fin</th>
            <th>Type</th>
            
             <th>Actions</th>
        </tr>
    </thead>
    
   <tbody>
    {currentHoraire.length > 0 ? currentHoraire.map((h,i) => {
                 return <tr key={i}>
                    <td>{i}</td>
                    <td>{h.timeStart}</td>
                    <td>{h.timeEnd}</td>
                    <td>{h.type}</td>
                    
                    <td>
                    <i class="bi bi-eye btn btn-primary" ></i>&nbsp;
                      <i className="bi bi-pencil-square btn btn-primary" onClick={()=>hanadleUpdate(h.idHoraire)}></i>&nbsp;
                      <i className="bi bi-trash btn btn-danger " onClick={()=>handleDelete(h.idHoraire)}></i> 
                    </td>
                    
                </tr>
              })
              :""}
    </tbody>
    
</table>
{listHoraires.length>postsPerPage?
<Pagination totalPosts={listHoraires.length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage}/>:""}
</>
  )
}

export default ListHoraire