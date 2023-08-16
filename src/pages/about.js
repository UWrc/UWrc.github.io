import React from 'react';
import Layout from '@theme/Layout';

import Splash from "./components/Splash/Splash";

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

export default function About() {
  return (
<Layout title="About">
  <div class="container">
    <div class="row">
      <br />
    </div>
    <Splash />
    <Tabs
      className="unique-tabs"
      defaultValue="apple"
      values={[
        {label: 'Our Team', value: 'team'},
        {label: 'Governance Board', value: 'board'},
        {label: 'Publications', value: 'pub'},
      ]}>
      <TabItem value="team">We have a very diverse team that maintains the HYAK Cluster. Learn more about us <a href="https://hyak.uw.edu/team">here</a>.</TabItem>
      <TabItem value="boad">Click <a href="https://hyak.uw.edu/publications">here</a> to learn about our Governance Board.</TabItem>
      <TabItem value="pub">Click <a href="https://hyak.uw.edu/publications">here</a> to learn about out Publications</TabItem>
    </Tabs>


    <div class="row">
      <p>
      Take a look at who we are as a team, and when you're ready, familiarize yourself with <a href="https://hyak.uw.edu/team">https://hyak.uw.edu/docs</a>. 
      </p>

    </div>
  </div>
</Layout>
  );
}