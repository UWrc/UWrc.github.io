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
      <br />
    </div>
    <div class="row">
      <h3>
        HPC Node Configurations
      </h3>
    </div>
    <div class="row">
      <p>
        The following are HPC Nodes configurations available for new orders. Contact the Hyak team for more details on pricing or special requests.
      </p>
    </div>
    <Tabs
      className="unique-tabs"
      defaultValue="base_node"
      values={[
        {label: 'Base Node', value: 'base_node'},
        {label: 'Bigmem Node', value: 'bigmem_node'},
        {label: 'Hugemem Node', value: 'hugemem_node'},
        {label: 'Megamem Node', value: 'megamem_node'},
        {label: 'A100 GPU Node', value: 'a100_node'},
      ]}>
      <TabItem value="base_node">
        <ul>
          <li><u><b>CPU</b></u>: 2x Intel(R) Xeon(R) Gold 6230 CPU @ 2.10GHz</li>
          <li><u><b>Cores</b></u>: 40 Cores (non-hyperthreaded)</li>
          <li><u><b>Memory</b></u>: 192GB</li>
          <li><u><b>Architecture</b></u>: x86_64</li>
          <li><u><b>Operating System</b></u>: Rocky 8.4</li>
          <li><u><b>Local 'Temp' Space</b></u>: ~350GB</li>
          <li><u><b>Allocated GPFS Space</b></u>: 1TB (per node)</li>
        </ul>
      </TabItem>
      <TabItem value="bigmem_node">
        <ul>
          <li><u><b>CPU</b></u>: 2x Intel(R) Xeon(R) Gold 6230 CPU @ 2.10GHz</li>
          <li><u><b>Cores</b></u>: 40 Cores (non-hyperthreaded)</li>
          <li><u><b>Memory</b></u>: 384GB</li>
          <li><u><b>Architecture</b></u>: x86_64</li>
          <li><u><b>Operating System</b></u>: Rocky 8.4</li>
          <li><u><b>Local 'Temp' Space</b></u>: ~350GB</li>
          <li><u><b>Allocated GPFS Space</b></u>: 1TB (per node)</li>
        </ul>
      </TabItem>
      <TabItem value="hugemem_node">
        <ul>
          <li><u><b>CPU</b></u>: 2x Intel(R) Xeon(R) Gold 6230 CPU @ 2.10GHz</li>
          <li><u><b>Cores</b></u>: 40 Cores (non-hyperthreaded)</li>
          <li><u><b>Memory</b></u>: 768GB</li>
          <li><u><b>Architecture</b></u>: x86_64</li>
          <li><u><b>Operating System</b></u>: Rocky 8.4</li>
          <li><u><b>Local 'Temp' Space</b></u>: ~350GB</li>
          <li><u><b>Allocated GPFS Space</b></u>: 1TB (per node)</li>
        </ul>
      </TabItem>
      <TabItem value="megamem_node">
        <ul>
          <li><u><b>CPU</b></u>: 2x Intel(R) Xeon(R) Gold 6230R CPU @ 2.10GHz</li>
          <li><u><b>Cores</b></u>: 52 Cores (non-hyperthreaded)</li>
          <li><u><b>Memory</b></u>: 1536GB</li>
          <li><u><b>Architecture</b></u>: x86_64</li>
          <li><u><b>Operating System</b></u>: Rocky 8.4</li>
          <li><u><b>Local 'Temp' Space</b></u>: ~350GB</li>
          <li><u><b>Allocated GPFS Space</b></u>: 1TB (per node)</li>
        </ul>
      </TabItem>
      <TabItem value="a100_node">
        <ul>
          <li><u><b>CPU</b></u>: 2x Intel(R) Xeon(R) Gold 6230R CPU @ 2.10GHz</li>
          <li><u><b>Cores</b></u>: 52 Cores (non-hyperthreaded)</li>
          <li><u><b>Memory</b></u>: 1024GB</li>
          <li><u><b>Architecture</b></u>: x86_64</li>
          <li><u><b>GPUs</b></u>: 8x NVIDIA A40 w/ 48GB ECC GDDR6</li>
          <li><u><b>Operating System</b></u>: Rocky 8.4</li>
          <li><u><b>Local 'Temp' Space</b></u>: ~350GB</li>
          <li><u><b>Allocated GPFS Space</b></u>: 1TB (per node)</li>
        </ul>
      </TabItem>
    </Tabs>

    <div class="row">
      <br />
    </div>

  </div>
</Layout>
  );
}
