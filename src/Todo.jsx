import React from 'react'


export default class Todo extends React.Component {
clickme2(){
    console.log("onclick ",  this.props.onClick)
        this.props.onClick(this.props.id ,this.props.index)

}
Clicked(event){
    console.log("Val", event.target.value)
    this.props.onClick2(this.props.complete)
}

    render(){
        console.log(this.props)
        return  <div>
        <h1 className="list-group-item list-group-item-action list-group-item-info"><input type="checkbox" onChange={this.Clicked.bind(this)}/> {this.props.title}
        <img src="./images/2.png" onClick={this.clickme2.bind(this)} />
        
        </h1>
        </div>
    }
}