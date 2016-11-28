import React from 'react';
import head from './Pokemon.png';
import './App.css';
import Request from 'superagent';
import Comment from './Components/Comment.js';
import Detail from './Components/Detail.js';

var App = React.createClass({
  getInitialState(){
    return {name : "",
    stat: "",
    id:'',
    pokemonname : "",
    type : [],
    abilities : [],
    sprite:"",
    shiny:"",
    isdisabled:true,
    stat2:"",
    comment:"",
    data:[]

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
      pokemonname:response.body.name,
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
this.ReturnType();
}, 
handleCommentChange(e){
  this.setState({
    comment : e.target.value
  }); 
},
handleComment(){

  var url = 'http://localhost:3000/api/comments';
Request.post(url)
       .send({author: this.state.pokemonname,
        text:this.state.comment,})
       .end(alert('Comment Posted'))
       this.ReturnType();
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
  var style = {
    backgroundColor: 'transparent',

  };

  return (

    <div className="App col-xs-12">

    <div className="App-header col-xs-12"><p> <img src={head} alt="header" className="head" /></p>
    </div>
    <div className="form-group leftclass  col-xs-4" style={style}>
    <h1 style={{color:"black"}}> Search for a Pokemon</h1>
    <input value={this.state.name}  className="form-control" onChange={this.handleInput} type="text"/>

    <button onClick={this.handleClick} className="btn btn-circle btn-lg btn-danger" style={{marginTop:"3%"}}> Search</button>
    <div className="commentArea" style={{color:"white"}}>
    <h4>Pokedex Generation VI</h4><hr/>
    <p>This is Pokedex Gen VI, a portable search engine for searching your favorite pokemon</p>
    <p>Features:</p>

    - Search Engine<br/>
    - Pokemon Description<br/>
    - Comment Area <br/>

    </div>
    </div>
    <Detail name={this.state.pokemonname} sprite={this.state.sprite} 
            weight={this.state.stat} shiny={this.state.shiny} ability={this.state.abilities}
            types={this.state.type} id={this.state.id} height={this.state.stat2}/>
    {this.state.isdisabled ? null : <Comment onTextChange = {this.handleCommentChange}
              onSubmit = {this.handleComment} data = {this.state.data} name = {this.state.pokemonname}
            />}

    </div>
    );
}
});

export default App;
