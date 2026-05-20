import React from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import * as PageContent from "../pageContent/homePageContent";
import * as LearnPageContent from "../pageContent/learnPageContent";
import HomeSection from "./components/HomeSection/HomeSection";
import HeroBanner from "./components/HeroBanner/HeroBanner";
import CarouselItem from "./components/Carousel/CarouselItem";
import CarouselArrow from "./components/Carousel/CarouselArrow";
import CarouselIndicator from "./components/Carousel/CarouselIndicator";
import { CAROUSEL_ITEMS } from "../pageContent/carouselItems";

export default function Home() {  
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;

  // Fetch learn cards with isfeatured enabled, and sort them by featuredSortIndex
  let FeaturedCards = LearnPageContent.LearnHowToCards.concat(LearnPageContent.LearnTutorialCards, LearnPageContent.LearnServicesCards);
  FeaturedCards = FeaturedCards.filter(item => item.isfeatured);
  FeaturedCards = FeaturedCards.sort((a,b) => { return a.featuredSortIndex > b.featuredSortIndex ? 1 : -1});


  return (
    <Layout
      title={PageContent.HEAD_TITLE}
      description={PageContent.HEAD_DESC}
    >
      <Carousel 
        autoPlay={true} 
        infiniteLoop={true} 
        interval={8000} 
        showThumbs={false} 
        showStatus={false}
        renderArrowPrev={(onClickHandler, hasNext, label) => {
          return <CarouselArrow
            onClickHandler={onClickHandler} 
            hasNext={hasNext} 
            label={label} 
            arrowDirection="left"
          />
        }}
        renderArrowNext={(onClickHandler, hasNext, label) => {
          return <CarouselArrow
            onClickHandler={onClickHandler} 
            hasNext={hasNext} 
            label={label} 
            arrowDirection="right"
          />
        }}
        renderIndicator={(onClickHandler, isSelected, index, label) => {
          return <CarouselIndicator
            onClickHandler={onClickHandler}
            isSelected={isSelected}
            index={index}
            label={label}
          />
        }}
      >
        {CAROUSEL_ITEMS.map((carouselItem, i) => {
          return <CarouselItem key={i} {...carouselItem} />
        })}
      </Carousel>

      <HeroBanner />

      <HomeSection
        header='Service Documentation'
        cards={PageContent.DocumentationCards}
        maxCards='8'
      />
      <HomeSection
        header='Learn'
        cards={FeaturedCards}
        maxCards='8'
        seeMoreLink='/learn'
      />
      <HomeSection
        header='Support'
        cards={PageContent.SupportCards}
        maxCards='8'
      />
      <br/>
      <br/>
    </Layout>
  );
}
