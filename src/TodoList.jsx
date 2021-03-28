import React from 'react'
import Todo from './Todo'
import './todo.css'

export default class TodoList extends React.Component{

    state = {
        title: [],
        condition: true,
        temptitle :"",
        count :"0"
        
    }
    CaptureValue(event){
        console.log(event.target.value);
        this.state.temptitle =event.target.value
        this.setState(this.state)
    }
    getList=()=>{
        return this.state.title.map((values,i)=>{
            
    
            return <Todo   key={i}  user={values}/>
    
        })
       
    }
    updatebtn(){
    
       this.state.title.push(this.state.temptitle)
        this.state.temptitle=""
        this.state.count++
        this.setState(this.state)
    }

    Userdetails() {

        return  <h1><input type="text" placeholder="Add your new todo" value={this.state.temptitle} onChange={this.CaptureValue.bind(this)}  />
        <img src="./images/1.png"  onClick={this.updatebtn.bind(this)} /></h1>
        
    }
    render(){
        
      
console.log(this.state.title)

        return <div class=" class2">
            <h1>TODO APP</h1>
            
            {this.Userdetails()}
            You have {this.state.count} pending items
            <div class="list">
           
             {this.getList()}
             </div>
             
            </div>
            
            

        
    }
}
