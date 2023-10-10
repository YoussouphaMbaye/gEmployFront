import axios from 'axios';
import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
function LisPholidays({listHoraires,getHolidays}) {
const [showH, setShowH] = useState(false);
const [dateH, setDateH] = useState("");

const bUrl=process.env.REACT_APP_B_URL;

const viewShow=()=>{
  
}
const handleDelete=async(id)=>{
    if(window.confirm("Etes vous sure de vouloir supprimer employé")){
      const response = await axios.delete(bUrl+'/publicHolidays/'+id).catch((err) => {
      console.log(err);
      
    });  
  if(response) {
    getHolidays()
    console.log(response)
  }
    }

  }
const hanadleUpdate=()=>{

}
const formateBeginDate=(today)=>{
  
    let tt=today.split("-");
    let formattedToday = tt[0]+ '-'+ tt[1] + '-' + tt[2] ;//value="2013-01-08"
    console.log("my date : "+formattedToday);
    setDateH(formattedToday);
  
    }
const saveHoliday=()=>{
    let formattedToday="";
    if(dateH==""){
        
        let newDate=new Date();
        const yyyy = newDate.getFullYear();
        let mm = newDate.getMonth(); // Months start at 0!
        let dd = newDate.getDate();
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        console.log(yyyy+'-'+mm+'-'+dd)
        formattedToday=yyyy+'-'+mm+'-'+dd;
        setDateH(formattedToday);
    }else{
        let tt=dateH.split("-");
        formattedToday = tt[0]+ '-'+ tt[1] + '-' + tt[2] ;//value="2013-01-08"
        setDateH(formattedToday);
    }
    let header=
  {
        'Content-Type': 'application/json'
    };
    axios.post(bUrl+"/PostPublicHoliday", {
        
        date: dateH
        },{header:header})
        .then(function (response) {
          //postRequest();
          console.log(response);
          getHolidays()
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
  const handleCloseH=()=>{
    setShowH(false);
    
  }
  return (
    <>
    <Modal show={showH} onHide={handleCloseH} className="modal-sm">
        <Modal.Header closeButton>
          <Modal.Title>Nouvelle fête</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div class="form-group mb-2">
              <input type="date"  name="DateH" className='form-control' onChange={(e)=>setDateH(e.target.value)} value={dateH}/>
            </div>
            
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseH}>
            Close
          </Button> 
          <Button variant="primary" onClick={saveHoliday}>
            Save
          </Button> 
          
        </Modal.Footer>
        </Modal>
        <Button variant="primary" onClick={handleShowH}>
  <i className="bi bi-database-add"></i>
  Nouvelle fête
      </Button>
    <table className="table card-shadow mt-2 list-table">
    <thead>
        <tr>
            <th>id</th>
            <th>Date</th>
        </tr>
    </thead>
    
   <tbody>
    {listHoraires.length > 0 ? listHoraires.map((h,i) => {
                 return <tr key={i}>
                    <td>{i}</td>
                    <td>{h.date}</td>
                    
                    
                    <td>
                    <i class="bi bi-eye btn btn-primary" onClick={()=>handleShowH()}></i>&nbsp;
                      <i className="bi bi-pencil-square btn btn-primary" onClick={()=>hanadleUpdate(h.idHoraire)}></i>&nbsp;
                      <i className="bi bi-trash btn btn-danger " onClick={()=>handleDelete(h.idPublicHolidaysayOff)}></i> 
                    </td>
                    
                </tr>
              })
              :""}
    </tbody>
    
</table>
</>
  )
}

export default LisPholidays