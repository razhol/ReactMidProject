
import './App.css';

function PostsComp(props) {
  
  


  return (
    <div >
    
         <br/>

         user id : { props.post[0].userId}
         {
            
            props.post.map(x => {
                return (
                    <div style = {{borderStyle: "solid" , marginBottom : 20}}>
                       <p>title : {x.title}</p>
                       <p>body : {x.body}</p> 
                    </div>
                )
             })
         }
      
       <br/>
       <br/>

    </div>
  );
}

export default PostsComp;
