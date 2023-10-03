import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Pagination from '../component/Pagination';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function ControlCode() {
    const [emps, setEmps] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(8);
    const [theDate, setTheDate] = useState("");
    const [theDate2, setTheDate2] = useState("");
    const [codeEmp, setCodeEmp] = useState("");
    const [nbEmp,setNbEmp]=useState(0);
    const [missOrhier, setMissOrhier] = useState("");
    const{id}=useParams();
    const bUrl="http://localhost:5172"

    useEffect(()=>{
    
        getEmps(theDate,theDate2,missOrhier)
        
        
        
      },[theDate]);
    //===============
    const getEmps=async(theDate,theDate2,missOrhier)=>{
        console.log("bbbbbbb");
        let formattedToday="";
        if(theDate==""){
            let newDate=new Date();
            let resultDate=new Date();
            resultDate.setDate(newDate.getDate()-10);
           
            const yyyy = resultDate.getFullYear();
            let mm = resultDate.getMonth(); // Months start at 0!
            let dd = resultDate.getDate();
            mm=mm+1;
            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;
            //newDate=newDate.setDate(newDate.getMonth()+1);
            const yyyyi = newDate.getFullYear();
            let mmi = newDate.getMonth(); // Months start at 0!
            let ddi = newDate.getDate();
            mmi=mmi+1;
            if (ddi < 10) ddi = '0' + ddi;
            if (mmi < 10) mmi = '0' + mmi;
            console.log("-----------------");
            console.log(yyyy+'-'+mm+'-'+dd)
            setTheDate2(yyyyi+'-'+mmi+'-'+ddi)
           formattedToday=yyyy+'-'+mm+'-'+dd;
            setTheDate(formattedToday);
        }else{
            let tt=theDate.split("-");
            formattedToday = tt[0]+ '-'+ tt[1] + '-' + tt[2] ;//value="2013-01-08"
            setTheDate(formattedToday);
            let tt2=theDate2.split("-");
            let formattedToday2 = tt2[0]+ '-'+ tt2[1] + '-' + tt2[2] ;
            setTheDate2(formattedToday2);
        }
        let myurl=bUrl+"/controleEmploy?startDate="+theDate+"&endDate="+theDate2+"&idEmp="+id;
        setMissOrhier(missOrhier);
        if(missOrhier!=""){
            
            myurl=bUrl+"/controleEmploy?startDate="+theDate+"&endDate="+theDate2+"&idEmp="+id+"&hierOrMissing="+missOrhier;
        }
        const response = await axios.get(myurl).catch((err) => {
        console.log(err);
        
        });  
    if(response) {
        setEmps(response.data);
        console.log(response.data)
    }
    
    }
    //===============
    const formateBeginDate=(today)=>{
  
        let tt=today.split("-");
        let formattedToday = tt[0]+ '-'+ tt[1] + '-' + tt[2] ;//value="2013-01-08"
        console.log("my date : "+formattedToday);
        setTheDate(formattedToday);
      
        }
        
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    let currentEmps = emps.slice(firstPostIndex, lastPostIndex);
    

  return (
    <div className='container'>
     

        <div className="my-4 p-3 container-search card-shadow">
  <div>
    <h5>Date de Début</h5>
  <input type="date" placeholder="Search..." className='input-sh' value={theDate} onChange={(e)=>getEmps(e.target.value,theDate2,missOrhier)}/>
  </div>
  <div>
    <h5>Date de fin</h5>
    <input type="date" placeholder="Search..." className='input-sh' value={theDate2} onChange={(e)=>getEmps(theDate,e.target.value,missOrhier)}/>
  </div>
  <div>
    <h5>Présence</h5>
    <select class="input-sh" id="exampleFormControlSelect1" placeholder='Département' onChange={(e)=>getEmps(theDate,theDate2,e.target.value)} value={missOrhier}>
          <option ></option>
          <option value="Missing">Absent(e)</option>
          <option value="Hier">Présent(e)</option>
</select>
  
  </div>
    
    
  </div>
  <Button variant="primary" >
  
  Total:{emps.length}
      </Button>
        <table className="table card-shadow mt-2 list-table">
    <thead>
        <tr>
            <th>Date</th>
            <th>Nom</th>
            <th>Arrivé</th>
            <th>Départ</th>
            <th>Présence</th>
            <th>Retard</th>
            {/* <th>Code employer</th>
             <th>Actions</th>
             <th>Actions</th> */}
        </tr>
    </thead>
    
   <tbody>
    {currentEmps!=null ? currentEmps.map((e,i) => {
      console.log(e.employer.IdEmp)
                 return <tr key={i}>
                    <td><i className="bi bi-calendar-check-fill text-primary" ></i>&nbsp;{e.theDate}</td>
                    <td>{e.employer.nameEmp}</td>
                    <td>{e.hourGetIn}</td>
                    <td>{e.hourGetOut}</td>
                    <td style={{backgroundColor: e.hier == 'Hier'? '#090': 'red'}} className='text-white'>{e.hier}</td>
                    <td>{e.late}</td>
                    {/* <td>{e.employer.codeEmp}</td> */}
                    <td>
                    
                      {/* <i className="bi bi-trash btn btn-primary " onClick={()=>handleDayOff(e.idEmp)}></i> */}
                    </td>
                    {/* <td><img src={e.urlQrcode} width="60px"/></td> */}
                </tr>
              })
              :""}
    </tbody>
    
</table>
{currentEmps!=null ?
<Pagination totalPosts={emps.length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
   :""}
    </div>
  )
}

export default ControlCode