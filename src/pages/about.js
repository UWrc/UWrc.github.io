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
        {label: 'Apple', value: 'apple'},
        {label: 'Orange', value: 'orange'},
        {label: 'Carrot', value: 'carrot'},
      ]}>
      <TabItem value="apple">This is an apple 🍎</TabItem>
      <TabItem value="orange">This is an orange 🍊</TabItem>
      <TabItem value="carrot">This is a carrot 🥕</TabItem>
    </Tabs>


    <div class="row">
      <p>
      How to buy in.
      </p>

    </div>

    <div class="row">
      
      <div class="col">
        <div class="card-demo">
          <div class="card">
            <div class="card__header">
              <h3>Lorem Ipsum</h3>
            </div>
            <div class="card__body">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
                suspendisse ultrices gravida.
              </p>
            </div>
            <div class="card__footer">
              <button class="button button--secondary button--block">See All</button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="col">
        <div class="card-demo">
          <div class="card">
            <div class="card__header">
              <h3>Lorem Ipsum</h3>
            </div>
            <div class="card__body">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
                suspendisse ultrices gravida.
              </p>
            </div>
            <div class="card__footer">
              <button class="button button--secondary button--block">See All</button>
            </div>
          </div>
        </div>
      </div>
    
    </div>
  </div>
</Layout>
  );
}
