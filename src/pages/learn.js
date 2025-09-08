import React from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import * as PageContent from "../pageContent/learnPageContent";
import HomeSection from "./components/HomeSection/HomeSection";
import PageTitle from "./components/PageTitle/PageTitle";


export default function Learn() {  
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;

  return (
    <Layout title='Learn'>
      
      <PageTitle title='Learn' />
      
      <HomeSection
        header='Short How-To'
        cards={PageContent.LearnHowToCards}
      />

      <HomeSection
        header='Tutorials'
        cards={PageContent.LearnTutorialCards}
      />

      <HomeSection
        header='Services'
        cards={PageContent.LearnServicesCards}
      />

      <HomeSection
        header='Research Spotlight'
        cards={PageContent.LearnSpotlightCards}
      />

      <HomeSection
        header='Special Events'
        cards={PageContent.LearnSpecialCards}
      />
      
      <br/>
      <br/>
    </Layout>
  );
}
