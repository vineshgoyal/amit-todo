import React from 'react'
import Todo from './Todo'
import './todo.css'
import { HttpsReq } from './HttpRequest/HttpsReq'
import UpdateTodov from "./UpdateTodov"

function Todolist() {
  const [todoList, setTodoList] = React.useState([]);
  const [todo, setTodo] = React.useState("");
  const [tempData, tempfunc] = React.useState({})
  const [check, setCheck] = React.useState(false);
  const [error, setError] = React.useState(null);

  function changeTodo(event) {
    setTodo(event.target.value)
    setError(null)


  }

  function onAdd() {
    if(error===null ){
      setError("Please enter new todo")
    }
   
    let singleTodo = {
      title: todo,
      complete: false
    }
    if (todo !== "") {
    HttpsReq.post("todos", singleTodo).then((res) => {
      todoList.push(res.data);
      setTodoList([...todoList]);
      setTodo("");
    })
  }
  }
  console.log(todo)
  let hasAnyCompletedTodo=( todoList )=>{
    const newTodos = todoList.filter( (singleTodo)=>{
      return singleTodo.complete  === true; 
    } );
      if(newTodos.length > 0){
        return true;
      }else {
        return false;
      }
  }
  React.useEffect(function () {
    HttpsReq.get("/todos").then((res) => {
      const checked = hasAnyCompletedTodo(res.data);
    setTodoList(res.data)
      setCheck(checked)
    })

  }, [])

  // React.useEffect(function () {
  //   HttpsReq.get("todos").then((res) => {
  //     setTodoList([...res.data])
  //   })
  // }, [])
  let deleteTodo = (value) => {

    HttpsReq.delete("todos/" + value).then((res) => {
      let index = null;
      let temp = [...todoList]
      for (let i = 0; i < todoList.length; i++) {
        if (todoList[i].id === value) {
          index = i; break;      //to get the index value we use for loop
        }

      }
      temp.splice(index, 1)
      setTodoList([...temp])
    })


  }
  let checkBoxUpdate = (todo, event) => {
    console.log(todo)
    let checked = event;

    HttpsReq.patch('todos/' + todo.id, { complete: checked }).then((res) => {
      let temp = [...todoList]
      let index = null;
      for (let i = 0; i < todoList.length; i++) {
        if (todoList[i].id === todo.id) {
          index = i; break
        }

      }
      console.log(index)
      temp[index].complete = checked;
      setTodoList(temp)

    })

  }
  let selectAllbtn=()=>{
   
  

    let temp = [...todoList]
    for (let i = 0; i < todoList.length; i++) {
    
      HttpsReq.patch("/todos/" + todoList[i].id , {complete:!check})

    temp[i].complete= !check
    }
 setTodoList( temp)
 setCheck(!check)
 
 
  }
  let ClearALLbtn = () => {
    
    let index = null;
    for (let i = 0; i < todoList.length; i++) {
      console.log(index)

      HttpsReq.delete("/todos/" + todoList[i].id)


    }
    setTodoList([])
  }
  
  let editNow = (id, todo) => {
    console.log(id)
    tempfunc({ ...todo })
  }
  let get = todoList.map((values, i) => {
    return <Todo todo={values} key={values.id}  index={i} complete={values.complete} id={values.id} title={values.title} onClick={deleteTodo} onClick2={checkBoxUpdate} onClick3={editNow} />
  })
  let button = "";
  let select = "";

  if (todoList.length > 0) {
    button = <button className="btnclass" onClick={ClearALLbtn}>Clear All</button>
    if(check === false){
      select = <button className="btnclass" onClick={selectAllbtn}>Select All</button>
    }else {
      select = <button className="btnclass" onClick={selectAllbtn}>Unselect All</button>

    }
  

  }
  let updateUi=(todo)=>{
    console.log("update Ui ",todo)

    let singleTodo ={
      title:todo.title
    }
    HttpsReq.patch('todos/' + todo.id ,singleTodo).then((res)=>{
      let temp = [...todoList]
      let index =null;
      for(let i=0;i<todoList.length;i++){
        if(todoList[i].id === todo.id){
          index =i ; break
        }
      }
      temp[index].title=todo.title
      setTodoList(temp);
    })
    
    
    
  }
  let Canclebutton=()=>{
    console.log("cancle Ui ")
    tempfunc({})
    
  }
  let count;
    if (todoList.length > 0) {
      count = <p>You have {todoList.length} pending value</p>
    }
  return <div className="container">
    <div className="class2">
      <h1>TODO LIST</h1>
      <h3>

        <input  type="text" placeholder="Add your new todo" value={todo} onChange={changeTodo} />
        <img src="./images/4.png" alt="image4" style={{ width: "60px" }} onClick={onAdd} />
      </h3>
      <p className="text-danger">{error}</p>
      {count}
      {get}
      {button}{select}

      <UpdateTodov value={tempData.id} onClick4={updateUi} onClick5={Canclebutton}/>

    </div>
  </div>

}

export default Todolist;

