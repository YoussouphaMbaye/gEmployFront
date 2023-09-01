import React from 'react'

function ListHoraire({listHoraires}) {

const viewShow=()=>{

}
const hanadleUpdate=()=>{

}
const handleDelete=()=>{

}
  return (
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
                    <i class="bi bi-eye btn btn-primary" onClick={()=>viewShow(h.idHoraire)}></i>&nbsp;
                      <i className="bi bi-pencil-square btn btn-primary" onClick={()=>hanadleUpdate(h.idHoraire)}></i>&nbsp;
                      <i className="bi bi-trash btn btn-danger " onClick={()=>handleDelete(h.idHoraire)}></i> 
                    </td>
                    
                </tr>
              })
              :""}
    </tbody>
    
</table>
  )
}

export default ListHoraire