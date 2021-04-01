import React from 'react'


export default class Todo extends React.Component {
clickme2(){
    console.log("onclick ",  this.props.onClick)
    
        this.props.onClick(this.props.id )
        

}
Clicked(event){
    console.log("Val", this.props.todo)
    this.props.onClick2(this.props.todo , event)
}

    render(){
        let checkedClass="";
        if(this.props.complete){
            checkedClass="checked-item"
        }
       
        return  <div>
        <h1 className="list-group-item list-group-item-action list-group-item-info " ><span className={checkedClass}><input type="checkbox" checked={this.props.complete} onChange={this.Clicked.bind(this)}/> {this.props.title}</span>
        <img src="./images/3.png" style={{float:'right' ,width:"60px"}} onClick={this.clickme2.bind(this)} />
        </h1>
        
        </div>
    }
}