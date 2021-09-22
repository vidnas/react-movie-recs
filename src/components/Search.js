import React, {Component} from 'react';
import './Search.css';

class MovieSearch extends Component{
  constructor(props) {
    super(props);
    this.state = { };
  }

  render(){
    return (
      <div className="MovieSearch">
        <form className="searchbox">
        <input
          type="text"
          placeholder="type in your movie"
        />
        </form>
      </div>
    );
  }
}

export default MovieSearch;