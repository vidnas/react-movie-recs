import React, { Component } from 'react';
import './Card.css';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';

class MovieCard extends Component {

    constructor(props) {
      super(props);
      this.state = { };
      
    }

    backdropPath = this.props.movie.backdrop_path 
    

    render(){       

        return (
            <Link to={`/singlemovie/${this.props.movie.id}`}>            
            <div className="cardContainer" style={{
                backgroundImage:`url("https://image.tmdb.org/t/p/original${this.backdropPath}")`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
            }}>
            
                <div className="cardContent">

                    <div className="moviePoster">
                        <img width="250px" alt="movie poster" className="poster" src={this.props.movie.poster_src}/>
                    </div>
                    
                    <div className="movieInfo">
                        <h2 className="movTitle">{this.props.movie.title} ({this.props.movie.release_date ? this.props.movie.release_date.substring(0,4):""})</h2>
                        <div className="titleUnderStrap">
                            {this.props.extras.genres[0]?this.props.extras.genres[0].name:""}
                            {this.props.extras.genres[1]?this.props.extras.genres[1].name:""}
                            {this.props.extras.genres[2]?this.props.extras.genres[2].name:""}<br/>
                        </div>                        
                        <div className="movData"><p>{this.props.movie.overview}</p></div>
                        
                    </div>

                </div>               

            </div>
            </Link>
            
        );
    }
}

export default MovieCard;