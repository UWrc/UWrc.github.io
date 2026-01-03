import React from 'react';
import Layout from '@theme/Layout';

import Splash from "./components/Splash/Splash";

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import BrowserOnly from '@docusaurus/BrowserOnly';

export default function Demo() {
  // Redirects /storage page to the Knowledge Base article
  // window.location.href = 'https://uwconnect.uw.edu/sp?id=sc_cat_item&sys_id=f5caba8fdbe108101ba12968489619e0';
  return (
      <Layout title="Demo">
          <div class="container">
            Redirecting       
            <BrowserOnly>
                  {() => window.location.href = 'https://uwconnect.uw.edu/sp?id=sc_cat_item&sys_id=f5caba8fdbe108101ba12968489619e0'}
            </BrowserOnly> 
          </div>
      </Layout>
  );
}
