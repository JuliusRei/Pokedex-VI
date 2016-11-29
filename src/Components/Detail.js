import React from 'react'; 
import Gyarados from './../Hidden/gyarados.gif';
import Pika from './../Hidden/pikachu.gif';
var border={
      border: "3px solid black",
      backgroundColor:"white",
      paddingTop:"3px"
    };
var Original = React.createClass({
  render() {return (
        <div className="col-xs-6" style={border}>
        <img alt="default" className="sprite" src={this.props.sprite}/><p>Original</p>
        </div>);}
});
var Shiny = React.createClass({
  render(){return (
        <div className="col-xs-6" style={border}>
        <img alt="shiny" className="sprite" src={this.props.shine}/><p>Shiny</p>
        </div>);}
});




var Detail = React.createClass({

  render(){
   
      var gya;
      {this.props.name === "gyarados" ?gya = Gyarados : this.props.name === "pikachu"? gya = Pika :gya = this.props.sprite}
  
      const type = this.props.types.map((n)=> {return "/"+n.type.name + "/"}); 
      const abilities = this.props.ability.map((n)=> {return "/"+n.ability.name + "/"});
  

      return(
        <div className="leftclass col-xs-4">
        <h1 style={{color:"black"}}> Pokemon Descripton</h1>
        <div className="form-group">
        <Original sprite = {gya}  />
        <Shiny shine = {this.props.shiny}  />
        </div>
        <div className="col-xs-12" style={border}>
        <p>Pokemon ID: #{this.props.id}</p>
        <p>Name: {this.props.name}</p>
        <p>Height : {this.props.height}</p>
        <p>Weight : {this.props.weight}</p>
        <p>Type: {type}</p>
        <p>Abilities: {abilities}</p>
        </div>
        </div>);
    }
  });


export default Detail;