
import './App.css';
import axios from 'axios'
import UserChildCompoent from './DataUser'
import TodosComp from './TodosUser'
import PostsComp from './postData'
import AddTaskComp from './addTask'
import AddUserComp from './addUser'
import AddPostComp from './addPost'
import {useState,useEffect} from 'react'

function App(props) {
  const [dataUsers, setDataUsers]  = useState([])
  const [dataUsersfull, setDataUsersfull]  = useState([])
  const [deletItem , setDeleteItem] = useState(0)
  const [dataTodos, setDataTodos]  = useState([])
  const [dataPosts, setDataPosts]  = useState([])
  const [dataPost, setDataPost]  = useState([])
  const [dataTodo, setDataTodo]  = useState({})
  const [tasksCompleted, setTasksCompleted]  = useState({})
  const [showTodos, setshowTodos]  = useState(false)
  const [stateChanged, setstateChanged]  = useState(false)
  const [comeFrom , setcomeFrom] = useState(false)
  const [showAddUsers, setshowAddUsers]  = useState(false)
  const [showPosts, setshowPosts]  = useState(false)
  const [showAddPost, setShowAddPost]  = useState(false)
  const [showAddItem, setshowAddItem]  = useState(false)
  const [fromUpdate, setshowfromUpdate]  = useState(false)
  const [dataTemp, setDataTemp]  = useState({})
  const [IdUser, setId]  = useState(0)




  const updatedata = async(data) => {
     if(dataUsersfull.length > 0){
      let arr = dataUsersfull
      console.log(arr)
      let index = dataUsersfull.findIndex(x => x.id == data.id)
      console.log(index)
      let Data = {id: data.id , name : data.name , email : data.email , address : {city: data.city , street: data.street , zipcode : data.zipCode}}
      arr[index] =  Data
      setDataUsersfull([...arr])
     }
     let arr = dataUsers
     console.log(arr)
     let index = dataUsers.findIndex(x => x.id == data.id)
     let Data = {id: data.id , name : data.name , email : data.email , address : {city: data.city , street: data.street , zipcode : data.zipCode}}
     arr[index] =  Data
      setDataUsers([...arr])
  }

  const datatodo = async(id) => {
      if(showTodos){
        await setshowTodos(false)
        setshowPosts(false)
      }
      else  {
        let Posts = dataPosts.filter(x => x.userId == id)
        let todos = dataTodos.filter(x => x.userId == id)
        console.log(todos)
        await setDataPost([...Posts])
        await setDataTodo([...todos])
        await setshowPosts(true)
        await setshowTodos(true)
        await setshowAddUsers(false)
        setshowfromUpdate(false)
      }
    
  }

useEffect(() =>
{
      async function getData () {
      let users = await axios.get('https://jsonplaceholder.typicode.com/users')
      let Todos = await axios.get('https://jsonplaceholder.typicode.com/todos')
      let posts = await axios.get('https://jsonplaceholder.typicode.com/posts')
      
      await setDataPosts(posts.data)
      await setDataTodos(Todos.data)
      setDataUsers(users.data)
    }
    getData()
}, [])




const backtolist = () => {
  setshowAddUsers(false)
}


const completedTask = (data) => { 
  console.log(data.title)
  console.log(data.id)
  let arrTodos = dataTodos
  let items = arrTodos.filter(x => x.userId == data.id);
  let completedItems = items.filter(x => x.completed == true);
  console.log(items.length)
  let competed = completedItems.length + 1
  console.log(competed)
  if(items.length == competed){
    let completedTodos = {id :data.id, color : "green"}
    setTasksCompleted({...completedTodos})
  }
  else{
    let completedTodos = {id :data.id, color : "black"}
    setTasksCompleted({...completedTodos})
  }
  
 
  let index = arrTodos.findIndex(x => x.userId == data.id && x.title == data.title)
  console.log(index)
  arrTodos[index].completed = true
  setDataTodos([...arrTodos])
}

const bool = async() =>
{
  if(showTodos){
    await setshowTodos(false)
    setshowAddItem(true)
  }
}

const addnewUser = async() =>
{
  if(!showAddUsers){
    await setshowAddUsers(true) 
    await setshowPosts(false)
    setshowTodos(false)
  }

}

const SearchItems = async (data) => {
 if(data.length == 0){
    let datausers = dataUsersfull
    await setDataUsers(datausers)
    await setstateChanged(false)
    console.log(dataUsers)
 }
 else {
   if(!stateChanged){
    let UsersAll = [...dataUsers]
    setDataUsersfull(UsersAll)
    setstateChanged(true)
   }
   else{
   let filterUsers = dataUsers.filter(x => x.name.startsWith(data) || x.email.startsWith(data))
   await setDataUsers([...filterUsers])
   console.log(dataUsers)
   }
     
 }
}

const ShowPosts = async() =>
{
  if(showPosts){
    await setshowPosts(false)
    setShowAddPost(true)
  }

}

const addUser = async (data) => {
  console.log(data)
  let user = {id : dataUsers.length +1 ,name : data.name , email : data.email , address: { street: "bla" , city : "ashdod" , zipcode : 123 }}
  let users = [...dataUsers]
  users.push(user)
  await setDataUsers(users);
  await setshowAddUsers(false) 
}

const addPost = async(data) => { 
  let Data = {id : dataTodos.length +1 ,userId : data.userId , body : data.post.body , title : data.post.title }
  let NewPost = [...dataPosts]
  NewPost.push(Data)
  await setDataPosts([...NewPost])
  await setShowAddPost(false) 
  let PostsFilter = NewPost.filter(x => x.userId == data.userId)
  console.log(PostsFilter)
  await setDataPost([...PostsFilter])
  await setshowPosts(true)
}



const addItem = async(data) => { 
  let Data = {id : dataTodos.length +1 ,userId : data.userId , completed : false , title : data.task }
  let NewTodo = [...dataTodos]
  NewTodo.push(Data)
  await setDataTodos([...NewTodo])
  await setshowAddItem(false) 
  let todosFilter = NewTodo.filter(x => x.userId == data.userId)
  console.log(todosFilter)
  await setDataTodo([...todosFilter])
  console.log(NewTodo)
  let items = NewTodo.filter(x => x.userId == Data.userId);
  console.log(items)
  let completedItems = items.filter(x => x.completed == true);
  console.log(completedItems)
  let competed = completedItems.length 
  if(items.length == competed){
    let completedTodos = {id :Data.userId, color : "green"}
    setTasksCompleted({...completedTodos})  
  }
  else{
    let completedTodos = {id :Data.userId, color : "black"}
    setTasksCompleted({...completedTodos})
  }
  await setshowTodos(true)
}

    const deleteData = (id) => { 
    setDeleteItem(id)
    let arrData = dataUsers
    console.log(arrData)
    let index = arrData.find(x => x.id == id)
    let d = arrData.indexOf(index)
    if(dataUsersfull.length > 0){
      let arrDatafull = dataUsersfull
      let index = arrDatafull.find(x => x.id == id)
      let d = arrDatafull.indexOf(index)
      arrDatafull.splice(d,1);
      setDataUsersfull([...arrDatafull])
    }
    console.log(d)
    arrData.splice(d,1);
    setDataUsers([...arrData])
  }
 

  





  return (

    <div className="App" style = {{display : 'flex' , flexDirection : 'row'}}>
      
             <div >
             <span style = {{marginBottom : 100 ,marginLeft : 150}}><input style = { {marginLeft: "5px"} } placeholder = "Search User" onChange = {e => SearchItems(e.target.value)}></input>  <button style = { {marginLeft: "70px"} } onClick = {addnewUser}>Add user</button></span> 
              <div style = {{paddingTop : 20}}>
             {
                  
                  dataUsers.map(x => {
                    
                 
                  return (
                    <div>
                  <UserChildCompoent  key = {x.id} taskcomleted = {x.id == tasksCompleted.id ? {id : x.id , color : tasksCompleted.color } : {color:"black"}} callupdate = {(data) => updatedata(data)} todo = {dataTodo} callback={ (data) => deleteData(data) }  clltodos = {(data) => datatodo(data)} value = {x}/>
                    <br/>
                    </div>
                 
                    

                  ) 
              
              
                  }
                  
                 
                   )
                } 
                </div>
             </div>



                
                 <div style = {{marginLeft : 250  , width : 140}}>
                 {
            showTodos &&  <input type="button" value = "Add Task" onClick = {bool} />
             }
             {
               showAddUsers && <AddUserComp callbackCenele = {() => backtolist()} callback={ (data) => addUser(data) }/>
             }
             
             {
              showAddItem && <AddTaskComp value = {dataTodo} callback={ (data) => addItem(data) }/>
             }
             <br/>
                { 
              
                    showTodos && <TodosComp todo={dataTodo} callback={ (data) => completedTask(data) }/>  
                  }
                  </div>

                  <div style = {{ marginLeft : 200 ,width : 200}}>
                  {
                  showPosts &&  <input type="button" value = "Add Post" onClick = {ShowPosts} />
                     }
                     {
                       showAddPost && <AddPostComp value = {dataTodo} callback={ (data) => addPost(data) }/>
                     }
                    {
                    showPosts && <PostsComp post={dataPost} />
                    }
                  </div>
    </div>

  );
}

export default App;
