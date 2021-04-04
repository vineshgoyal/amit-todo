import React from 'react'
import UpdateTodov from "./UpdateTodov"

function  Todo (props) {


        let daleteTodo1=()=>{
            props.onClick(props.id)
            console.log("delete" ,props)
        }
        let checkboxF1=(event)=>{
            props.onClick2(props.todo ,event.target.checked)

        }
        
        console.log(props)
        let decorationClass="";
        if(props.complete==true) {
            decorationClass="workdone"

        }
    let editbtn=()=>{
        props.onClick3(props.id ,props.todo)
    }
        
        return  <div>
            
        <h1 className="list-group-item list-group-item-action list-group-item-info " ><span className={decorationClass}><input type="checkbox" checked={props.complete} onChange={checkboxF1} /> {props.title}</span>
        <img src="./images/3.png" style={{float:'right' ,width:"60px"}} onClick={daleteTodo1} /> <button type="button" class="btn btn-primary" onClick={editbtn}>Edit</button>
    
        </h1>
        
        </div>
    
}
export default Todo;