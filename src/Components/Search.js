import React from 'react';

var Search = React.createClass({
	handleKeyPress(target) {
    if(target.charCode==13){
            this.props.handleClick();    
    }

},
	render() {
		 var style = {
    backgroundColor: 'transparent',

  };
		return(    <div className="form-group leftclass  col-xs-4" style={style}>
    <h1 style={{color:"black"}}> Search for a Pokemon</h1>
    <input  onKeyPress={this.handleKeyPress} className="form-control" onChange={this.props.handleInput} type="text"/>

    <button onClick={this.props.handleClick} className="btn btn-circle btn-lg btn-danger" style={{marginTop:"3%"}}> Search</button>
    <div className="commentArea" style={{color:"white"}}>
    <h4>Pokedex Generation VI</h4><hr/>
    <p>This is Pokedex Gen VI, a portable search engine for searching your favorite pokemon</p>
    <p>Features:</p>

    - Search Engine<br/>
    - Pokemon Description<br/>
    - Comment Area <br/>

    </div>
    </div>);
	}

});
export default Search;