import React from 'react';
import Layout from '@theme/Layout';

import * as PageContent from "../pageContent/homePageContent";
import StatContainer from "./components/Stats/StatContainer";

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

export default function Systems() {
  // Redirects /storage page to the Knowledge Base article
  window.location.href = '/docs/klone/architecture';
  return (
      <Layout title="Systems">
          <div class="container">
            Redirecting       
          </div>
      </Layout>
  );
}