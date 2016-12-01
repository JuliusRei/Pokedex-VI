import React from 'react';
import head from './Pokemon.png';
import './App.css';
import Request from 'superagent';
import Comment from './Components/Comment.js';
import Detail from './Components/Detail.js';
import Search from './Components/Search.js';
import pokeball from './Pokeball.svg';
import Lucian from './Lucian.gif';
import Bertha from './Bertha.gif';
var App = React.createClass({
  getInitialState(){
    return {
    // For Searching Pokemon
    name : "",
    // For Viewing Pokemon
    id:'',
    pokemonName : "",
    stat: "",  
    sprite:"",
    shiny:"",
    isdisabled:true,
    stat2:"", type : [],
    abilities : [],
    // For Comment Handling
    comment:"",
    data:[],
    isSubmitted:false

  }
},
handleInput(name){
  this.setState({name : name.target.value.toLowerCase()});
},
handleClick(){
  var url = "http://pokeapi.co/api/v2/pokemon/"+this.state.name;

  Request.get(url)
  .end((err,response)=>{
   if (err || !response.ok) {
     alert(err);
     this.setState({
      isdisabled: true
    });
   } else {
    this.setState({
      pokemonName:response.body.name,
      stat:response.body.weight,
      stat2:response.body.height,
      sprite:response.body.sprites.front_default,
      shiny:response.body.sprites.front_shiny,
      id:response.body.id,
      type: response.body.types,
      abilities:response.body.abilities,
      isdisabled: false

    }); }
  })

}, 
handleCommentChange(e){
  this.setState({
    comment : e.target.value
  }); 
},
handleComment(){

  var url = 'http://localhost:3000/api/comments';
  Request.post(url)
  .send({author: this.state.pokemonName,
    text:this.state.comment,})
  .end(()=>{this.setState({
    comment : ""
  });
})

  
},
ReturnType(){
  var url = 'http://localhost:3000/api/comments';
  Request.get(url)
  .then((n)=>{
    this.setState({
      data : n
    })
  });
},


render() {
 this.ReturnType();
 return (

  <div className="App col-xs-12">

  <div className="App-header col-xs-12"><p> 
  
  <img src={Lucian} alt="header"  />
  <img src={pokeball} alt="header" className="App-logo" />
  <img src={head} alt="header" className="head" />
  <img src={pokeball} alt="header" className="App-logo2" />
  <img src={Bertha} alt="header" />
  </p>
  </div>
  <Search handleInput={this.handleInput} handleClick={this.handleClick}/>
  <Detail name={this.state.pokemonName} sprite={this.state.sprite} 
  weight={this.state.stat} shiny={this.state.shiny} ability={this.state.abilities}
  types={this.state.type} id={this.state.id} height={this.state.stat2}/>
  {this.state.isdisabled ? null : <Comment onTextChange={this.handleCommentChange} comment={this.state.comment}
  onSubmit={this.handleComment} data={this.state.data}
  name={this.state.pokemonName} isSubmitted={this.state.isSubmitted}
  />}

  </div>
  );
}
})

export default App;
