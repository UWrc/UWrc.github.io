import React from 'react';
import Layout from '@theme/Layout';

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

export default function board() {
  return (
<Layout title="HGB">  
  <div class="container">
    <br />

    <div class="row">
      <div class="col">
        <h1 style={{textAlign: "center"}}>Hyak Governance Board</h1>
        <p>
          The Hyak Governance Board (HGB) meets monthly to discuss all matters research computing and strategy for the University of Washington.
        </p>
      </div>
    </div>

    <Tabs
      className="unique-tabs"
      defaultValue="voting"
      values={[
        {label: 'Leadership', value: 'leadership'},
        {label: 'Voting Members', value: 'voting'},
        {label: 'Observers', value: 'observers'},
        {label: 'Community Representatives', value: 'community'},
      ]}>
      <TabItem value="leadership">
        <div class="row">

          <div class="col">
            <div class="avatar avatar--vertical">
              <img
                class="avatar__photo avatar__photo--xl"
                src="https://www.washington.edu/research/wp-content/uploads/Xiaosong-Li-headshot.jpg"
              />
              <div class="avatar__intro">
                <h4 class="avatar__name">Xiaosong</h4>
                <small class="avatar__subtitle">
                  Associate Vice Provost <br /> Office of Research
                </small>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="avatar avatar--vertical">
              <img
                class="avatar__photo avatar__photo--xl"
                src="/img/avatar/avatar_uws_uwit.png"
              />
              <div class="avatar__intro">
                <h4 class="avatar__name">Nam</h4>
                <small class="avatar__subtitle">
                  Director
                </small>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="avatar avatar--vertical">
              <img
                class="avatar__photo avatar__photo--xl"
                src="/img/avatar/avatar_uws_uwit.png"
              />
              <div class="avatar__intro">
                <h4 class="avatar__name">Erik</h4>
                <small class="avatar__subtitle">
                  Associate Vice President <br /> UW-IT
                </small>
              </div>
            </div>
          </div>
          
        </div>

        <div class="row">
          <div class="col">
            <br />
            <p>HGB leadership guides the monthly meeting agenda with input from voting members (i.e., sponsors).</p>
          </div>
        </div>
      </TabItem>

      <TabItem value="voting">
        <div class="row">
          <div class="col">
            <div class="avatar avatar--vertical">
              <img
                class="avatar__photo avatar__photo--xl"
                src="/img/avatar/avatar_uws_aas.jpg"
              />
              <div class="avatar__intro">
                <h4 class="avatar__name">Dan</h4>
                <small class="avatar__subtitle">
                  College of Arts & Sciences
                </small>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="avatar avatar--vertical">
              <img
                class="avatar__photo avatar__photo--xl"
                src="/img/avatar/avatar_uws_coe.jpg"
              />
              <div class="avatar__intro">
                <h4 class="avatar__name">Jihui</h4>
                <small class="avatar__subtitle">
                  College of Engineering
                </small>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="avatar avatar--vertical">
              <img
                class="avatar__photo avatar__photo--xl"
                src="/img/avatar/avatar_uws_env.png"
              />
              <div class="avatar__intro">
                <h4 class="avatar__name">Shuyi</h4>
                <small class="avatar__subtitle">
                  College of the Environment
                </small>
              </div>
            </div>
          </div>

        </div>
        
        <div class="row">
          <div class="col">
            <br /> <br /> <br />
          </div>
        </div>
        <div class="row">

          <div class="col">
            <div class="avatar avatar--vertical">
              <img
                class="avatar__photo avatar__photo--xl"
                src="/img/avatar/avatar_uws_ipd.jpg"
              />
              <div class="avatar__intro">
                <h4 class="avatar__name">Luki</h4>
                <small class="avatar__subtitle">
                  Institute for Protein Design
                </small>
              </div>
            </div>
          </div>
        
          <div class="col">
            <div class="avatar avatar--vertical">
              <img
                class="avatar__photo avatar__photo--xl"
                src="/img/avatar/avatar_uwb.jpg"
              />
              <div class="avatar__intro">
                <h4 class="avatar__name">Eric & Tarang</h4>
                <small class="avatar__subtitle">
                  Bothell-Tacoma Campuses
                </small>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="avatar avatar--vertical">
              <img
                class="avatar__photo avatar__photo--xl"
                src="https://cneuro-web01.s.uw.edu/wordpress/wp-content/uploads/2022/01/thumbnail_EdgarPhoto.jpg"
              />
              <div class="avatar__intro">
                <h4 class="avatar__name">Edgar</h4>
                <small class="avatar__subtitle">
                  School of Medicine
                </small>
              </div>
            </div>
          </div>

        </div>
        <div class="row">
          <div class="col">
            <br />

            <p>Voting members of the HGB represent the leadership of due paying campus sponsors, typically at the college level. Voting is weighted by degree of sponsorship, a linear combination of amount of HYAK capacity and years of commitment in advance.</p>

            <ul>
              <li><b>Tier 1</b> sponsors commit to at least 300 HYAK slots for 6 years.</li>
              <li><b>Tier 2</b> sponsors commit to at least 50 HYAK slots for 6 years.</li>
              <li><b>Tier 3</b> sponsors commit to less than 50 HYAK slots for less than 6 years.</li>
            </ul>

          </div>
        </div>
      </TabItem>

      <TabItem value="observers">
        <div class="row">

          <div class="col">
            <div class="avatar avatar--vertical">
              <img
                class="avatar__photo avatar__photo--xl"
                src="/img/avatar/avatar_uws_uwit.png"
              />
              <div class="avatar__intro">
                <h4 class="avatar__name">Andreas</h4>
                <small class="avatar__subtitle">
                  UW-IT
                </small>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="avatar avatar--vertical">
              <img
                class="avatar__photo avatar__photo--xl"
                src="/img/avatar/avatar_uws_stf.jpg"
              />
              <div class="avatar__intro">
                <h4 class="avatar__name">David</h4>
                <small class="avatar__subtitle">
                  eScience Institute
                </small>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="avatar avatar--vertical">
              <img
                class="avatar__photo avatar__photo--xl"
                src="/img/avatar/avatar_uws_stf.jpg"
              />
              <div class="avatar__intro">
                <h4 class="avatar__name">Jenna</h4>
                <small class="avatar__subtitle">
                  Research Computing Club
                </small>
              </div>
            </div>
          </div>

        </div>

        <div class="row">
          <div class="col">
            <br /> <br /> <br />
          </div>
        </div>

        <div class="row">

          <div class="col">
            <div class="avatar avatar--vertical">
              <img
                class="avatar__photo avatar__photo--xl"
                src="/img/avatar/avatar_uws_cse.jpg"
              />
              <div class="avatar__intro">
                <h4 class="avatar__name">Aaron</h4>
                <small class="avatar__subtitle">
                  Allen School
                </small>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="avatar avatar--vertical">
              <img
                class="avatar__photo avatar__photo--xl"
                src="/img/avatar/avatar_uws_med.jpg"
              />
              <div class="avatar__intro">
                <h4 class="avatar__name">Edgar</h4>
                <small class="avatar__subtitle">
                  School of Medicine
                </small>
              </div>
            </div>
          </div>

        </div>

        <div class="row">
          <div class="col">
            <br />
            <p>HGB observers are non-voting members of the UW community who support the HYAK service.</p>
          </div>
        </div>

      </TabItem>

      <TabItem value="community">
        <div class="row">

          <div class="col">
            <div class="avatar avatar--vertical">
              <img
                class="avatar__photo avatar__photo--xl"
                src="/img/avatar/avatar_uws_aas.jpg"
              />
              <div class="avatar__intro">
                <h4 class="avatar__name">Mako</h4>
                <small class="avatar__subtitle">
                  College of Arts & Sciences
                </small>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="avatar avatar--vertical">
              <img
                class="avatar__photo avatar__photo--xl"
                src="/img/avatar/avatar_uws_med.jpg"
              />
              <div class="avatar__intro">
                <h4 class="avatar__name">Daniel</h4>
                <small class="avatar__subtitle">
                  School of Medicine
                </small>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="avatar avatar--vertical">
              <img
                class="avatar__photo avatar__photo--xl"
                src="/img/avatar/avatar_uws_coe.jpg"
              />
              <div class="avatar__intro">
                <h4 class="avatar__name">Antonino</h4>
                <small class="avatar__subtitle">
                  College of Engineering
                </small>
              </div>
            </div>
          </div>

        </div>

        <div class="row">
          <div class="col">
            <br /> <br /> <br />
          </div>
        </div>
        <div class="row">

          <div class="col">
            <div class="avatar avatar--vertical">
              <img
                class="avatar__photo avatar__photo--xl"
                src="/img/avatar/avatar_uws_env.png"
              />
              <div class="avatar__intro">
                <h4 class="avatar__name">Ivonne</h4>
                <small class="avatar__subtitle">
                  College of the Environment
                </small>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="avatar avatar--vertical">
              <img
                class="avatar__photo avatar__photo--xl"
                src="/img/avatar/avatar_uws_ipd.jpg"
              />
              <div class="avatar__intro">
                <h4 class="avatar__name">Patrick</h4>
                <small class="avatar__subtitle">
                  Institute for Protein Design
                </small>
              </div>
            </div>
          </div>

          

        </div>

        <div class="row">
          <div class="col">
            <br />
            <p>Community (non-voting) representatives serving on the HGB represent the voice of the research community for their respective sponsors. They weigh in on matters of consequence at monthly HGB meetings.</p>
          </div>
        </div>

      </TabItem>

    </Tabs>

    <br />

  </div>
</Layout>
  );
}