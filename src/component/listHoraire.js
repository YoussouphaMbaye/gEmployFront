
import axios from 'axios';
import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
function ListHoraire({listHoraires,getHoraires}) {
  const [showH, setShowH] = useState(false);
  const [dateH, setDateH] = useState("");
  const [bgTime, setBgTime] = useState("");
const [endTime, setEndTime] = useState("");
const [type, setType] = useState("");
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
          console.log(error);
        });

}
const handleShowH=()=>{
    setShowH(true);
    
  }
  
  return (
    <>
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
            <th>id</th>
            <th>Début</th>
            <th>Fin</th>
            <th>Type</th>
            
             <th>Actions</th>
        </tr>
    </thead>
    
   <tbody>
    {listHoraires.length > 0 ? listHoraires.map((h,i) => {
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
</>
  )
}

export default ListHoraire