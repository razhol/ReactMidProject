
import './App.css';
import axios from 'axios'
import AdressComp from './adress'
import {useState,useEffect} from 'react'

function UserChildCompoent(props) {
  const [dataUser, setDataUser]  = useState({id : props.value.id ,name:props.value.name , email : props.value.email,street: props.value.address.street , city : props.value.address.city, zipCode : props.value.address.zipCode})
  const [showAdress, setShowAdress] = useState(false)
  const [showTodos, setShowTodos] = useState(false)
  const [showColor, setShowColor] = useState(false)
  const [booleanArr, setbooleanArr] = useState([])
  const [bordercolor, setbordercolor] = useState("blue")
  const [Color, setColor] = useState("white")


  const get = async() => {
    await props.clltodos(props.value.id)
    await getColor()
  }

  const getColor = async() =>{
    if (showColor ) {
      await setShowColor(false)
      setColor("white")
    }
    else{
      await setShowColor(true)
      setColor("orange")
    }
  }

  const getUserAdress = () =>{
    if (showAdress ) {
      setShowAdress(false)
    }
    else{
      setShowAdress(true)
    }
  }

  const sendData = (e) =>  {
    e.preventDefault();
}

const showListTodos = () => {
  if(showTodos){
    setShowTodos(false)
  }
  else{
    setShowTodos(true)
  }

}

const saveState = (data) =>  {
  if(data.city){
    setDataUser({...dataUser, city : data.city})
  }
  else if(data.street){
    setDataUser({...dataUser, street : data.street})
  }
  else if(data.zipCode){
    setDataUser({...dataUser, zipCode : data.zipCode})
  }
}


useEffect(() =>{
  if(props.taskcomleted.color == "green"){
    setbooleanArr([...booleanArr, props.taskcomleted])
  }
} , [props.taskcomleted]
  )


useEffect(() =>
{


   setDataUser({...dataUser, name: props.value.name, email : props.value.email ,street: props.value.address.street , city : props.value.address.city, zipCode : props.value.address.zipcode })


}, [])
 
 


  return (
    <div style= {  {borderStyle: "solid" , borderColor:  booleanArr.find(x => x.id == props.value.id) != null ? "green" : "black" , width: "300px" , marginLeft: "40%", backgroundColor: Color } }>
      <div >
        <p onClick = {get }>ID : {props.value.id}</p> <br/>
       
       Email : <input value = {dataUser.email} onChange ={e => setDataUser({...dataUser, email : e.target.value})} type = "text" ></input> <br/>
       Name : <input value = {dataUser.name} onChange ={e => setDataUser({...dataUser, name : e.target.value})} type = "text" ></input> <br/>
       {
       showAdress && <AdressComp callback={ (data) => saveState(data)} adress={dataUser} />  
      
       }
        </div >
       <input type="button" value = "update"   onClick={() => props.callupdate(dataUser) }/> 
       <input type="button" value = "delete" onClick={() => props.callback(props.value.id)}/>
       <input type="button" value="show data"  onClick= { getUserAdress } /> <br/>
      
            
    </div>
  );
}

export default UserChildCompoent;
