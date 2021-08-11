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
        interval={5000} 
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
          console.log(i, carouselItem)
          return <CarouselItem key={i} {...carouselItem} />
        })}
      </Carousel>

      <HomeSection
        header={PageContent.HomePage.UserInterface.HEADER}
        imgs={siteConfig.customFields.Graphics.INTERFACES}
        content={PageContent.HomePage.UserInterface.SECTIONS}
      />
      <HomeSection
        header={PageContent.HomePage.ProgrammingLangs.HEADER}
        imgs={siteConfig.customFields.Graphics.PROGRAMMING_LANGS}
        content={PageContent.HomePage.ProgrammingLangs.SECTIONS}
      />
      <HomeSection
        header={PageContent.HomePage.AppStore.HEADER}
        imgs={siteConfig.customFields.Graphics.APP_STORE}
        content={PageContent.HomePage.AppStore.SECTIONS}
      />
      <HomeSection
        header={PageContent.HomePage.Help.HEADER}
        imgs={siteConfig.customFields.Graphics.CONTACT}
        content={PageContent.HomePage.Help.SECTIONS}
      />
      <HomeSection
        header={PageContent.HomePage.BuiltWith.HEADER}
        imgs={siteConfig.customFields.Graphics.BUILT_WITH}
      />
    </Layout>
  );
}
