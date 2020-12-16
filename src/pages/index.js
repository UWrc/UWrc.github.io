import React from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import * as PageContent from "../pageContent";
import HomeSection from "./components/HomeSection/HomeSection";

import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {  
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;

  return (
    <Layout
      title={PageContent.HEAD_TITLE}
      description={PageContent.HEAD_DESC}
    >

      <Carousel pause="false" interval={4000} >

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/img/carousel/protein.jpg"
            alt="Molecular Dynamics"
            style={{height: "91vh", width: "100%"}}
          />
          <Carousel.Caption>
            <h3>Molecular Dynamics</h3>
            <p>MD is one of the biggest use cases for HPC.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/img/carousel/network.jpg"
            alt="Social Sciences"
            style={{height: "91vh", width: "100%"}}
          />
          <Carousel.Caption>
            <h3>Computational Social Sciences</h3>
            <p>HPC is increasingly used in the social sciences.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/img/carousel/containers.jpg"
            alt="Research Containers"
            style={{height: "91vh", width: "100%"}}
          />
          <Carousel.Caption>
            <h3>Research Containers</h3>
            <p>We provide support for computational reproducibility and portability.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/img/carousel/neuron.jpg"
            alt="Machine Learning"
            style={{height: "91vh", width: "100%"}}
          />
          <Carousel.Caption>
            <h3>Machine Learning</h3>
            <p>We have tools and training to get you started with deep learning.</p>
          </Carousel.Caption>
        </Carousel.Item>

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
