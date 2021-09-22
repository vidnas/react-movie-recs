import React, { useState, useEffect } from 'react';
import './Card.css';
import'./SingleMovie.css';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Collection from './Collection';

function SingleMovie({match}){

    
  useEffect( () => {
        fetchMovie();             
    }, [] );

    const [singleMovie, setSingleMovie] = useState({});

    const fetchMovie = async () => {
        const fetchMovie = await fetch(
            `https://api.themoviedb.org/3/movie/${match.params.id}?api_key=898c53e4648c8d01605385c636421936&language=en,null&append_to_response=credits%2Cstars%2Cimages%2Cvideos%2Crecommendations`
        ).then((response) => response.json());
        
        const singleMovie = fetchMovie;
        setSingleMovie(singleMovie);
        console.log(singleMovie);
    };  



    if (singleMovie.images==null) {
      return <h1 className="loadingscreen">Loading...</h1>;
    }

    const posters = singleMovie.images.posters;
    const singleMoviePoster = "https://image.tmdb.org/t/p/w600_and_h900_bestv2"+singleMovie.images.posters[Math.floor(Math.random() * posters.length)].file_path;
    const posterURL = "https://image.tmdb.org/t/p/w600_and_h900_bestv2";

    
    if (singleMovie.genres==null) {
        return <h1 className="loadingscreen">Loading...</h1>;
    }

    if (singleMovie.recommendations==null) {
      return <h1 className="loadingscreen">Loading...</h1>;
    }    

    var backdrops = singleMovie.images.backdrops;
    var randomBackdrop = backdrops[Math.floor(Math.random() * backdrops.length)];

    const recs = singleMovie.recommendations.results;

    for (var i = 0; i < singleMovie.credits.crew.length; i++) {
      if (singleMovie.credits.crew[i].job === "Director" && singleMovie.credits.crew[i].department === "Directing") {
          singleMovie.director = singleMovie.credits.crew[i].name;
      } else {
      }
    }

    singleMovie.maincast = [];

    for(var j = 0; j < 4; j++){
      singleMovie.maincast.push(singleMovie.credits.cast[j].name + ", ");
    }

    function recsOpen() {
      document.getElementById('recsPanelFull').classList.toggle('open');

      const expanded = document.getElementById('recsPanelFull').classList.contains("open");
        
      if (expanded) {
          document.getElementById('recsButton').innerHTML = "Recommended Movies";
          document.getElementById('recsPanelFull').scrollIntoView({behavior: 'smooth'});
        } else {
          document.getElementById('recsButton').innerHTML = "See Recommended Movies";
        }      
    }

    return (
      <div
        className="singleMovieContainer"
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original${randomBackdrop.file_path}`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="singleMovieContent">
          <h1>{singleMovie.original_title}</h1>
          <div className="singleTagLine">"{singleMovie.tagline}"</div>
          <img
            width="600px"
            alt="movie poster"
            className="poster"
            src={singleMoviePoster}
                        
          />
          <div className="singleMovData">
            <table>
              <tbody>
                <tr>
                  <th>Released</th>
                  <td>{singleMovie.release_date}</td>
                </tr>
                <tr>
                  <th>Director</th>
                  <td>{singleMovie.director}</td>
                </tr>

                <tr>
                  <th>Cast</th>
                  <td>{singleMovie.maincast}</td>
                </tr>
                <tr>
                  <th>Genres</th>
                  <td>
                    {singleMovie.genres[0] ? singleMovie.genres[0].name : ""},{" "}
                    {singleMovie.genres[1] ? singleMovie.genres[1].name : ""},{" "}
                    {singleMovie.genres[2] ? singleMovie.genres[2].name : ""}
                  </td>
                </tr>
                <tr>
                  <th>Plot</th>
                  <td>{singleMovie.overview}</td>
                </tr>
                <tr>
                  <th>Links</th>
                  <td>
                    <a href={`https://www.imdb.com/title/${singleMovie.imdb_id}`}>IMDB, </a>
                    <a href={`https://www.rarbgtor.org/torrents.php?search=${singleMovie.imdb_id}&category%5B%5D=14&category%5B%5D=48&category%5B%5D=17&category%5B%5D=44&category%5B%5D=45&category%5B%5D=47&category%5B%5D=50&category%5B%5D=51&category%5B%5D=52&category%5B%5D=42&category%5B%5D=46&category%5B%5D=54`}>RARBG</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>         

          <div className="singleMovData">
          <Collection id={singleMovie.belongs_to_collection.id}/>
          </div>
          
          <div onClick={recsOpen}><h2 id="recsButton">See Recommended Movies</h2></div>
          <div className="recsPanel" id="recsPanelFull">
            {recs.map((rec, recIndex) => (
              <Link
                to={`/singlemovie/${singleMovie.recommendations.results[recIndex].id}`}
                key={singleMovie.recommendations.results[recIndex].id}
              >
                <div
                  className="singleRec"
                  key={singleMovie.recommendations.results[recIndex].id}
                >
                  <img
                    src={
                      posterURL +
                      singleMovie.recommendations.results[recIndex].poster_path
                    }
                    width="200px"
                  />
                  
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    );
                    

}



export default SingleMovie;