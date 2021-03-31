import axios from 'axios'
import React from 'react'
import Todo from './Todo'
import './todo.css'
import {HttpsReq} from './HttpRequest/HttpsReq'

export default class TodoList extends React.Component {

  state = {
    Users: [],
    complete: false,
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
      return <Todo index={i} key={this.props.id} complete={values.complete} id={values.id} title={values.title} onClick={this.ClickMe.bind(this)} onClick2={this.ClickMe2}/>
    })
  }
  CaptureValue(event) {
    console.log(event.target.value);
    this.setState({
      temptitle:event.target.value
    })
    console.log(this.state.Users)
  }
  ClickMe(value,i){
    console.log('ok',value.id)

   
    let temp =[...this.state.Users]
    
    HttpsReq.delete("todos/" + value).then((res) => {
         console.log(res.data);
        temp.splice(i,1)
         this.setState({
           Users:temp
         })
         
  })
    
  }
  ClickMe2=(value)=>{
    let newtodo = {
      
      complete:value
    }
    let user2 =this.state.Users
    if(value){
    HttpsReq.post("/todos", newtodo).then((res) => {
      console.log(res.data)
      user2.push(res.data)
      this.setState({
        users:user2,
        temptitle :""
      })
      
    })
  }
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

    return <h1><input type="text" placeholder="Add your new todo" value={this.state.temptitle} onChange={this.CaptureValue.bind(this)} />
      <img src="./images/1.png" onClick={this.updatebtn.bind(this)} /></h1>

  }
  render() {


    console.log(this.state)
    let count;
    if (this.state.Users.length > 0) {
      count = <p>You have {this.state.Users.length} pending value</p>
    }
    return <div className=" class2">
      <h1>TODO APP</h1>

      {this.Userdetails()}
      {count}
      <div class="list">

        {this.getList()}
      </div>

    </div>




  }
}
