import React from 'react';
import Layout from '@theme/Layout';

import Splash from "./components/Splash/Splash";

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

export default function Pricing() {
  return (
<Layout title="Pricing">
  <div class="container">
  <div class="row">          

  <br></br>
  <br></br>
  <br></br>

<div class="col">
  <div class="card-demo">
    <div class="card">
      <div class="card__header">
        <h5>🔥 gscratch (Parallel File System)</h5>
        <h3>$10 / 1 TB [1M files] / 1 month</h3>
      </div>
      <div class="card__footer">
      <a href="https://uwconnect.uw.edu/sp?id=sc_cat_item&sys_id=784e3d6c873e9a106f1997dd3fbb35b5">
        <button class="button button--secondary button--block">Get gscratch Capacity</button></a>
      </div>
      <div class="card__body">
        What's included?
        <ul class="check">
          <li>A "hot" storage tier.</li>
          <li>On campus parallel file system directly connected to Hyak.</li>
          <li>No data access expenses or bandwidth limits.</li>
          <li>Direct high speed / low latency Infiniband connectivity with (Hyak) compute nodes.</li>
          <li>80 Gbps aggregate Ethernet upstream connectivity to external collaborators.</li>
          <li>Use of common tools to migrate data (e.g., scp, rsync).</li>
        </ul>
        <b>Note:</b> An existing Hyak group account is required.
      </div>                    
    </div>
  </div>
</div>

<div class="col">
  <div class="card-demo">
    <div class="card">
      <div class="card__header">
        <h5>💧 Kopah (S3 Object Storage)</h5>
        <h3>$2.60 - $5.04 / 1 TB / 1 month</h3>
      </div>
      <div class="card__footer">
      <a href="https://uwconnect.uw.edu/sp?id=sc_cat_item&sys_id=cb93ee61973e92500a7637b6f053afe6">
        <button class="button button--secondary button--block">Get Kopah Capacity</button></a>
      </div>
      <div class="card__footer">
      <a href="https://uwconnect.uw.edu/sp?id=sc_cat_item&sys_id=38ce77fa875fd610e385333e3fbb358f">
        <button class="button button--secondary button--block">Try Kopah Free for 1 Month</button></a>
      </div>
      <div class="card__body">
      What's included?
        <ul class="check">
          <li>A "warm" storage tier.</li>
          <li>On campus object storage with 80 Gbps of aggregate upstream connectivity.</li>
          <li>No data access expenses or bandwidth limits.</li>
          <li>S3-compliant - any existing S3 tools can be used to copy and retrieve data.</li>
          <li>Public buckets for external data sharing.</li>
          <li>Private buckets for internal and lab-only access.</li>
        </ul>
      </div>
      <div class="card__footer">
      <a href="https://uw.service-now.com/it?id=sc_entry&sys_id=f617c851935e565086a27b847aba1018&sysparm_category=d103f865dba2bf40d6a77a8eaf9619b2">
        <button class="button button--secondary button--block">Learn More</button></a>
      </div>
    </div>
  </div>
</div>

<div class="col">
  <div class="card-demo">
    <div class="card">
      <div class="card__header">
        <h5>🧊 LOLO Archive (Tape)</h5>
        <h3>$3.45 / 1 TB / 1 month</h3>
      </div>
      <div class="card__footer">
      <a href="https://uw.service-now.com/sp?id=sc_cat_item&sys_id=d307c0cadb5e73c037ae9ec6db961963">
        <button class="button button--secondary button--block">Get LOLO Archive Capacity</button></a>
      </div>
      <div class="card__body">
      What's included?
        <ul class="check">
          <li>A "cold" storage tier.</li>
          <li>Cloud tape archive storage medium, one of the most stable.</li>
          <li>No data access expenses or bandwidth limits.</li>
          <li>Use of common tools to migrate data (e.g., scp, rsync).</li>
          <li>Automatic geographical redundancy of your data (i.e., 2 copies).</li>          
        </ul>
      </div>
      <div class="card__footer">
      <a href="https://uw.service-now.com/it?id=sc_entry&sys_id=77750042db1e73c037ae9ec6db961994&sysparm_category=d103f865dba2bf40d6a77a8eaf9619b2">
        <button class="button button--secondary button--block">Learn More</button></a>
      </div>
    </div>
  </div>
</div>

</div>

<div style={{ marginTop: '40px', textAlign: 'center' }}>
          <iframe
            width="600"
            height="345"
            src="https://www.youtube.com/embed/E_IO7HTiOjg"
            title="Kopah Overview"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div> 
    </Layout>
  );
}
