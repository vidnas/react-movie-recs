import React, { Component } from "react";
import "./App.css";
import "./components/Search.css";
import MovieCard from "./components/Card";
import SingleMovie from "./components/SingleMovie";
import $ from "jquery";
import { BrowserRouter, Switch, Route } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.performSearch("Hellraiser");

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  performSearch(searchTerm) {
    const urlString =
      "https://api.themoviedb.org/3/search/movie?api_key=898c53e4648c8d01605385c636421936&query=" +
      searchTerm;
    $.ajax({
      url: urlString,
      success: (searchResults) => {
        const results = searchResults.results;
        results.sort(
          (a, b) => parseFloat(a.release_date) - parseFloat(b.release_date)
        );
        const bgonlyresults = results.filter(
          (bgpresent) => bgpresent.backdrop_path != null
        );

        var movieRows = [];

        bgonlyresults.forEach((movie) => {
          var extras = [];

          const extrasURL =
            "https://api.themoviedb.org/3/movie/" +
            movie.id +
            "?api_key=898c53e4648c8d01605385c636421936&language=en-US&append_to_response=credits%2Cstars";

          $.ajax({
            url: extrasURL,
            data: null,
            dataType: "json",
            async: false,
            success: function (data) {
              extras = data;
            },
          });

          movie.poster_src = "https://image.tmdb.org/t/p/w600_and_h900_bestv2" + movie.poster_path;

          const movieRow = (
            <MovieCard key={movie.id} movie={movie} extras={extras} />
          );
          movieRows.push(movieRow);
        });

        this.setState({ rows: movieRows });
      },

      error: (xhr, status, err) => {
        console.error("failed to fetch tmdb data");
      },
    });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    const searchTerm = this.state.value;
    this.performSearch(searchTerm);

    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/" exact>
        <a href="/">
          <h1>Search the Library</h1>
        </a>
        
              <div className="MovieSearch">
                <form className="searchBox" onSubmit={this.handleSubmit}>
                  <input
                    type="text"
                    placeholder="type in your movie"
                    className="textInput"
                    onChange={this.handleChange}
                  />
                </form>
              </div>

              {this.state.rows}
            </Route>
            <Route path="/singlemovie/:id" render={(props) => <SingleMovie {...props} key={props.location.key}/>} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
