import React from 'react';
import Layout from '@theme/Layout';

import Splash from "./components/Splash/Splash";

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

export default function Pricing() {
  return (
<Layout title="Pricing">
  <div class="container">
  <br></br>
  <br></br>
  <br></br>
  <h3>Hyak Demonstration Accounts</h3>
            <p>Hyak no-cost demonstration accounts are intended for prospective slice owners to use the Hyak resources and assess whether the resources can serve their research computing needs. The account has some limits and not all features of Hyak will be available for demonstration, but you will be able to test workflows and software on the cluster.</p>  
            <b>Demonstration accounts are subject to the following restrictions</b>:
            <ul>
              <li>Jobs may only be submitted to the <a href="https://hyak.uw.edu/docs/compute/checkpoint#the-checkpoint-partition"><b>ckpt, ckpt-g2, or ckpt-all partitions</b></a>.</li>
              <li>Storage is limited under the demo account to <a href="https://hyak.uw.edu/docs/storage/gscratch#user-home-directory"><b>10GB in the home directory</b></a>. For additional temporary storage you may utilize <a href="https://hyak.uw.edu/docs/storage/gscratch#scrubbed"><b>/gscratch/scrubbed storage</b></a>. Be aware that files in scrubbed not used for 21 days will be deleted. This storage in not intended for large datasets, but can be helpful as you try out workflows on Hyak.</li>
              <li>You may submit as many jobs as you like, but the scheduler will only allow one to run at a time.</li>
              <li>Your jobs are limited to 80 cores, 360 GB of memory, 2 GPUs, and a maximum of 2 discrete nodes.</li>
            </ul>
            <a href="https://uwconnect.uw.edu/sp?id=sc_cat_item&sys_id=f5caba8fdbe108101ba12968489619e0"><button class="button button--secondary button--block">Request a Hyak Demonstration Account</button></a>

  </div>
</Layout>
  );
}
