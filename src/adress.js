
import './App.css';
import axios from 'axios'
import {useState,useEffect} from 'react'

function AdressComp(props) {
  const [adress, setAdress]  = useState({street: props.adress.street , city : props.adress.city, zipCode : props.adress.zipCode})
  
 
  useEffect(() =>
{
  setAdress({...adress, street: props.adress.street, city : props.adress.city ,  zipCode : props.adress.zipCode})
}, [])

  return (
    <div className="App">

       street : <input type = "text" value = {adress.street} onChange={(e) => setAdress({...adress, street : e.target.value}, props.callback({ street :e.target.value})) } ></input><br/>
       city : <input type = "text" value = {adress.city} onChange={(e) => setAdress({...adress, city : e.target.value}, props.callback({ city :e.target.value}))}></input><br/>
       zip code : <input type = "text" value = {adress.zipCode} onChange={(e) => setAdress({...adress, zipCode : e.target.value}, props.callback({ zipCode :e.target.value}))}></input>

    </div>
  );
}

export default AdressComp;
