import React from 'react';
import Layout from '@theme/Layout';

function About() {
  return (
    <Layout title="Hello">
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
          fontSize: '20px',
        }}>
        <p>
          Put an About page for HYAK or UW RCC or something.
        </p>
      </div>
    </Layout>
  );
}

export default About;