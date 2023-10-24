import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Pagination from '../component/Pagination';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import Navabar from '../component/navabar';

function ListMissingOrHier() {
    const [emps, setEmps] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(8);
    const [theDate, setTheDate] = useState("");
    const [codeEmp, setCodeEmp] = useState("");
    const [missOrhier, setMissOrhier] = useState("");
    const [nbEmp,setNbEmp]=useState(0);
    const navigate = useNavigate();
    const [listDepartement,setListDepartement]=useState([]);
    const bUrl=process.env.REACT_APP_B_URL;

    useEffect(()=>{
      if(sessionStorage.getItem("access_token")==null || sessionStorage.getItem("access_token")==""){

        navigate('/login');
      }
      const fetchData = async () => {
        await getEmps()
        
      }
      fetchData();
      getDepartements();
        
        
      },[]);
      //===============
  const getDepartements=async()=>{
    const response = await axios.get(bUrl+"/GetDepartements").catch((err) => {
      console.log(err);
      
    });  
  if(response) {
    setListDepartement(response.data);
    console.log(response.data)
  }
  
  }
  //===============
    //===============
    const getEmps=async()=>{
        const response = await axios.get(bUrl+"/missingOrHier").catch((err) => {
        console.log(err);
        
        });  
    if(response) {
        setEmps(response.data);
        
          setNbEmp(response.data['listEmpR'].length);
      
        //console.log(response.data)
    }
    
    }
    //===============
    const formateBeginDate=(today)=>{
  
        let tt=today.split("-");
        let formattedToday = tt[0]+ '-'+ tt[1] + '-' + tt[2] ;//value="2013-01-08"
        //console.log("my date : "+formattedToday);
        setTheDate(formattedToday);
      
        }
        const getByDate=async(laDate,codeEmp,missOrhier)=>{
            
            setCodeEmp(codeEmp);
            setMissOrhier(missOrhier);
            //let dateT=laDate;
            let formattedToday="";
            let codeEmpT=codeEmp;
            let missOrhiert=missOrhier;
            if(theDate==""){
                let newDate=new Date();
                const yyyy = newDate.getFullYear();
                let mm = newDate.getMonth(); // Months start at 0!
                let dd = newDate.getDate();
                if (dd < 10) dd = '0' + dd;
                mm=mm+1
                if (mm < 10) mm = '0' + mm;
                //console.log(yyyy+'-'+mm+'-'+dd)
                formattedToday=yyyy+'-'+mm+'-'+dd;
                setTheDate(formattedToday);
            }else{
                let tt=laDate.split("-");
                formattedToday = tt[0]+ '-'+ tt[1] + '-' + tt[2] ;//value="2013-01-08"
                setTheDate(formattedToday);
            }
            let url=bUrl+"/missingOrHierDate?theDate="+formattedToday;
            
            if(codeEmpT!==""){
                url+="&codeEmp="+codeEmpT;
            }
            if(missOrhiert!==""){
                url+="&HierOrMissing="+missOrhiert;
            }
            const response = await axios.get(url).catch((err) => {
                console.log(err);
                
                });  
            if(response) {
                setEmps(response.data);
                //console.log(response.data)
            }
        }
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentEmps = (emps !=null)?emps['listEmpR'].slice(firstPostIndex, lastPostIndex):[];

  return (
    <div className="">
      <Navabar/>
    <div className='container'>
     
       <div className='c-search card-shadow'>
<div className="my-row">
<div className="col-sm-3 m-3">
    <div className="static-card">
      <h2>Employés</h2>
      <h2 className='chif'>{nbEmp}</h2>
    </div>
</div>
  <div className="col-sm-3 m-3">
    <div className="static-card">
      <h2>Présence</h2>
      <h2 className='chif1'>{emps!=null?emps.nbHier:0}</h2>
    </div>
  </div>
  <div className="col-sm-3 m-3">
    <div className="static-card">
      <h2>Départements</h2>
      <h2 className='chif2'>{listDepartement.length}</h2>
    </div>
  </div>
  
  
</div>
</div>
        <div className="my-4 p-3 container-search card-shadow">
  <div>
    <h5>Date</h5>
  <input type="date" placeholder="Search..." className='input-sh' value={theDate} onChange={(e)=>getByDate(e.target.value,codeEmp,missOrhier)}/>
  </div>
  <div>
    <h5>N employés</h5>
  <input type="text" placeholder="N..." className='input-sh' onChange={(e)=>getByDate(theDate,e.target.value,missOrhier)} value={codeEmp}/>
  </div>
  <div>
    <h5>Présence</h5>
    <select class="input-sh" id="exampleFormControlSelect1" placeholder='Département' onChange={(e)=>getByDate(theDate,codeEmp,e.target.value)} value={missOrhier}>
          <option ></option>
          <option value="Missing">Absent(e)</option>
          <option value="Hier">Présent(e)</option>
</select>
  
  </div>
    
    
  </div>
  
        <table className="table card-shadow mt-2 list-table">
    <thead>
        <tr>
            <th>Nº</th>
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
    {currentEmps!=null > 0 ? currentEmps.map((e,i) => {
      //console.log(e['employer'].IdEmp);
                 return <tr key={i}>
                    <td>{i}</td>
                    <td>{e['employer'].nameEmp}</td>
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

<Pagination totalPosts={(emps!=null)?emps['listEmpR'].length:0} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
   
    </div>
    </div>
  )
}

export default ListMissingOrHier