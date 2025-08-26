import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css"

import ContentCard from "../ContentCard/ContentCard";


HomeSection.propTypes = {
  header: PropTypes.element.isRequired,
  cards: PropTypes.arrayOf(PropTypes.shape({
    image: PropTypes.string.isRequired,
    header: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    isvideo: PropTypes.boolean,
  })).isRequired,
  seeMoreLink: PropTypes.string.isRequired,
  maxCards: PropTypes.number,
}

export default function HomeSection(props) {
  return (
    <div className={styles.homeSection}>
      <h2>{props.header}</h2>
      
      <div className={styles.cards}>
        {props.cards?.slice(0, props.maxCards ?? props.cards?.length).map(card => (
          <ContentCard header={card.header} caption={card.caption} image={card.image} link={card.link} isvideo={card.isvideo} />
        ))}
      </div>

      { props.maxCards && props.cards.length >= props.maxCards &&
            <a href={props.seeMoreLink} className={styles.seeMore}> 
                See more
            </a>
      }
    </div>
  )
}
