import React from 'react';
import Layout from '@theme/Layout';

import * as PageContent from "../pageContent";
import StatContainer from "./components/Stats/StatContainer";

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

export default function systems() {
  return (
<Layout title="Hyak">
  <br />
  <h3 style={{textAlign: "center"}}>HYAK</h3>
  
  <StatContainer statItems={PageContent.STAT_ITEMS} />

  <div class="container">  
  <br />
    <div class="row">
      <p>
        HYAK is part of the University of Washington's cyberinfrastructure plan to support world-class research in every department. HYAK is an ecosystem of high-performance compute (HPC) clusters and supporting infrastructure (e.g., data management, computational training, scientific consulting). Acknowleding our Pacific Northwest heritage, HYAK means "fast" in Chinook jargon. Counting 1, 2, and 3 translates to "ikt", "mox", and "klone" in this local trading language. The numbers are cluster names corresponding to the generation of HYAK cluster deployed. We are currently on the 3rd generation cluster for HYAK.
      </p>
    </div>

    <div class="row">
      <Tabs
        className="unique-tabs"
        defaultValue="klone"
        values={[
          {label: '1. ikt', value: 'ikt'},
          {label: '2. mox', value: 'mox'},
          {label: '3. klone', value: 'klone'},
        ]}>
        <TabItem value="ikt">
        <table>
            <tr>
              <td align="right"></td><td><img style={{width: "300px", height: "200px"}} src="/img/systems/ikt.jpg" /></td>
            </tr>
            <tr>
              <td align="right">Cluster</td><td><code>ikt</code></td>
            </tr>
            <tr>
              <td align="right">Service</td><td>October 2010 — June 2020</td>
            </tr>
            <tr>
              <td align="right">Compute</td><td>8,008 CPU cores [Broadwell]</td>
            </tr>
            <tr>
              <td align="right">Accelerators</td><td>47 GPU cards [Tesla M2075]</td>
            </tr>
            <tr>
              <td align="right">Interconnect</td><td>10 Gbps [Myri-10G Myrinet]</td>
            </tr>
            <tr>
              <td align="right">Topology</td><td>Non-blocking 1-layer fat tree</td>
            </tr>
            <tr>
              <td align="right">Storage</td><td>1.0 PB GPFS</td>
            </tr>
            <tr>
              <td align="right" style={{verticalAlign: "top"}}>Notes</td><td>Ikt translates to 1 in Chinook trading jargon and was the name of the 1st HYAK cluster. <code>ikt</code> is no longer in service. Reported figures represent best records.</td>
            </tr>
          </table>
        </TabItem>
        <TabItem value="mox">
          <table>
            <tr>
              <td align="right"></td><td><img style={{width: "300px", height: "200px"}} src="/img/systems/ikt.jpg" /></td>
            </tr>
            <tr>
              <td align="right">Cluster</td><td><code>mox</code></td>
            </tr>
            <tr>
              <td align="right">Service</td><td>June 2018 — June 2024 (Estimated)</td>
            </tr>
            <tr>
              <td align="right">Compute</td><td>18,376 CPU cores [Cascade Lake]</td>
            </tr>
            <tr>
              <td align="right" style={{verticalAlign: "top"}}>Accelerators</td><td>112 GPU cards [Turing]<br />20 Xeon PHI</td>
            </tr>
            <tr>
              <td align="right">Interconnect</td><td>100 Gbps [OPA100 Omnipath]</td>
            </tr>
            <tr>
              <td align="right">Topology</td><td>Non-blocking 1-layer fat tree</td>
            </tr>
            <tr>
              <td align="right">Storage</td><td>1.0 PB GPFS</td>
            </tr>
            <tr>
              <td align="right" style={{verticalAlign: "top"}}>Notes</td><td>Mox translates to 2 in Chinook trading jargon and is the name of the 2nd HYAK cluster. <code>mox</code> is active but no longer accepting node additions and not growing. Reported figures represent peak capacity during its service.</td>
            </tr>
          </table>
        </TabItem>
        <TabItem value="klone">
          <table>
            <tr>
              <td align="right"></td><td><img style={{width: "300px", height: "200px"}} src="/img/systems/klone.jpg" /></td>
            </tr>
            <tr>
              <td align="right">Cluster</td><td><code>klone</code></td>
            </tr>
            <tr>
              <td align="right">Service</td><td>January 2021 — Present</td>
            </tr>
            <tr>
              <td align="right">Compute</td><td>18,376 CPU cores [Ice Lake]</td>
            </tr>
            <tr>
              <td align="right">Accelerators</td><td>112 GPU cards [Turing, Ampere]</td>
            </tr>
            <tr>
              <td align="right">Interconnect</td><td>100 Gbps [HDR100 Infiniband]</td>
            </tr>
            <tr>
              <td align="right">Topology</td><td>3:1 blocking 2-layer fat tree</td>
            </tr>
            <tr>
              <td align="right" style={{verticalAlign: "top"}}>Storage</td><td>1.4 PB GPFS<br />500 TB NVMe Flash</td>
            </tr>
            <tr>
              <td align="right" style={{verticalAlign: "top"}}>Notes</td><td>Klone translates to 3 in Chinook trading jargon and is the name of the 3rd HYAK cluster. <code>klone</code> is active and scheduled for a soft launch in Q1 2021 and a full launch by Q2 2021. Reported figures are updated as the cluster continues to grow.</td>
            </tr>
          </table>
        </TabItem>
      </Tabs>
    </div>
    <br />
  </div>
</Layout>
  );
}