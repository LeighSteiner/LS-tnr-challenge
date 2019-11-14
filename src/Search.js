import React from "react";
import PropTypes from "prop-types";

import CustomNav from "./CustomNav";
import TopCardList from "./TopCardList";
import LowerResultList from "./LowerResultList";

/*
  it felt a little outside the remit of this challenge, 
  but in a real world context, i would ask about revising 
  these components to be functional components using 
  useState and useEffect
*/

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <div>
        <CustomNav />
        <main tabIndex={0} id="main">
          <span className="search">
            <label className="search__label" htmlFor="search-input">
              {" "}
              SEARCH:{" "}
            </label>
            <input
              id="search-input"
              className="search__input"
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </span>
          <SearchResults term={this.state.value} />
        </main>
      </div>
    );
  }
}

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    };
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.term !== prevProps.term ||
      this.props.limit !== prevProps.limit
    ) {
      this.fetchArticles();
    }
  }

  componentDidMount() {
    this.fetchArticles();
  }

  articleSearch(term, limit = 20, offset = 0) {
    // eslint-disable-next-line max-len
    return fetch(
      `https://newrepublic.com/api/articles?q=${term}&filters[status]=PUBLISHED&fields[0]=id&fields[1]=nid&fields[2]=slug&fields[3]=title&fields[4]=authors.name,slug&fields[6]=publishedAt&fields[7]=status&fields[8]=ledeImage&fields[9]=ledeAltImage&fields[10]=url&fields[11]=urlFull&fields[12]=sponsor&fields[13]=deck&limit=${limit}&offset=${offset}`
    );
  }

  fetchArticles() {
    this.articleSearch(this.props.term, this.props.limit).then(response => {
      response.json().then(results => {
        console.log(results);
        this.setState({ articles: results.data.articles });
      });
    });
  }

  render() {
    return (
      <div>
        <span>
          {this.state.articles.length ? (
            <span className="topResultsList__title">
              YOUR RESULTS: <i className="searchTerm">{this.props.term}</i>{" "}
            </span>
          ) : null}
        </span>
        <TopCardList articles={this.state.articles.slice(0, 3)} />
        <LowerResultList articles={this.state.articles.slice(3)} />
      </div>
    );
  }
}

SearchResults.propTypes = {
  term: PropTypes.string,
  limit: PropTypes.number
};

export default Search;
