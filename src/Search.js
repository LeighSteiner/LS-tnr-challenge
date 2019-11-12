import React from "react";
import PropTypes from "prop-types";
import DOMPurify from 'dompurify';

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
      <main>
        Search:{" "}
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
        />
      <SearchResults term={this.state.value} />
      </main>
    );
  }
}

const TitlesOnlyListContainer = ({ articles }) => {
  return (
    <div>
      {articles.map(article => (
        <li key={article.nid}>
          <a href={article.url}>{article.title}</a>
        </li>
      ))}
    </div>
  );
};

TitlesOnlyListContainer.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      nid: PropTypes.number,
      title: PropTypes.string,
      slug: PropTypes.string,
      publishedAt: PropTypes.string,
      url: PropTypes.string,
      authors: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          slug: PropTypes.string
        })
      ),
      ledeImage: PropTypes.shape({
        src: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number
      })
    })
  )
};

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

  // render() {
  //   return <TitlesOnlyListContainer articles={this.state.articles}/>
  // }
  render() {
    return (
      <div>
        <span>
          {this.state.articles.length ? (
            <span>
              Your results: <span>{this.props.term}</span>{" "}
            </span>
          ) : null}
        </span>
        <TopCardList articles={this.state.articles.slice(0, 3)} />
        <LowerResultList articles={this.state.articles.slice(3)} />
      </div>
    );
  }
}

const TopCardList = props => {
  return (
    <ul className="topResults">
      {props.articles.map((article, ind) => (
        <li className="searchCard searchCard--topThree" key={ind}>
          <a href={article.urlFull}>
            {article.ledeImage ? (
              <img className="searchCard__image" src={article.ledeImage.src} alt={article.ledeAltImage || "this needs a descriptive alt tag!"} />
            ) : (
              <img alt="filler kitten"
                className="searchCard__image"
                src="http://placekitten.com/g/200/200"
              />
            )}
            <span className="topResults__year">{article.publishedAt.slice(0,4)}</span>
            <h4 dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(article.title)}} className="topResults__title"/>
            <span className="topResults__author">{article.authors.map(author => author.name)}</span>
          </a>
        </li>
      ))}
    </ul>
  );
};

const LowerResultList = props => {
  return (
    <span>
      { props.articles.length ? <span className="lowerResultList__title">MOST POPULAR</span>: null}
    <ul className="lowerResultList">
      {props.articles.map((article, ind) => (
        <li className="searchCard searchCard--rest" key={ind}>
          <a href={article.urlFull} >
            {
              article.ledeImage ?  (
                <img className="lowerResult__image" src={article.ledeImage.src} alt={article.ledeAltImage || "this needs a descriptive alt tag!"} />
              ) : <img
                alt="filler kitten"
                className="lowerResult__image"
                src="http://placekitten.com/g/200/200"
              />
            }
            <span className="lowerResult__title" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(article.title)}}/>
          </a>
        </li>
      ))}
    </ul>
    </span>
  );
};
SearchResults.propTypes = {
  term: PropTypes.string,
  limit: PropTypes.number
};

export default Search;
