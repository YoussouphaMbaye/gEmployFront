import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
function Vente() {
  const [listDoClasse, setListDoClasse] = useState([]);
  const [lisS,setListS]= useState([1,2,3,4,5,6,7]);
  const [lisD,setListD]= useState({0:[],1:[],2:[],3:[],4:[],5:[],6:[],7:[]});
  const listHours=['08:00:00.000','09:00:00.000','10:00:00.000','11:00:00.000','12:00:00.000','13:00:00.000','14:00:00.000','15:00:00.000'];
 
  const getDoClasses=async()=>{
    setListD([]);
    const response = await axios.get('https://localhost:7126/GetDoClasse').catch((err) => {
      console.log(err);
      
    });  
  if(response) {
    setListDoClasse(response.data);
    let listD2={0:[],1:[],2:[],3:[],4:[],5:[],6:[],7:[]};
    if(lisD!=undefined){
      for (var l in listD2){
        console.log(response.data);
        console.log(parseInt(l)+1+"mmmmmmmmmmmmmmmmm"+l)
        response.data.forEach(d =>{
          if(d['hour']['heure']===listHours[l]){
            //console.log(l+1+"mmmmmmmmmmmmmmmmm"+l)
            console.log(d['hour']['heure'])
            console.log(listHours[l])
            listD2[l].push({
              "Day":d['weekDay'],
              "Hour":d['hour']['heure'],
              "lesson":d['lesson']['name']
            })
            
          }
        })
        for(let j=0;j<=7;j++){
         
          console.log("||||||||||||||||||||||||||"+listD2[l][j])
          if(listD2[l][j]==undefined){
            listD2[l][j]={
              "Day":j,
              "Hour":"00:00:000",
              "lesson":""
            }
          }
          j=j++;
        }
        
        listD2[l].sort((a,b)=>a.Day-b.Day);
        
      
      }
    
      
    }
    setListD(listD2)
    console.log("=============YOUSSOU==========")
    console.log(lisD)
  }
  }
  useEffect(()=>{
    getDoClasses();
  },[]);
  return (
    
    <div className='m-auto'>
        <table className="table card-shadow mt-2 list-table">
    <thead>
        <tr>
        <th></th>
            <th>L</th>
            <th>M</th>
            <th>M</th>
            <th>J</th>
            <th>V</th>
            <th>S</th>
            <th>D</th>
        </tr>
    </thead>
    
   <tbody>
    {
      
      (lisD!=undefined)?[0,1,2,3,4,5,6,7].map((d,i) => {
          
            console.log(lisD[d])
            console.log("ppppppppppppppppppppp")
            if(lisD[d]!=undefined){
            //console.log(lisD[d][1].Hour+"/"+listHours[d]);
          }
            return<tr>
            <td>{listHours[d]}</td>
            {(lisD[d]!=undefined)?<td >{(lisD[d][0]!=undefined)?(listHours[d]==lisD[d][0].Hour && lisD[d][0].Day==1)?lisD[d][0].lesson:"":""}</td>:""}
            {(lisD[d]!=undefined)?<td >{(lisD[d][1]!=undefined)?(listHours[d]==lisD[d][1].Hour && lisD[d][1].Day==2)?lisD[d][1].lesson:"":""}</td>:""}
            {(lisD[d]!=undefined)?<td >{(lisD[d][2]!=undefined)?(listHours[d]==lisD[d][2].Hour && lisD[d][2].Day==3)?lisD[d][2].lesson:"":""}</td>:""}
            {(lisD[d]!=undefined)?<td >{(lisD[d][3]!=undefined)?(listHours[d]==lisD[d][3].Hour && lisD[d][3].Day==4)?lisD[d][3].lesson:"":""}</td>:""}
            {(lisD[d]!=undefined)?<td >{(lisD[d][4]!=undefined)?(listHours[d]==lisD[d][4].Hour && lisD[d][4].Day==5)?lisD[d][4].lesson:"":""}</td>:""}
            {(lisD[d]!=undefined)?<td >{(lisD[d][5]!=undefined)?(listHours[d]==lisD[d][5].Hour && lisD[d][5].Day==6)?lisD[d][5].lesson:"":""}</td>:""}
            {/* {(lisD[d]!=undefined)?lisD[d].map((l,ii)=>{
              console.log(ii+1+"----------========----------"+ l.Day)
              return <>
             {l!=undefined?<td key={ii}>{(listHours[d]==l.Hour)?l.lesson:""}</td>:""} 
             </>
            }):""} */}
           
            </tr>
            
            
          
       
    })
    
    :""}
    </tbody>
    
</table>
        
    </div>
  )
}

export default Vente