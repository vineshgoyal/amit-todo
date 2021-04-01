import axios from 'axios'
import React from 'react'
import Todo from './Todo'
import './todo.css'
import {HttpsReq} from './HttpRequest/HttpsReq'

export default class TodoList extends React.Component {

  state = {
    Users: [],
   
    temptitle: "",
  }


  componentDidMount() {
    HttpsReq.get("/todos").then((res) => {
      
      this.setState(
        {
          Users:res.data
        })
    })

  }
  getList() {
    return this.state.Users.map((values, i) => {
      return <Todo todo={values} complete={values.complete} index={i} key={this.props.id} complete={values.complete} id={values.id} title={values.title} onClick={this.ClickMe.bind(this)} onClick2={this.ClickMe2} />
    })
  }
  CaptureValue(event) {
    console.log(event.target.value);
    this.setState({
      temptitle:event.target.value
    })
    console.log(this.state.Users)
  }
  ClickMe(value){
    console.log('ok',value)
    HttpsReq.delete("todos/" + value).then((res) => {
      console.log(res.data);   
})
    let index =null;
    let temp =[...this.state.Users]
  for(let i=0;i<this.state.Users.length;i++){
    if(this.state.Users[i].id==value){
     index =i;
     console.log(index)
     temp.splice(index,1)
     this.setState({
      Users:temp
    })
    break
    }
      
 
  }
    
  /*temp.splice(index,1)
  this.setState({
    Users:temp
  })*/
    
  }
  ClickMe2=(todo ,event)=>{
    console.log(event.target.checked)
   let checked=event.target.checked
   HttpsReq.patch("todos/" + todo.id , {complete : checked}).then((res)=>{
     console.log(todo.id)
    let todoList=[...this.state.Users];
    let index =null;
    for(let i=0;i<this.state.Users.length;i++){
     if(this.state.Users[i].id==todo.id){
      index =i;
      console.log(index)
      this.state.Users[index].complete=checked
      this.setState(this.state)
    }
    
   }
   })
  }
  updatebtn() {

    let newtodo = {
      title: this.state.temptitle,
      complete:false
    }
    let user =this.state.Users

    if (this.state.temptitle !== "") {
      
      HttpsReq.post("/todos", newtodo).then((res) => {
        console.log(res.data)
        user.push(res.data)
        this.setState({
          users:user,
          temptitle :""
        })
        
      })

    }

  }

  Userdetails() {

    return <div>
    <h1>
      <input type="text" placeholder="Add your new todo" value={this.state.temptitle} onChange={this.CaptureValue.bind(this)} />
      <img src="./images/4.png" style={{float:"right" , width:"60px"}} onClick={this.updatebtn.bind(this)} />
      </h1>
      </div>

  }
  render() {

       let button;
       if(this.state.temptitle!=undefined){
         button =<button className="btnclass">Clear All</button>
       }
    console.log(this.state)
    let count;
    if (this.state.Users.length > 0) {
      count = <p>You have {this.state.Users.length} pending value</p>
    }
    return <div className=" class2">
      <div className="class3">
      <h1>TODO APP</h1>

      {this.Userdetails()}
      {count}
      <div class="list">

        {this.getList()}
        
      </div>
      <div >{button}</div>
      </div>
    </div>




  }
}
