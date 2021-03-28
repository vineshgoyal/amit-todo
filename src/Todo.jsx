import React from 'react'


export default class Todo extends React.Component {



    render(){
        return <h1 className="list-group-item list-group-item-action list-group-item-info">{this.props.user}<img src="./images/2.png"  /></h1>
    }
}