import React from 'react';
import Layout from '@theme/Layout';

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

export default function Publications() {
  return (
<Layout title="Publications">
  <div class="container">
      <div class="row">
        <br />
      </div>
  </div>

  <div class="container">
    <div class="row">
      <h1>Publications</h1>
      <p>
      Conference papers, peer-reviewed journal articles, and other scholarly works are the result of your hard work of which HYAK was one helping hand. Please consider citing or acknowleding HYAK in your final work and then let us know so it can be considered to appear in our select publication list.
      </p>

      <h3>How do I cite HYAK</h3>
      <p>
      Please consider citing HYAK in your paper when publishing, you can use the citation below.
      </p>

      <h3>Select Publications</h3>
      <p>
      These are select works that were produced using a HYAK cluster in any given year. While hundreds of papers are produced each year using HYAK, we limit the select list below to 10 for the sake of brevity. If you would like your publication to be considered for inclusion onto this list please <a href="mailto:help@uw.edu?subject=HYAK publication">e-mail us</a> with the citation.
      </p>
    </div>
    
    <div class="row">
      <Tabs
        className="unique-tabs"
        defaultValue="2020"
        values={[
          {label: '2021', value: '2021'},
          {label: '2020', value: '2020'},
          {label: '2019', value: '2019'},
        ]}>
        <TabItem value="2021">
          <ol>
            <li>Coming soon.</li>
          </ol>
        </TabItem>
        <TabItem value="2020">
          <ol>
            <li>PE Rummo, N Pho, MA Bragg, CA Roberto, B Elbel. "Trends in Store-Level Sales of Sugary Beverages and Water in the US, 2006–2015." <i>American Journal of Preventive Medicine</i> 59 (4), 522-529 (2020) DOI: <a href="https://doi.org/10.1016/j.amepre.2020.04.022">10.1016/j.amepre.2020.04.022</a></li>
          </ol>
        </TabItem>
        <TabItem value="2019">
          <ol>
            <li>TODO</li>
          </ol>          
        </TabItem>        
      </Tabs>
    </div>

  </div>
</Layout>
  );
}