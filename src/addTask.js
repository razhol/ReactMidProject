
import './App.css';
import axios from 'axios'
import {useState,useEffect} from 'react'
import App from './App'
import {Switch, Route, Link} from 'react-router-dom'

function AddTaskComp(props) {
  const [task, setTaks]  = useState()

  return (
    <div >
     
     title : <input type = "text"  onChange={(e) => setTaks(e.target.value)} ></input> <br/>
     <input type="button" value="Add Task" onClick={() => props.callback({ userId: props.value[0].userId ,task :task}) } />

    </div>
  );
}

export default AddTaskComp;
