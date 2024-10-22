import React from 'react';
import Layout from '@theme/Layout';

export default function team() {
  return (
<Layout title="Team">  
  <div class="container">
    <br />
    <div class="row">
      <div class="col">
        <h1 style={{textAlign: "center"}}>Our Team</h1> <br />
      </div>
    </div>

    <div class="row">

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
            src="/img/avatar/xiao_zhu.jpeg"
          />
          <div class="avatar__intro">
            <h4 class="avatar__name">Xiao</h4>
            <small class="avatar__subtitle">
              AVP, Research Computing
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
            <h4 class="avatar__name">Matt</h4>
            <small class="avatar__subtitle">
              Sr. HPC Systems Engineer
            </small>
          </div>
        </div>
      </div>

    </div>

    <div class="row">
      <br /> <br /> <br />
    </div>

    <div class="row">

    <div class="col">
        <div class="avatar avatar--vertical">
          <img
            class="avatar__photo avatar__photo--xl"
            src="/img/avatar/jfrulla.png"
          />
          <div class="avatar__intro">
            <h4 class="avatar__name">Jake</h4>
            <small class="avatar__subtitle">
              HPC Systems Engineer
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
            <h4 class="avatar__name">Nebojsa</h4>
            <small class="avatar__subtitle">
              HPC Storage Engineer
            </small>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="avatar avatar--vertical">
          <img
            class="avatar__photo avatar__photo--xl"
            src="https://avatars.githubusercontent.com/u/22206944?v=4"
          />
          <div class="avatar__intro">
            <h4 class="avatar__name">Kristen</h4>
            <small class="avatar__subtitle">
              HPC Staff Scientist
            </small>
          </div>
        </div>
      </div>

    </div>

    <br />
  </div>
</Layout>
  );
}