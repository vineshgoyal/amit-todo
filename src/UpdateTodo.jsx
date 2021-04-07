import React from 'react'
import {HttpsReq} from './HttpRequest/HttpsReq'



export default class UpdateTodo extends React.Component{
    state = {
        todo:{}
    }


    shouldComponentUpdate(props){
        console.log(props)
        if(props.todoid!==undefined && props.todoid !== this.state.todo.id ){
            HttpsReq.get("todos/" + props.todoid).then((res)=>{
                this.setState({
                    todo:{...res.data}     //({todo:[{...res.data}]})
                })
                    console.log(res.data)
            })
        }
        return true

    }    
    CaptureValue=(event)=> {
        let Name = { ...this.state.todo, title: event.target.value }
        this.setState({
            todo:Name
        })
}
        //  this.state.todo.title = event.target.value
        //  this.setState(this.state)  
        // console.log(event.target.value)
        
      
//  addMe=()=>{

//     let singleTodo={
//         title:this.state.todo.title
//     }
//     HttpsReq.patch('todos/' + this.props.value ,singleTodo).then((res)=>{
     
    
//     })
//     console.log(singleTodo)
//  }

 UpdateUi1=()=>{
     

    this.props.onClickHandler(this.state.todo)
    
 }
 CancleUi=()=>{
     this.props.onClickCancle();

 }
    render(){
console.log(this.state.todo)
if(this.props.todoid===undefined){
    return null;
}
else {
        return <div>

            {this.state.todo.title}
            <h3>Name</h3>
            <input type="text" value={this.state.todo.title} onChange={this.CaptureValue}/>
            <button onClick={this.UpdateUi1} className="btn btn-dark">update</button>
            <button className="btn btn-info"onClick={this.CancleUi}>cancle</button>
        </div>
    }
    
}
}