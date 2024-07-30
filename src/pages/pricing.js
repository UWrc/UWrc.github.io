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
    <Tabs
      className="unique-tabs"
      defaultValue="compute"
      values={[
        {label: 'Compute', value: 'compute'},
        {label: 'Storage', value: 'storage'},
        {label: 'Support', value: 'support'},
        {label: 'Try HYAK', value: 'trial'},
      ]}>
      <TabItem value="compute">
        <div class="row">
          <div class="col">
            <a name="condo-model" />
            <h3>Condo Model</h3>
            <p>The HYAK clusters operate on a condo model. This means that the cluster itself consists of contributed resource slices from various groups across campus. The HYAK team, funded through the office of research and sponsoring entities, provides the core infrastructure (e.g., networking, storage, support staff). This is why faculty that are from sponsoring entities do not have any annual, ongoing costs associated with their slices beyond the initial cost of the hardware. The leadership of their sponsoring entities cover this. Faculty that are <u>not</u> affiliated with sponsoring entities have to shoulder this annual, ongoing cost associated with any slices they wish to contribute.</p>
            <p>You get access to resources equivalent to the slices your account contributes to the cluster on-demand. A cluster account also provides you access to all the other contributed slices from other entities, subject to their availability (i.e., if the contributors or the resources aren't actively using them). This is referred to as the "checkpoint" partition due to the lack of job run-time guarantees. Once a checkpoint job starts it can be re-queued at any moment, but is not uncommon for a job to run for 4 to 5 hours before requeue. Longer checkpoint jobs will continue to run and be re-queued until they complete, which is why it is important that your job be able to checkpoint or save state and resume gracefully. Checkpoint access can provide access to substantial resources beyond what you contribute and is the benefit of joining a shared cluster like HYAK compared to buying the same hardware operating your own server.</p>
            The total cost considerations for compute nodes in HYAK can be broken down into the sum of the following two components.
            <ol>
              <li><a href="#slice-cost-annual">Slice Annual Costs</a></li>
              <li><a href="#slice-cost-hardware">Slice Hardware Costs</a></li>
            </ol>

            <a name="slice-cost-annual" />
            <h3>Slice Annual Costs</h3>

            <div class="row">
  
              <div class="col">
                <div class="card-demo">
                  <div class="card">
                    <div class="card__header">
                      <h5>Self-Sponsored Slices (Annual)</h5>
                      <h3>$1,750 / 1 slice / 1 year</h3>                      
                    </div>
                    <div class="card__footer">
                      <a href="mailto:help@uw.edu?subject=buy hyak (self-sponsored) slices&body=I would like to get some hyak self-sponsored slices.">
                      <button class="button button--secondary button--block">Get Self-Sponsored Slices</button></a>
                    </div>
                    <div class="card__body">
                      What's included?
                      <ul class="check">
                        <li>Cluster membership evaluated annually.</li>
                        <li>Access to the checkpoint partition for additional resources and compute time beyond what you contribute to the cluster.</li>
                        <li>Grant application support.</li>
                        <li>Scientific consultation for workflows and researcher onboarding.</li>
                        <li>Access to workshops and other training as provided.</li>
                        <li>Next business day support for questions.</li>
                        <li>24 / 7 / 365 monitoring of the cluster as a whole.</li>
                        <li>Regular (cyber)security patching and updates.</li>
                        <li>Historical uptimes better than 99% for the cluster not including previously scheduled maintenance days.</li>
                      </ul>
                      <p>NOTE: Slices purchased separately (below).</p>
                    </div>                    
                  </div>
                </div>
              </div>
              
              <div class="col">
                <div class="card-demo">
                  <div class="card">
                    <div class="card__header">
                      <h5>Sponsored Slices (Annual)</h5>
                      <h3>$0 / year</h3>
                    </div>
                    <div class="card__footer">
                    <a href="mailto:help@uw.edu?subject=buy hyak (sponsored) slices&body=I would like to get some hyak sponsored slices.">
                      <button class="button button--secondary button--block">Get Sponsored Slices</button></a>
                    </div>
                    <div class="card__body">
                    What's included?
                      <ul class="check">
                        <li>Everything that comes with self-sponsored slices.</li>
                        <li>Slice lifetime guaranteed for a minimum of 4 years.</li>
                        <li>No annual costs beyond the up front cost of the slices.</li>
                      </ul>
                      <p>NOTE: Slices purchased separately (below).</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <br />

            <p>
              If your lab has a faculty affiliation with a sponsoring entity (listed below), then you are only responsible for a one time, total up-front cost of the slices. You get 4 years of guaranteed and fully supported utilization per slice and beyond that subject to capacity and other conditions. You can skip down to the section below for specific slice configurations.
            </p>

            <p>
              If your lab does <u>not</u> have a faculty affiliation with a sponsoring entity (listed below), then there is an annual cost of $1,750 per 1 slice per 1 year (Self-Sponsored Slices above).
            </p>

            <b>Sponsors</b>:
            <ul>
              <li>UW Seattle</li>
              <ul>
                <li>College of Arts & Sciences</li>
                <li>College of Engineering</li>
                <li>College of the Environment</li>
                <li>Institute for Protein Design</li>
                <li>School of Medicine</li>
              </ul>
              <li>UW Bothell</li>
              <li>UW Tacoma</li>
            </ul>

            <a name="slice-cost-hardware" />
            <h3>Slice Hardware Configurations</h3>
            <table style={{"margin-left": "auto", "margin-right": "auto", "text-align": "center"}}>
              <tr>
                <td>Type</td>
                <td colspan="3">HPC Slices</td>
                <td colspan="2">GPU Slices</td>
              </tr>
              <tr>
                <td>Slice Count</td>
                <td colspan="3">1 x HPC slice</td>
                <td colspan="2">1 x GPU slice</td>
              </tr>
              <tr>
                <td>Name</td>
                <td>standard</td>
                <td>bigmem</td>
                <td>custom</td>
                <td>L40</td>
                <td>H100</td>
              </tr>
              <tr>
                <td>Compute Cores</td> 
                <td colspan="5">32-cores</td>
              </tr>
              <tr>
                <td>Memory (System)</td>
                <td colspan="1">256GB</td>
                <td colspan="1">512GB</td>
                <td colspan="1">&gt;512GB</td>
                <td colspan="2">384GB</td>
              </tr>
              <tr>
                <td>GPU Type</td>
                <td colspan="3">N/A</td>
                <td>2 x L40</td>
                <td>2 x H100</td>
              </tr>
              <tr>
                <td>Memory (GPU)</td>
                <td colspan="3">N/A</td>
                <td>48GB per GPU</td>
                <td>80GB per GPU</td>
              </tr>
              <tr>
                <td>Pricing ($)</td>
                <td colspan="3"><a href="mailto:help@uw.edu?subject=hyak hpc slice pricing&body=I am curious about the latest HPC slice pricing.">Email Us</a></td>
                <td colspan="2"><a href="mailto:help@uw.edu?subject=hyak gpu slice pricing&body=I am curious about the latest GPU slice pricing.">Email Us</a></td>
              </tr>
            </table>

            <p>
              <h3>General FAQ:</h3>
              <ul>
                <li>All hardware is procured at cost (market value with substantial university negotiated bulk discounts) and no sales tax or university overhead applied.</li>
                <li>We reserve the 2nd Tuesday of every month for cluster maintenance.</li>
                <li><b>Slice Service Life</b>:</li>
                <ul>                  
                  <li>Sponsored Slices: All sponsored slices are supported for a minimum guaranteed lifetime of 4 years. Beyond 4 years all slices are continued to be made available subject to hardware viability (i.e., it didn't break) and the sponsoring entity still having capacity. Historically, this has been 6 years on average. However, past performance is not a <i>guarantee</i> of future experiences.</li>
                <li>Self-Sponsored Slices: Since self-sponsored slices have an on-going annual cost, this means slice life is reviewed on a yearly basis subject to the lab's willingness to continue, hardware viability, and overall cluster capacity.</li>
                </ul>
                <li><b>Storage</b>:</li>
                <ul>
                  <li>Local: Each full node has 1.5TB or more of local NVME SSD disk storage. This is non-persistent storage and is cleared after a job ends. Data must be copied to and from local SSD before and after each job to utilize this.</li>
                  <li>Group: Each slice purchase includes 1 TB of storage space and a 1 million file count limit of shared group storage (i.e., gscratch) accessible from every node. Additional storage quota increases can be purchased for $10 per month for 1TB of additional space and 1 million additional file count limit. Additional "scrubbed" shared storage is available for short-term use, but will be automatically deleted if not accessed for several weeks.</li>
                </ul>
              </ul>
              HPC Slices:
              <ul>
                <li>All slices are standardized on AMD EPYC 9654 CPUs ("Genoa").</li>
                <li>A physical server (or node) has 192-cores and &gt;1.5TB of memory packaged in a single box. This is in turn sub-divided into 6 equal "slices" that are resources of compute units that are sold to researchers.</li>
                <li>They are identically configured with your choice of memory (or RAM).</li>
                <li>Any jobs requiring multiple nodes should be prepared to be independent computations (i.e., "embarassingly parallel") or make use of message passing libraries (e.g., OpenMPI) to scale across multiple nodes simultaneously.</li>
              </ul>
              GPU Slices:
              <ul>
              <li>All slices are standardized on AMD EPYC 9534 CPUs ("Genoa"). We are on the NVIDIA "Ada" and "Hopper" generation of GPUs.</li>
                <li>4 x GPU slices constitute a single physical server (or node). It is a single box with 128-cores, 1.5TB of memory, and 8 x GPUs of the same type. They are sold in resource slices to make this a more tractable cost for labs with more modest GPU needs.</li>
                <li>Any jobs requiring more than 8 x GPUs of the same type should be prepared to make use of message passing libraries (e.g., PyTorch Lightning) to scale across multiple servers. Any job up to the equivalent of 4 x GPU slices (i.e., 8 x GPU cards) can be run on the same physical machine and therefore scale easily without much further modification to the codebase.</li>
              </ul>
            </p>

            <a href="mailto:help@uw.edu?subject=buying hyak slices&body=I would like to get some hyak slices.">
            <button class="button button--secondary button--block">Buy Slices</button></a>

          </div>
        </div>
      </TabItem>
      
      <TabItem value="storage">
        <div class="row">          

          <div class="col">
            <div class="card-demo">
              <div class="card">
                <div class="card__header">
                  <h5>🔥 gscratch (Parallel File System)</h5>
                  <h3>$10 / 1 TB [1M files] / 1 month</h3>
                </div>
                <div class="card__footer">
                  <a href="mailto:help@uw.edu?subject=buy hyak (gscratch) capacity&body=I would like to buy some gscratch capacity on hyak.">
                  <button class="button button--secondary button--block">Get gscratch Capacity</button></a>
                </div>
                <div class="card__body">
                  What's included?
                  <ul class="check">
                    <li>A "hot" storage tier.</li>
                    <li>On campus parallel file system directly connected to HYAK.</li>
                    <li>No data access expenses or bandwidth limits.</li>
                    <li>Direct high speed / low latency Infiniband connectivity with (HYAK) compute nodes.</li>
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
                  <h5>💧 KOPAH (Object Storage)</h5>
                  <h3>Coming Soon</h3>
                </div>
                <div class="card__footer">
                <a href="">
                  <button class="button button--secondary button--block">Coming Soon</button></a>
                </div>
                <div class="card__body">
                What's included?
                  <ul class="check">
                    <li>A "warm" storage tier.</li>
                    <li>On campus object storage with 80 Gbps of aggregate upstream connectivity.</li>
                    <li>No data access expenses or bandwidth limits.</li>
                    <li>S3-compliant so any existing S3 tools can be used to copy and retrieve data.</li>
                    <li>Public buckets for external data sharing.</li>
                    <li>Private buckets for internal and lab-only access.</li>
                  </ul>
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
                <a href="https://uw.service-now.com/sp?
id=sc_cat_item&sys_id=d307c0cadb5e73c037ae9ec6db961963">
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
              </div>
            </div>
          </div>

        </div>            
      </TabItem>

      <TabItem value="support">
      <p>All storage and compute purchases come with support. A team of systems and storage engineers as well as staff scientists will provide at least next business day acknowledgement of any emails or tickets. Depending on the nature of the request or question there may be further delayed follow up for the tasks at hand. To start a help ticket email help@uw.edu and include HYAK in the subject line. Or use the button below.</p>
        
        <a href="mailto:help@uw.edu?subject=hyak support&body=Please direct this message to the HYAK team.">
            <button class="button button--secondary button--block">Request Support</button></a>
      </TabItem>

      <TabItem value="trial">
      <h3>HYAK Demo Accounts</h3>
            <p>HYAK no-cost demonstration accounts are intended for prospective slice owners to use the HYAK resources and assess whether the resources can serve their research computing needs. The account has some limits and not all features of HYAK will be available for demonstration, but you will be able to test workflows and software on the cluster.</p>  
            <b>Demonstration accounts are subject to the following restrictions</b>:
            <ul>
              <li>Jobs may only be submitted to the <a href="https://hyak.uw.edu/docs/compute/checkpoint#the-checkpoint-partition">ckpt partition</a>.</li>
              <li>Storage is limited under the demo account to <a href="https://hyak.uw.edu/docs/storage/gscratch#user-home-directory">10GB in the home directory</a>. For additional temporary storage you may utilize <a href="https://hyak.uw.edu/docs/storage/gscratch#scrubbed"> /gscratch/scrubbed storage</a>. Be aware that files in scrubbed not used for several months will be deleted. This storage in not intended for large datasets, but can be helpful as you try out workflows on HYAK.</li>
              <li>You may submit as many jobs as you like, but the scheduler will only allow one to run at a time.</li>
              <li>Your jobs are limited to 80 cores, 360 GB of memory, 2 GPUs, and a maximum of 2 discrete nodes.</li>
            </ul>
            <a href="mailto:help@uw.edu?subject=hyak demo account&body=I would like to open a HYAK demo account.">
            <button class="button button--secondary button--block">Request a HYAK Demo Account</button></a>
          
      </TabItem>
    </Tabs>

  </div>
</Layout>
  );
}
