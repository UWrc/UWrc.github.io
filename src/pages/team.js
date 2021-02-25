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
            src="https://pbs.twimg.com/profile_images/550415672430194690/g--kJg1N_400x400.png"
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
            src="https://pbs.twimg.com/profile_images/550415672430194690/g--kJg1N_400x400.png"
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
            src="https://pbs.twimg.com/profile_images/550415672430194690/g--kJg1N_400x400.png"
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
            src="https://avatars0.githubusercontent.com/u/37822701?s=460&u=ed7f3e658edacfcd85a4db38fe9e318aa73068e9&v=4"
          />
          <div class="avatar__intro">
            <h4 class="avatar__name">Jerry</h4>
            <small class="avatar__subtitle">
              Intern
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