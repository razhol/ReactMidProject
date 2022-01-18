
import './App.css';
import axios from 'axios'
import {useState,useEffect} from 'react'
import App from './App'
import {Switch, Route, Link} from 'react-router-dom'

function AddPostComp(props) {
  const [post, setPost]  = useState({})

  return (
    <div >
     
     title : <input type = "text"  onChange={(e) => setPost({...post,title : e.target.value})} ></input> <br/>
     body : <input type = "text"  onChange={(e) => setPost({...post, body: e.target.value})} ></input> <br/>
     <input type="button" value="Add Post" onClick={() => props.callback({ userId: props.value[0].userId ,post : post}) } />

    </div>
  );
}

export default AddPostComp;
