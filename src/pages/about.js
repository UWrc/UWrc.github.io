import React from 'react';
import Layout from '@theme/Layout';

import { ABOUT_PARAGRAPH } from "../pageContent";


export default function About() {
  return (
    <Layout title="Hello">
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
          width: '80%',
          fontSize: '20px',
        }}>
        {ABOUT_PARAGRAPH}
      </div>
    </Layout>
  );
}