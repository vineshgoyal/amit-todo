
import React from 'react'
import Todo from './Todo'
import './todo.css'
import {HttpsReq} from './HttpRequest/HttpsReq'
import  UpdateTodo from './UpdateTodo'

export default class TodoList extends React.Component {

  state = {
    todos: [],
   
    temptitle: "",
    edittitle:"",
    
    check:false,
    error:null
  }

  hasAnyCompletedTodo( todoList ){
    const newTodos = todoList.filter( (singleTodo)=>{
      return singleTodo.complete  === true; 
    } );
      if(newTodos.length > 0){
        return true;
      }else {
        return false;
      }
  }
  componentDidMount() {
    HttpsReq.get("/todos").then((res) => {
      const checked = this.hasAnyCompletedTodo(res.data);
      this.setState(
        {
          todos:res.data,
          check: checked
        })
    })

  }

  getList() {
    return this.state.todos.map((values, i) => {
      return <Todo todo={values} complete={values.complete} key={i}   id={values.id} title={values.title} onClick={this.ClickMe.bind(this)} onClick2={this.ClickMe2} onClick6={this.editNow.bind(this)}/>
    })
  }
  CaptureValue(event) {
    console.log(event.target.value);
    this.setState({
      temptitle:event.target.value
    })
    console.log(this.state.todos)
  }
  ClickMe(value){
    console.log('ok',value)
    HttpsReq.delete("todos/" + value).then((res) => {
      console.log(res.data);   
      let index =null;
      let temp =[...this.state.todos]
    for(let i=0;i<this.state.todos.length;i++){
      if(this.state.todos[i].id===value){
       index =i; break
       
    
      }
    }
      temp.splice(index,1)
      this.setState({
       todos:temp
     })
        
   
  
})
   
    
  /*temp.splice(index,1)
  this.setState({
    todos:temp
  })*/
    
  }
  ClickMe2=(todo ,event)=>{
    
    console.log(event.target.checked)
   let checked=event.target.checked
   HttpsReq.patch("todos/" + todo.id , {complete : checked}).then((res)=>{
     console.log(todo.id)
    let todoList=[...this.state.todos];
    let index =null;
    for(let i=0;i<this.state.todos.length;i++){
     if(this.state.todos[i].id===todo.id){
      index =i;
      console.log(index)
      todoList[index].complete=checked
      this.setState({
        ...this.state,
        todoList
      });
      break;
    }
    
   }
   })
   
  }
  updatebtn() {
    if(this.state.error===null){
      this.setState({
        error:"Please enter new todo"
      })
    }

    let newtodo = {
      title: this.state.temptitle,
      complete:false
    }
    let user =this.state.todos

    if (this.state.temptitle !== "") {
      
      HttpsReq.post("/todos", newtodo).then((res) => {
        console.log(res.data)
        user.push(res.data)
        this.setState({
          todos:user,
          temptitle :""
        })
        
      })

    }

  }
editNow(todoedit){
  this.setState({
    ...this.state.todos,
    edittitle:{...todoedit}
  })
  console.log(todoedit)
}
  Userdetails() {

    return <div>
    <h1>
      <input type="text" placeholder="Add your new todo" value={this.state.temptitle} onChange={this.CaptureValue.bind(this)} />
      <img src="./images/4.png" alt="image4" style={{float:"right" , width:"60px"}} onClick={this.updatebtn.bind(this)} />
      </h1>
      </div>

  }

  clearAllBtn(){
  
    for(let i=0;i<this.state.todos.length;i++){
      HttpsReq.delete("/todos/" + this.state.todos[i].id).then((res)=>{
        console.log("clear",this.state.todos)
      })
     
    }
    this.setState({    //we cant empty all array like this.setState([])
      todos:[]
    })

  }
  updateUi=(todo)=>{
    console.log("update Ui ",todo)
    let singleTodo={

      title: todo.title
    }
    let todoList=[...this.state.todos]
if(todo.id!==undefined){
    HttpsReq.patch('todos/' +todo.id ,singleTodo).then((res)=>{
      let temp=[...this.state.todos]
      console.log(temp)
      let index =null;
      for(let i=0;i<this.state.todos.length;i++){
        if(this.state.todos[i].id ===todo.id){
          index =i ; break 
        }                                              // not working in forloop
        
      }
    
      todoList[index].title=todo.title
      this.setState({
        todoList
      })
    })
  }
}
  selectAllbtn(){
    let temp =[...this.state.todos]
    console.log(this.state.check)
    
    for(let i=0;i<this.state.todos.length;i++){
      
      HttpsReq.patch("todos/" + this.state.todos[i].id , {complete:!this.state.check})
      temp[i].complete=!this.state.check
    
    
    }
      
    let checked=!this.state.check
    // this.state.todos= temp
    this.setState({
      check:checked,
      todos:temp
    })

  }

  Canclebutton=()=>{
    console.log("cancle Ui ")
   // this.state.edittitle={}
  this.setState({
    ...this.state.todos,
    edittitle:{}
  })


  }
  render() {

       let button;
       let select;
       if(this.state.temptitle.length!==undefined){
         button =<button className="btn btn-warning" onClick={this.clearAllBtn.bind(this)}>Clear All</button>
         if(this.state.check === false ){
          select = <button className="btn btn-primary" onClick={this.selectAllbtn.bind(this)}>Select All</button>
        }else {
          select = <button className="btn btn-primary" onClick={this.selectAllbtn.bind(this)}>Unselect All</button>
    
        }
       }
    console.log(this.state)
    let count;
    if (this.state.todos.length > 0) {
      count = <p>You have {this.state.todos.length} pending value</p>
    }
    return <div className=" class2">
      <div className="class3">
      <h1>TODO APP</h1>
      
      {this.Userdetails()}
      <p class="text-danger">{this.state.error}</p>
      {count}
      <div className="list">

        {this.getList()}
        
      </div>
      <div >{button} {select}</div>
     <div> <UpdateTodo  todoid= {this.state.edittitle.id} onClickHandler={this.updateUi} onClickCancle={this.Canclebutton} /></div>
      </div>
    </div>




  }
}
