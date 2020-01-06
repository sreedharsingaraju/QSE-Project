import React, { Component } from "react";
import "./Search.css";

class Search extends Component {
  state = {
    searchValue: "",
    hits: []
  };

  handleOnChange = event => {
    this.setState({ searchValue: event.target.value });
  };

  handleSearch = () => {
    this.makeApiCall(this.state.searchValue);
  };

  makeApiCall = searchInput => {
    var searchUrl = `http://104.155.39.39:9200/content/_search?q=content:${searchInput}`;
    fetch(searchUrl)
      .then(response => {
        return response.json();
      })
      .then(jsonData => {
        this.setState({ hits: jsonData.hits.hits });
        console.log(this.state.hits);
      });
  };

  render() {
    return (
      <div id="main">
        <h1>Queen's Search Engine</h1>
        <input
          name="text"
          type="text"
          placeholder="search..."
          onChange={event => this.handleOnChange(event)}
          value={this.state.searchValue}
        />
        <div id='main'>
        <button onClick={this.handleSearch}>QSE Search</button>
        {this.state.hits ? (
          <div id="results-container">
            {this.state.hits.map((hit, index) => (
              <div class="single-result" key={index}>
                {hit._source.title}
                <br />
                {hit._source.description}
                <br />
                <a href={hit._source.url}>{hit._source.url}</a>
              </div>
            ))}
          </div>
          ) : (
          <p>No results found</p>
        )}
        </div>
      </div>
    );
  }
}

export default Search;
