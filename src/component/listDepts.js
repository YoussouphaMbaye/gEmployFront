
import axios from 'axios';
import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Pagination from './Pagination';
function ListDeps({ListDeps,getDeps}) {
const [showH, setShowH] = useState(false);
const [dateH, setDateH] = useState("");
const [depName, setdepName] = useState("");
const [idDep, setIdDep] = useState("");
const [description, setdescription] = useState("");
const [type, setType] = useState("");
const [showError, setShowErro] = useState(false);
const [currentPage, setCurrentPage] = useState(1);
const [postsPerPage, setPostsPerPage] = useState(5);

const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentDeps = ListDeps.slice(firstPostIndex, lastPostIndex);

const handleCloseError=()=>{
  setShowErro(false);
}
  const bUrl=process.env.REACT_APP_B_URL;
  const handleCloseH=()=>{
    setIdDep('');
    setdepName("");
    setdescription("");
    setShowH(false);
    
  }
const handleDelete=async(id)=>{
    if(window.confirm("Etes vous sure de vouloir supprimer")){
      const response = await axios.delete(bUrl+'/deleteDepartement/'+id).catch((err) => {
      console.log(err);
      
    });  
  if(response) {
    getDeps()
    console.log(response)
  }
    }

  }
const hanadleUpdate=(idDep,depName,description)=>{
    setIdDep(idDep);
    setdepName(depName);
    setdescription(description);
    setShowH(true);
}
const updateDepartement=()=>{
    let header=
    {
        'Content-Type': 'application/json'
    };
    axios.put(bUrl+"/UpdateDepartement", {
        idDepartement:idDep,
        departementName: depName,
        description:description
        },{header:header})
        .then(function (response) {
            //postRequest();
            console.log(response);
            getDeps();
            handleCloseH();
            //return response.data;
          })
          .catch(function (error) {
            setShowErro(true);
            console.log(error);
          });
}

const saveHoraire=()=>{
    
    let header=
  {
        'Content-Type': 'application/json'
    };
    axios.post(bUrl+"/PostDepartement", {
        departementName: depName,
        description:description
        },{header:header})
        .then(function (response) {
          //postRequest();
          console.log(response);
          getDeps();
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
          <Modal.Title>Nouveau Département</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div class="form-group mb-2">
              <input type="text"  name="begin" placeholder='Departement' className='form-control' onChange={(e)=>setdepName(e.target.value)} value={depName}/>
            </div>
            <div class="form-group mb-2">
              <input type="text"  name="description" placeholder='description' className='form-control' onChange={(e)=>setdescription(e.target.value)} value={description}/>
            </div>
            
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseH}>
            Fermer
          </Button> 
          {(idDep=='')?
          <Button variant="primary" onClick={saveHoraire}>
            Enregistrer
          </Button>:<Button variant="primary" onClick={updateDepartement}>
            Modifier
          </Button> }
          
        </Modal.Footer>
        </Modal>
        
    
        <Button variant="primary" onClick={handleShowH}>
  <i className="bi bi-database-add"></i>
  Nouveau Département
      </Button>
    <table className="table card-shadow mt-2 list-table">
    <thead>
        <tr>
            <th>Nº</th>
            <th>Nom</th>
            <th>Description</th>
             <th>Actions</th>
        </tr>
    </thead>
    
   <tbody>
    {currentDeps.length > 0 ? currentDeps.map((d,i) => {
                 return <tr key={i}>
                    <td>{i}</td>
                    <td>{d.departementName}</td>
                    <td>{d.description}</td>
                    
                    
                    <td>
                    
                      <i className="bi bi-pencil-square btn btn-primary" onClick={()=>hanadleUpdate(d.idDepartement,d.departementName,d.description)}></i>&nbsp;
                      <i className="bi bi-trash btn btn-danger " onClick={()=>handleDelete(d.idDepartement)}></i> 
                    </td>
                    
                </tr>
              })
              :""}
    </tbody>
    
</table>
{ListDeps.length>postsPerPage?
<Pagination totalPosts={ListDeps.length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
:""}
</>
  )
}

export default ListDeps