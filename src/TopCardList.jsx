import React from "react";
import PropTypes from "prop-types";
import DOMPurify from "dompurify";

const TopCardList = props => (
  <ul className="topResults">
    {props.articles.map((article, ind) => (
      <li className="searchCard searchCard--topThree" key={ind}>
        <a href={article.urlFull}>
          {article.ledeImage ? (
            <img
              className="searchCard__image"
              src={article.ledeImage.src}
              alt={article.ledeAltImage || "this needs a descriptive alt tag!"}
            />
          ) : (
            <img
              alt="filler kitten"
              className="searchCard__image"
              src="http://placekitten.com/g/200/200"
            />
          )}
          <span className="topResults__year">
            {article.publishedAt.slice(0, 4)}
          </span>
          <h4
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(article.title)
            }}
            className="topResults__title"
          />
          <span className="topResults__author">
            {article.authors.map(author => author.name)}
          </span>
        </a>
      </li>
    ))}
  </ul>
);

TopCardList.propTypes = {
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

export default TopCardList;
