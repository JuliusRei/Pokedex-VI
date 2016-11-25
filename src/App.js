import React from 'react';
import head from './Pokemon.png';
import './App.css';
import Request from 'superagent'
import { Button } from 'react-bootstrap';
var Comment = React.createClass({

  render(){
    return(<div className = "leftclass col-xs-4" >
      <textarea className = "form-control" style = {{marginBottom: "1%"}} disabled></textarea>
      <button className = "btn btn-info">Save</button>
      </div>);
  }
});
var Detail = React.createClass({

  render(){
    var border ={
  border: "3px solid black",
  backgroundColor:"white",
  paddingTop:"3px"
};
 var type = this.props.types;
      if(type != ""){
        type = this.props.types.map((n)=> {return "/"+n.type.name + "/"});
      }
        else{
          type = "none";        }

    return(
          <div className = "leftclass col-xs-4" >
      <div className= "form-group">
      <div className = "col-xs-6" style = {border}>
      <img className = "sprite" src = {this.props.sprite}/><p>Original</p></div>
      <div className = "col-xs-6" style = {border}>
      <img className = "sprite" src = {this.props.shiny}/><p>Shiny</p></div></div>
      <div className = "col-xs-12" style = {border}>
      <p>Pokemon ID: #{this.props.id}</p>
      <p>Name: {this.props.name}</p>
      <p>Weight : {this.props.weight}</p>
      <p>Type: {type}</p>
      </div>
      </div>);
  }
});



var App = React.createClass({
getInitialState(){
  return {name : "",
          stat: "",
          id:'',
          pokemonname : "",
          type : ""
          }
},
handleInput(name){
  this.setState({name : name.target.value.toLowerCase()});
},
handleClick(){
var url = "http://pokeapi.co/api/v2/pokemon/"+this.state.name;
  Request.get(url).then((response)=>{
    this.setState({
      pokemonname:response.body.name,
      stat:response.body.weight,
      sprite:response.body.sprites.front_default,
      shiny:response.body.sprites.front_shiny,
      id:response.body.id,
      type: response.body.types
    });
  });

}, 
  render() {
var style = {
      backgroundColor: 'transparent',
     
    };

    return (
      
      <div className="App col-xs-12">

        <div className="App-header col-xs-12"><p> <img src = {head} className="head" /></p>
               </div>
             <div className="form-group leftclass  col-xs-4" style = {style}>
      <input value = {this.state.name}  className = "form-control" onChange = {this.handleInput} type = "text"/>
      <button onClick = {this.handleClick} className = "btn btn-circle btn-lg btn-warning"> Search</button>
      </div>
        <Detail name = {this.state.pokemonname} sprite = {this.state.sprite} 
        weight = {this.state.stat} shiny = {this.state.shiny}
        types = {this.state.type} id = {this.state.id}/>
        <Comment/>
      </div>
    );
  }
});

export default App;
