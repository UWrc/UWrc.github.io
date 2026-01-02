import React from 'react';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';

export default function Team() {
  // Redirects /storage page to the Knowledge Base article
  // window.location.href = 'https://it.uw.edu/uw-it/divisions/research-computing/';
  return (
      <Layout title="Team">
          <div class="container">
            Redirecting     
            <BrowserOnly>
                  {window.location.href = 'https://it.uw.edu/uw-it/divisions/research-computing/'}
            </BrowserOnly>   
          </div>
      </Layout>
  );
}
