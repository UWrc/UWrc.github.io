import React from 'react';
import Layout from '@theme/Layout';

import Splash from "./components/Splash/Splash";

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import BrowserOnly from '@docusaurus/BrowserOnly';

export default function About() {
  // Redirects /storage page to the Knowledge Base article
  window.location.href = 'https://it.uw.edu/guides/research/';
  return (
      <Layout title="About">
          <div class="container">
            Redirecting      
            <BrowserOnly>
                  {window.location.href = 'https://it.uw.edu/guides/research/'}
            </BrowserOnly> 
          </div>
      </Layout>
  );
}