import React from 'react'

function  Todo (props) {

        let daleteTodo1=()=>{
            props.onClick(props.id)
            console.log(props)
        }
        let checkboxF1=(event)=>{
            props.onClick2(props.todo ,event.target.checked)

        }
        
        console.log(props)
        let decorationClass="";
        if(props.complete==true) {
            decorationClass="workdone"

        }
        
        return  <div>
            
        <h1 className="list-group-item list-group-item-action list-group-item-info " ><span className={decorationClass}><input type="checkbox" checked={props.complete} onChange={checkboxF1} /> {props.title}</span>
        <img src="./images/3.png" style={{float:'right' ,width:"60px"}} onClick={daleteTodo1} />
        </h1>
        
        </div>
    
}
export default Todo;