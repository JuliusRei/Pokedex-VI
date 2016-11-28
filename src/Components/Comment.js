
import React from 'react';
var Comment = React.createClass({

  render(){
  var comments = this.props.data.body
                      .filter((data)=> {return data.author === this.props.name})
                      .map((n)=>{return <div><p>{n.text}</p>
                        <a href = "#">User #{n.id}</a><hr/></div>});
    return(<div className="leftclass col-xs-4" >
      <h1  style={{color:"black"}}> Comment Area</h1>
      <textarea onChange = {this.props.onTextChange} className="form-control" style={{marginBottom: "1%"}}></textarea>
      <button onClick = {this.props.onSubmit} id="btnsave" className="btn btn-info"  >Leave a Comment</button>
      <div className="col-xs-12 commentArea" style={{color:"white"}} >{comments}</div>
      </div>);
  }
});

export default Comment;