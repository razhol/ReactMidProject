
import './App.css';
import axios from 'axios'
import {useState,useEffect} from 'react'
import App from './App'
import {Switch, Route, Link} from 'react-router-dom'

function AddUserComp(props) {
  const [user, setUser]  = useState({})

  return (
    <div >
     
     name : <input type = "text"  onChange={(e) => setUser({...user,name : e.target.value})} ></input> <br/>
     email : <input type = "text"  onChange={(e) => setUser({...user,email : e.target.value})} ></input> <br/>
     <input type="button" value="Add" onClick={() => props.callback(user) } />
     <input type="button" value="Cancel" onClick={() => props.callbackCenele() } />

    </div>
  );
}

export default AddUserComp;