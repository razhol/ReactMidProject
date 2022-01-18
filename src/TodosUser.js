
import './App.css';
import axios from 'axios'
import {useState,useEffect} from 'react'

function TodosComp(props) {
  const [adress, setAdress]  = useState([])
  
  


  return (
    <div >
    
         <br/>

         user id : { props.todo[0].userId}
         {
            
            props.todo.map(x => {
                return (
                    <div style = {{borderStyle: "solid" , marginBottom : 20}}>
                       <p>title : {x.title}</p>
                       <p>completed : {x.completed ? "true" : "false"}</p>
                       <input type="button" value = "completed"   onClick={() => props.callback( {title : x.title , id : props.todo[0].userId }) }/> 
                    </div>
                )
             })
         }
      
       <br/>
       <br/>

    </div>
  );
}

export default TodosComp;
