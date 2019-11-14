import React from "react";
import PropTypes from "prop-types";
import DOMPurify from "dompurify";

const LowerResultList = props => {
  return (
    <span>
      {props.articles.length ? (
        <span className="lowerResultList__title">MOST POPULAR</span>
      ) : null}
      <ul className="lowerResultList">
        {props.articles.map((article, ind) => (
          <li className="searchCard searchCard--rest" key={ind}>
            <a className="searchCard--restLink" href={article.urlFull}>
              {article.ledeImage ? (
                <img
                  className="lowerResult__image"
                  src={article.ledeImage.src}
                  alt={
                    article.ledeAltImage || "this needs a descriptive alt tag!"
                  }
                />
              ) : (
                <img
                  alt="filler kitten"
                  className="lowerResult__image"
                  src="http://placekitten.com/g/200/200"
                />
              )}
              <span className="lowerResult__text">
                <span
                  className="lowerResult__title"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(article.title)
                  }}
                />
                <span className="lowerResult__author">
                  {article.authors.map((author, ind) =>
                    ind < article.authors.length - 1
                      ? author.name + ", "
                      : author.name
                  )}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </span>
  );
};

LowerResultList.propTypes = {
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

export default LowerResultList;