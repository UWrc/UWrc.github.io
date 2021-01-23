import React from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import * as PageContent from "../pageContent";
import HomeSection from "./components/HomeSection/HomeSection";
import HyakCarouselItem from "./components/HyakCarouselItem/HyakCarouselItem";



//import Carousel from 'react-bootstrap/Carousel';
//import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {  
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;

  const CAROUSEL_ITEMS = [
    {
      image: '/img/carousel/protein.jpg',
      title: 'Molecular Dynamics',
      caption: 'MD is one of the biggest use cases for HPC.',
      linkUrl: '/blog/2021/01/09/gromacs-gpu',
    },
    {
      image: '/img/carousel/network.jpg',
      title: 'Computational Social Sciences',
      caption: 'HPC is increasingly used in the social sciences.',
      linkUrl: 'https://www.washington.edu/uwit/partnerships-2019/building-better-online-communities/',
    },
    {
      image: '/img/carousel/containers.jpg',
      title: 'Research Containers',
      caption: 'We provide support for computational reproducibility and portability.',
      linkUrl: '/docs/tools/containers'
    },
    {
      image: '/img/carousel/neuron.jpg',
      title: 'Machine Learning',
      caption: 'We have tools and training to get you started with deep learning.',
      linkUrl: '/blog/2021/01/10/pytorch-cuda11',
    }
  ]

  return (
    <Layout
      title={PageContent.HEAD_TITLE}
      description={PageContent.HEAD_DESC}
    >
      <Carousel>
        {CAROUSEL_ITEMS.map((carouselItem, i) => <HyakCarouselItem key={i} {...carouselItem} />)}
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
      <HomeSection
        header={PageContent.HomePage.PoweredBy.HEADER}
        imgs={siteConfig.customFields.Graphics.POWERED_BY}
      />
    </Layout>
  );
}
