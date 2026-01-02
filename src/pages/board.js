import React from 'react';
import Layout from '@theme/Layout';

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import BrowserOnly from '@docusaurus/BrowserOnly';

export default function Board() {
  // Redirects /storage page to the Knowledge Base article
  // window.location.href = 'https://it.uw.edu/governance/governance-groups/research-cyberinfrastructure-domain/';
  return (
      <Layout title="Board">
          <div class="container">
            Redirecting       
            <BrowserOnly>
                  {window.location.href = 'https://it.uw.edu/governance/governance-groups/research-cyberinfrastructure-domain/'}
            </BrowserOnly> 
          </div>
      </Layout>
  );
}

