
import React from 'react';
import head from './Pokemon.png';
import './App.css';
import Request from 'superagent';

var Comment = React.createClass({
  
  render(){
    
    return(<div className = "leftclass col-xs-4" >
      <h1  style = {{color:"black"}}> Comment Area</h1>
      <textarea className = "form-control" style = {{marginBottom: "1%"}}></textarea>
      <button id = "btnsave" className = "btn btn-info" onClick= {this.handleClick} >Leave a Comment</button>
      <div className = "col-xs-12 commentArea" style ={{color:"white"}} ></div>
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
var abilities = this.props.ability;
var type = this.props.types;
      if(type !== ""){
        type = this.props.types.map((n)=> {return "/"+n.type.name + "/"}); 
        abilities = this.props.ability.map((n)=> {return "/"+n.ability.name + "/"});
      }
        else{
          type = "-"; 
          abilities = "-";         }

    return(
          <div className = "leftclass col-xs-4" >
          <h1 style = {{color:"black"}}> Pokemon Descripton</h1>
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
      <p>Abilities: {abilities}</p>
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
          type : "",
          abilities : "",
          sprite:"",
          shiny:"",
          isdisabled:"true"

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
      type: response.body.types,
      abilities:response.body.abilities,
      isdisabled: "false"
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
             <h1 style = {{color:"black"}}> Search for a Pokemon</h1>
      <input value = {this.state.name}  className = "form-control" onChange = {this.handleInput} type = "text"/>

      <button onClick = {this.handleClick} className = "btn btn-circle btn-lg btn-danger" style = {{marginTop:"3%"}}> Search</button>
      <div className = "commentArea" style ={{color:"white"}}>
      <h4>Pokedex Generation VI</h4><hr/>
      <p>This is Pokedex Gen VI, a portable search engine for searching your favorite pokemon</p>
      <p>Features:</p>
      
      - Search Engine<br/>
      - Pokemon Description<br/>
      - Comment Area <br/>
      
      </div>
      </div>
        <Detail name = {this.state.pokemonname} sprite = {this.state.sprite} 
        weight = {this.state.stat} shiny = {this.state.shiny} ability = {this.state.abilities}
        types = {this.state.type} id = {this.state.id}/>
        <Comment isdisabled = {this.state.disabled}/>

      </div>
    );
  }
});

export default App;
