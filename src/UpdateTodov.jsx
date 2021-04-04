import { computeHeadingLevel } from '@testing-library/dom';
import React from 'react'
import { HttpsReq } from './HttpRequest/HttpsReq'


function UpdateTodov (props){
    const [todo1, setTodo1] = React.useState({});
console.log("update todo" ,props)
React.useEffect(function(){
    if (props.value != undefined) {
    HttpsReq.get("todos/" + props.value).then((res)=>{
        setTodo1({...res.data})
    })
}

  }, [props.value]);
function changeTodo1(event){
    todo1.title =event.target.value
    setTodo1({...todo1})   
    console.log(event.target.value)
    

  }
 
  function onAdd1(){
  let singleTodo={
      title: todo1.title,
      
  }
  HttpsReq.patch('todos/' + props.value ,singleTodo).then((res)=>{
     
    
})

        
}
function todoValue(){
    props.onClick4(todo1)
}
function CancleCallBack(){
    props.onClick5()
    
}

   if (props.value==undefined){
       return null;
   }
   console.log(todo1)
   return <div class="form-group">
      <h5 >Name</h5>
      <input  type="text" value={todo1.title} onChange={changeTodo1}/><button type="button" class="btn btn-success" onClick={onAdd1 ,todoValue} >update</button><button type="button" class="btn btn-info" onClick={CancleCallBack}>cancle</button>
      </div>
    
        
       
  
}


export default UpdateTodov;