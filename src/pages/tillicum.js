import React from 'react';
import Layout from '@theme/Layout';

import * as PageContent from "../pageContent/homePageContent";
import StatContainer from "./components/Stats/StatContainer";

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

export default function systems() {
  return (
<Layout title="Tillicum">
  <br />
  <h1 style={{textAlign: "center"}}>Tillicum</h1>

  <div class="container">  
  <br />
    <div class="row">
      <h2>
        Coming soon!
      </h2>
    </div>
    
    <div class="row">
      <p>
        Tillicum is the University of Washington’s next-generation AI-accelerated research computing platform, purpose-built for the most demanding scientific workflows in machine learning, data science, and simulation. Designed around cutting-edge NVIDIA H200 GPUs with ultra-fast NVLink 4.0 interconnect and a 400 Gbps InfiniBand network, Tillicum enables researchers to move beyond the limits of traditional HPC with transformative performance and efficiency. 
      </p>
    </div>

    <div class="row">
      <h3>
        Key Features:
      </h3>
    </div>

    <ul>
      <li><strong>24 Dell XE9680 servers</strong></li>
      <li><strong>GPU Acceleration:</strong> 192 NVIDIA H200 GPUs with 141 GB memory and ultra-high-bandwidth NVLink 4.0</li>
      <li><strong>High-Speed Networking:</strong> 400 Gbps NDR InfiniBand for low-latency GPU communication</li>
      <li><strong>High-Performance Storage:</strong> Shared 3 PB flash storage optimized for active, high-throughput computing</li>
      <li><strong>Common Datasets:</strong> Curated datasets preloaded or available upon request for AI and data science workloads</li>
      <li><strong>Flexible Scheduling:</strong> Support for interactive, batch, and multi-node workloads</li>
      <li><strong>Container Support:</strong> Apptainer and Docker-compatible environments</li>
      <li><strong>Research Software Support:</strong> Optimized deep learning frameworks (e.g., PyTorch, TensorFlow), MPI, CUDA, and more</li>
    </ul>

    <div class="row">
      <h3>
        System Specifications:
      </h3>
    </div>

          <table>
            <tr>
              <td align="right"></td><td><img style={{width: "300px", height: "200px"}} src="/img/systems/tillicum2.png" alt="Tillicum GPU server image 1"/><img style={{width: "300px", height: "200px"}} src="/img/systems/tillicum1.png" alt="Tillicum GPU server image 2"/></td>
            </tr>
            <tr>
              <td align="right">Cluster</td><td><code>tillicum</code></td>
            </tr>
            <tr>
              <td align="right">Service</td><td>COMING Fall 2025</td>
            </tr>
            <tr>
              <td align="right">Operating System</td><td>Rocky 9</td>
            </tr>
            <tr>
              <td align="right">Compute</td><td>1,536 CPU cores [Intel Emerald Rapids]</td>
            </tr>
            <tr>
              <td align="right">Accelerators</td><td>192 GPU cards (141 GB memory per GPU) [NVIDIA Hopper - H200 SXM]</td>
            </tr>
            <tr>
              <td align="right">GPU Interconnect</td><td>NVLink™ 4.0 (900 GB/s GPU-to-GPU bandwidth)</td>
            </tr>
                        <tr>
              <td align="right">Interconnect</td><td>400 Gbps NDR InfiniBand</td>
            </tr>
            <tr>
              <td align="right" style={{verticalAlign: "top"}}>Storage</td><td>~3 PB high-performance flash storage for active computing</td>
            </tr>
            <tr>
              <td align="right" style={{verticalAlign: "top"}}>Namesake</td><td>Tillicum is a word in Chinook Jargon, meaning "the people." Chinook Jargon is the trade language of the Pacific Northwest, incorporating terms from Chinook and Chehalis and other local languages, as well as French and English. We've chosen words from Chinook Jargon for the names of systems in the UW research cyber infrastructure to emphasize their role in supporting the broad range of UW research users and our ties to our place between the mountains and Salish Sea. The University of Washington acknowledges the Coast Salish peoples of this land, the land which touches the shared waters of all tribes and bands within the Suquamish, Tulalip and Muckleshoot nations. </td>
            </tr>
          </table>

    <br />
  </div>
</Layout>
  );
}
