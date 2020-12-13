import React from 'react';
import Layout from '@theme/Layout';

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

export default function systems() {
  return (
<Layout title="systems">
  <div class="container">
    <br />
    <div class="row">
      <p>
      Hyak — ‘fast’ in Chinook jargon — is one of many tools that are part of the University’s cyberinfrastructure plan to support world-class research in fields as varied as astronomy, biology, climate science, computer science, engineering, medicine, physics, and others. The plan is helping drive the University’s research mission on multiple levels, from recruiting to leadership in many fields.
      </p>
    </div>

    <div class="row">
      <Tabs
        className="unique-tabs"
        defaultValue="klone"
        values={[
          {label: '3. klone', value: 'klone'},
          {label: '2. mox', value: 'mox'},
          {label: '1. ikt', value: 'ikt'},
        ]}>
        <TabItem value="klone">This is an apple 🍎</TabItem>
        <TabItem value="mox">This is an orange 🍊</TabItem>
        <TabItem value="ikt">This is a banana 🍌</TabItem>
      </Tabs>
    </div>

  </div>
</Layout>
  );
}