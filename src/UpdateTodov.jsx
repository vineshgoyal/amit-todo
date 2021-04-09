import React from 'react'
import { HttpsReq } from './HttpRequest/HttpsReq'


function UpdateTodov (props){
    const [todo1, setTodo1] = React.useState({title:""});
console.log("update todo" ,props)
React.useEffect(function(){
    if (props.value !== undefined) {
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
 
// //   function onAdd1(){
// //   let singleTodo={
// //       title: todo1.title,
      
// //   }
// //   HttpsReq.patch('todos/' + props.value ,singleTodo).then((res)=>{
     
    
// // })

        
// }
function todoValue(){
    props.onClick4(todo1)
}
function CancleCallBack(){
    props.onClick5()
    
}

   if (props.value=== undefined){
       return null;
   }
   console.log(todo1)
   return <div>
  
      <div className="form-group"><input className="form-control" type="text" placeholder="Update todo" value={todo1.title} onChange={changeTodo1}/>
      <button type="button" className="btn btn-success" onClick={ todoValue} >update</button>  &nbsp;  
      <button type="button" className="btn btn-info" onClick={CancleCallBack}>cancle</button></div>
      </div>
    
        
       
  
}


export default UpdateTodov;