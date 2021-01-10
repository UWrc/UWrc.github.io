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
                src="https://pbs.twimg.com/profile_images/1309314114292867074/6KmA4Mm0_400x400.jpg"
              />
              <div class="avatar__intro">
                <h4 class="avatar__name">Jim</h4>
                <small class="avatar__subtitle">
                  Associate Vice Provost
                </small>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="avatar avatar--vertical">
              <img
                class="avatar__photo avatar__photo--xl"
                src="https://pbs.twimg.com/profile_images/550415672430194690/g--kJg1N_400x400.png"
              />
              <div class="avatar__intro">
                <h4 class="avatar__name">Aaron P.</h4>
                <small class="avatar__subtitle">
                  Chief Information Officer
                </small>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="avatar avatar--vertical">
              <img
                class="avatar__photo avatar__photo--xl"
                src="https://pbs.twimg.com/profile_images/550415672430194690/g--kJg1N_400x400.png"
              />
              <div class="avatar__intro">
                <h4 class="avatar__name">Erik</h4>
                <small class="avatar__subtitle">
                  Assistant Vice President
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
                src="https://pbs.twimg.com/profile_images/1168924412487393282/ZfvazryA_400x400.jpg"
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
                src="https://pbs.twimg.com/profile_images/879469261474848772/NPqyGGkb_400x400.jpg"
              />
              <div class="avatar__intro">
                <h4 class="avatar__name">Pedro</h4>
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
                src="https://pbs.twimg.com/profile_images/1252677277009104896/Bf74Yg9u_400x400.jpg"
              />
              <div class="avatar__intro">
                <h4 class="avatar__name">Bruce</h4>
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
                src="https://pbs.twimg.com/profile_images/543503459480129537/Bh9gkA7z_400x400.jpeg"
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
                src="https://pbs.twimg.com/profile_images/1115302853273313280/hWZpEBHB_400x400.png"
              />
              <div class="avatar__intro">
                <h4 class="avatar__name">Andrew</h4>
                <small class="avatar__subtitle">
                  Research Computing Club
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
                src="https://pbs.twimg.com/profile_images/875431189493948416/zB_pLWHH_400x400.jpg"
              />
              <div class="avatar__intro">
                <h4 class="avatar__name">Aaron T.</h4>
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
                src="https://avatars3.githubusercontent.com/u/1252858?s=400&v=4"
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
                src="https://pbs.twimg.com/profile_images/543102448781373440/-J0bwkR3_400x400.png"
              />
              <div class="avatar__intro">
                <h4 class="avatar__name">Dave</h4>
                <small class="avatar__subtitle">
                  eScience Institute
                </small>
              </div>
            </div>
          </div>

        </div>

        <div class="row">
          <div class="col">
            <br />
            <p>HGB observers are members of the UW community who support the HYAK service.</p>
          </div>
        </div>

      </TabItem>

      <TabItem value="community">
        <div class="row">

          <div class="col">
            <div class="avatar avatar--vertical">
              <img
                class="avatar__photo avatar__photo--xl"
                src="https://pbs.twimg.com/profile_images/1168924412487393282/ZfvazryA_400x400.jpg"
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
                src="https://pbs.twimg.com/profile_images/1168924412487393282/ZfvazryA_400x400.jpg"
              />
              <div class="avatar__intro">
                <h4 class="avatar__name">Xiaosong</h4>
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
                src="https://pbs.twimg.com/profile_images/879469261474848772/NPqyGGkb_400x400.jpg"
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
                src="https://pbs.twimg.com/profile_images/1252677277009104896/Bf74Yg9u_400x400.jpg"
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
                src="https://pbs.twimg.com/profile_images/543503459480129537/Bh9gkA7z_400x400.jpeg"
              />
              <div class="avatar__intro">
                <h4 class="avatar__name">Patrick</h4>
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
                src="https://pbs.twimg.com/profile_images/1115302853273313280/hWZpEBHB_400x400.png"
              />
              <div class="avatar__intro">
                <h4 class="avatar__name">Andrew</h4>
                <small class="avatar__subtitle">
                  Research Computing Club
                </small>
              </div>
            </div>
          </div>

        </div>

        <div class="row">
          <div class="col">
            <br />
            <p>Community representatives serving on the HGB represent the voice of the research community for their respective sponsors. They weigh in on matters of consequence at monthly HGB meetings.</p>
          </div>
        </div>

      </TabItem>

    </Tabs>

    <br />

  </div>
</Layout>
  );
}