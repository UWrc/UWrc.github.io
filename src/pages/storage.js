import React from 'react';
import Layout from '@theme/Layout';

import Splash from "./components/Splash/Splash";

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import BrowserOnly from '@docusaurus/BrowserOnly';

export default function Storage() {
  // Redirects /storage page to the Knowledge Base article
  // window.location.href = 'https://uwconnect.uw.edu/it?id=kb_article_view&sysparm_article=KB0035580';
  return (
      <Layout title="Storage">
          <div class="container">
            Redirecting
            <BrowserOnly>
                  {window.location.href = 'https://uwconnect.uw.edu/it?id=kb_article_view&sysparm_article=KB0035580'}
            </BrowserOnly>       
          </div>
      </Layout>
  );
}
