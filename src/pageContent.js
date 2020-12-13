import React from "react";
import styles from "pages/components/MapIFrame/styles.module.css"

import MapIFrame from "pages/components/MapIFrame/MapIFrame";


export const HEAD_TITLE = 'Home'
export const HEAD_DESC = 'HYAK Supercomputer'

export const STAT_ITEMS = {
  'Researchers': '2,061',
  'Compute Cores': '18,376',
  'GPUs': '112',
}

export const HomePage = {
  UserInterface: {
    HEADER: <h2>A user interface for everyone</h2>,
    SECTIONS: [
      <p key={0}>
        We support a wide range of user interfaces, whether you're a seasoned command-line 
        interface (CLI) user  who only needs to know the hostname to SSH to, a novice who likes
        the comfort of a graphical user interface (GUI) desktop, or maybe you just prefer the
        convenience of a modern web-browser based experience.
      </p>,
      <p key={1}>
        We serve a web-based <b>Visual Studio Code</b> instance for developers
        (also <code>emacs</code> or <code>vim</code> if that's your thing).
        We have <b>Jupyter Notebooks</b> and <b>RStudio</b> server (both browser based) for 
        data scientists interested in using bigger infrastructure. Even an <b>Xfce</b> GUI 
        for a full on Linux desktop.
      </p>
    ]
  },
  ProgrammingLangs: {
    HEADER: <h2>We speak your language</h2>,
    SECTIONS: [
      <p key={0}>
        Any programming language that runs on an <code>x86-64</code> processor can be supported on HYAK.
        The predominant ones are <b>C/C++</b> as a part of widely deployed scientific applications
        or <b>Python</b> and <b>R</b> for data science and analytics.  If you're a C/C++ or Python
        user, we have a license for <b>Intel Parallel Studio</b> with optimized compilers
        (e.g. <code>icc</code>) to speed up those codebases.
      </p>,
      <p key={1}>
        Other languages such as Go, Perl, Julia, and countless others are used every day on 
        HYAK and you're welcome to bring your own to the community and make the platform yours.
      </p>
    ]
  },
  AppStore: {
    HEADER: <h2>Research App Store</h2>,
    SECTIONS: [
      <p key={0}>
        Not a developer? Not a problem! There is a rich <b>scientific app store</b> on HYAK.
        There are are a number of HYAK maintained modules like <b>MATLAB</b>. Community maintained
        compiled software modules include things like <b>Gaussian</b>, <b>star-ccm</b>, and
        <b> bowtie</b>. We're also seeing increasing use of machine learning frameworks like 
        <b> TensorFlow</b> and <b>PyTorch</b> and we encourage each user to maintain their own
        versioned library using <b>Anaconda</b>.
      </p>,
      <p key={1}>
        Interested in computational best practices?  Don't want to be locked into a platform?
        The best option is to use containers for your code.  We specifically support
        <b> Singularity</b> which is usually interoperable with the more ubiquitous <b>Docker</b>.
        By developing your code locally in a Singularity container, it becomes easily portable
        to HYAK or beyond to national supercomputing centers and the cloud. Your research goes
        wherever you go.
      </p>
    ]
  },
  Help: {
    HEADER: <h2>Need help?</h2>,
    SECTIONS: [
      <p key={0}>
        Shoot us an <a className="purple-link" href="mailto:help@uw.edu?subject=Hyak question">e-mail</a>, join
        our <a className="purple-link" href="https://uw-rcc.slack.com/">Slack</a>, or show up to our in-person
        research hangouts every Tuesday from 1:30 PM to 3:00 PM at our global headquarters in
        the <a className="purple-link" href="https://escience.washington.edu">eScience Institute</a> at the
        University of Washington.  We're also able to meet individually upon request.
      </p>,
      <div key={1} className={styles.mapContainer}>
        <div className={styles.blankMap} />
        <MapIFrame
          key="1"
          title="Intergalactic HQ"
          name="4545 Building"
          align="right"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2687.179163071817!2d-122.31451588483776!3d47.66151577918835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5490148afd210277%3A0x378526e9274172e1!2sForty-Five%20Forty-Five%20Building%2C%204545%2015th%20Ave%20NE%2C%20Seattle%2C%20WA%2098105!5e0!3m2!1sen!2sus!4v1572905266626!5m2!1sen!2sus"
        />
        <MapIFrame
          key="2"
          title="Global HQ"
          name="UW eScience Institute"
          align="left"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2687.5986053468737!2d-122.31397348483813!3d47.653366479187774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x549014f277b0f15d%3A0x7c2434f079426d8c!2seScience%20Institute!5e0!3m2!1sen!2sus!4v1572905032160!5m2!1sen!2sus"
        />
        <div className={styles.blankMap} />
      </div>
    ]
  },
  BuiltWith: {
    HEADER: <h2>Our tech stack</h2>
  },
  PoweredBy: {
    HEADER: <h2>Powered by</h2>
  }
}
