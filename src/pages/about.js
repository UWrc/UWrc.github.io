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
          width: '80%',
          fontSize: '20px',
        }}>
        <p>
        Hyak — ‘fast’ in Chinook jargon — is one of many tools that are part of the University’s cyberinfrastructure plan to support world-class research in fields as varied as astronomy, biology, climate science, computer science, engineering, medicine, physics, and others. The plan is helping drive the University’s research mission on multiple levels, from recruiting to leadership in many fields.
        </p>
      </div>
    </Layout>
  );
}

export default About;