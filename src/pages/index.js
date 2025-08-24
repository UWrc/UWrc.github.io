import React from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import * as PageContent from "../pageContent";
import HomeSection from "./components/HomeSection/HomeSection";
import CarouselItem from "./components/Carousel/CarouselItem";
import CarouselArrow from "./components/Carousel/CarouselArrow";
import CarouselIndicator from "./components/Carousel/CarouselIndicator";
import { CAROUSEL_ITEMS } from "../carouselItems";

export default function Home() {  
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;

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

      <HomeSection
        header='Service Documentation'
        cards={PageContent.DocumentationCards}
      />
      <HomeSection
        header='Learn'
        cards={PageContent.LearnCards}
      />
      <HomeSection
        header='Highlights'
        cards={PageContent.HighlightsCards}
      />
      <HomeSection
        header='Support'
        cards={PageContent.SupportCards}
      />
      <br/>
      <br/>
    </Layout>
  );
}
