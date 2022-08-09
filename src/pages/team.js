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
            src="/img/avatar/avatar_uws_uwit.png"
          />
          <div class="avatar__intro">
            <h4 class="avatar__name">David</h4>
            <small class="avatar__subtitle">
              Manager
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
            src="/img/avatar/avatar_uws_uwit.png"
          />
          <div class="avatar__intro">
            <h4 class="avatar__name">Ryan</h4>
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
            src="https://avatars.githubusercontent.com/u/89407740?v=4"
          />
          <div class="avatar__intro">
            <h4 class="avatar__name">Michael</h4>
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
            <h4 class="avatar__name">We are hiring!</h4>
            <small class="avatar__subtitle">
              HPC Staff Scientist, apply <a href="https://uwhires.admin.washington.edu/eng/candidates/default.cfm?szCategory=jobprofile&szOrderID=206944&szCandidateID=0&szSearchWords=hpc&szReturnToSearch=1">here</a>.
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