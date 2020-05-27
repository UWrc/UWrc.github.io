import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import 'react-bootstrap';

import React, { Component, useRef } from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';
import { render } from 'react-dom';

import StatContainer from './components/stats';


function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;

  const UserInterface = () => {
    if ((siteConfig.customFields.interfaces || []).length === 0) {
      return <p>len was 0</p>
    }

    const pics = siteConfig.customFields.interfaces
      .map(item => (
        <img key={item.caption} src={useBaseUrl(item.image)} alt={item.caption} />
      ))

    return (
      <div className="logo-container pt-3">
        <h2>A User Interface for Everyone</h2>
        <div className="logos">{pics}</div>
        <p>
            We support a wide range of user interfaces, whether you're a seasoned command-line 
            interface (CLI) user  who only needs to know the hostname to SSH to, a novice who likes
            the comfort of a graphical user interface (GUI) desktop, or maybe you just prefer the
            convenience of a modern web-browser based experience.
          </p>
          <p>
            We serve a web-based <b>Visual Studio Code</b> instance for developers
            (also <code>emacs</code> or <code>vim</code> if that's your thing).
            We have <b>Jupyter Notebooks</b> and <b>RStudio</b> server (both browser based) for 
            data scientists interested in using bigger infrastructure. Even an <b>Xfce</b> GUI 
            for a full on Linux desktop.
          </p>
      </div>
    )
  }

  const ProgLangs = () => {

    if ((siteConfig.customFields.progLangs || []).length === 0) {
      return null
    }

    const pics = siteConfig.customFields.progLangs
      .map(item => (
        <img key={item.caption} src={useBaseUrl(item.image)} alt={item.caption} />
      ))

    return (
      <div className="logo-container pt-3">
        <h2>We Speak Your Language</h2>
        <div className="logos">{pics}</div>
        <p>
          Any programming language that runs on an <code>x86-64</code> processor can be supported on HYAK.
          The predominant ones are <b>C/C++</b> as a part of widely deployed scientific applications
          or <b>Python</b> and <b>R</b> for data science and analytics.  If you're a C/C++ or Python
          user, we have a license for <b>Intel Parallel Studio</b> with optimized compilers
          (e.g. <code>icc</code>) to speed up those codebases.
        </p>
        <p>
          Other languages such as Go, Perl, Julia, and countless others are used every day on 
          HYAK and you're welcome to bring your own to the community and make the platform yours.
        </p>
      </div>
    )
  }

  const AppStore = () => {

    if ((siteConfig.customFields.appStore || []).length === 0) {
      return null
    }

    const pics = siteConfig.customFields.appStore
      .map(item => (
        <img key={item.caption} src={useBaseUrl(item.image)} alt={item.caption} />
      ))

    return (
      <div className="logo-container pt-3">
        <h2>Research App Store</h2>
        <div className="logos">{pics}</div>
        <p>
          Not a developer? Not a problem! There is a rich <b>scientific app store</b> on HYAK.
          There are are a number of HYAK maintained modules like <b>MATLAB</b>. Community maintained
          compiled software modules include things like <b>Gaussian</b>, <b>star-ccm</b>, and
          <b> bowtie</b>. We're also seeing increasing use of machine learning frameworks like 
          <b> TensorFlow</b> and <b>PyTorch</b> and we encourage each user to maintain their own
          versioned library using <b>Anaconda</b>.
        </p>
        <p>
          Interested in computational best practices?  Don't want to be locked into a platform?
          The best option is to use containers for your code.  We specifically support
          <b> Singularity</b> which is usually interoperable with the more ubiquitous <b>Docker</b>.
          By developing your code locally in a Singularity container, it becomes easily portable
          to HYAK or beyond to national supercomputing centers and the cloud. Your research goes
          wherever you go.
        </p>
      </div>
    )
  }

  const NeedHelp = () => {

    if ((siteConfig.customFields.contact || []).length === 0) {
      return null
    }

    const pics = siteConfig.customFields.contact
      .map(item => (
        <a href={item.link} key={item.caption}>
          <img key={item.caption} src={useBaseUrl(item.image)} alt={item.caption} />
        </a>
      ))

    const Map = props => {
      return (
        <div className={"map " + props.align}>
          <div>
            <p className="title">{props.title}</p>
            <iframe src={props.src} />
            <p>{props.name}</p>
          </div>
        </div>
      )
    }

    return (
      <div className="logo-container pt-3">
        <h2>Need Help?</h2>
        <div className="logos">{pics}</div>
        <p>
          Shoot us an <a href="mailto:help@uw.edu?subject=Hyak question">e-mail</a>, join
          our <a href="https://uw-rcc.slack.com/">Slack</a>, or show up to our in-person 
          research hangouts every Tuesday from 1:30 PM to 3:00 PM at our global headquarters in
          the <a href="https://escience.washington.edu">eScience Institute</a> at the 
          University of Washington.  We're also able to meet individually upon request.
        </p>
        <div className="map-container">
          <div className="blank-map" />
          <Map key="1" title="Intergalactic HQ" name="4545 Building" align="right" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2687.179163071817!2d-122.31451588483776!3d47.66151577918835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5490148afd210277%3A0x378526e9274172e1!2sForty-Five%20Forty-Five%20Building%2C%204545%2015th%20Ave%20NE%2C%20Seattle%2C%20WA%2098105!5e0!3m2!1sen!2sus!4v1572905266626!5m2!1sen!2sus" />
          <Map key="2" title="Global HQ" name="UW eScience Institute" align="left" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2687.5986053468737!2d-122.31397348483813!3d47.653366479187774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x549014f277b0f15d%3A0x7c2434f079426d8c!2seScience%20Institute!5e0!3m2!1sen!2sus!4v1572905032160!5m2!1sen!2sus" />            
          <div className="blank-map" />
        </div>
      </div>
    )
  }

  const BuiltWith = () => {
    if ((siteConfig.customFields.builtWith || []).length === 0) {
      return null
    }

    const pics = siteConfig.customFields.builtWith
      .map(item => (
        <img key={item.caption} src={useBaseUrl(item.image)} alt={item.caption} />
      ))

    return (
      <div className="logo-container pt-3">
        <h2>Built With</h2>
        <div className="logos">{pics}</div>
      </div>
    )
  }

  const PoweredBy = () => {
    if ((siteConfig.customFields.poweredBy|| []).length === 0) {
      return null
    }

    const pics = siteConfig.customFields.poweredBy
      .map(item => (
        <img key={item.caption} src={useBaseUrl(item.image)} alt={item.caption} />
      ))

    return (
      <div className="logo-container pt-3 pb-3">
        <h2>Powered By</h2>
        <div className="mini-logos">{pics}</div>
      </div>
    )
  }

  const SplashCol = props => {

    const column = side => {
      if (side == "left") {
        if ((siteConfig.customFields.splashArt.left || []).length == 0) {
          return null
        }
        return siteConfig.customFields.splashArt.left
          .map((item, i) => (
            <div 
              className={
                `splash-side-img animate__animated animate__fadeInLeft animate__delay-${i+1}s ` + side
              }
              key={i}
            >
              <img src={useBaseUrl(item.image)} key={item.caption} alt={item.caption} />
            </div>
          ))
      } else if (side == "right") {
        if ((siteConfig.customFields.splashArt.right || []).length == 0) {
          return null
        }
        return siteConfig.customFields.splashArt.right
          .map((item, i) => (
            <div 
              className={
                `splash-side-img animate__animated animate__fadeInRight animate__delay-${i+1}s ` + side
              }
              key={i}
            >
              <img src={useBaseUrl(item.image)} key={item.caption} alt={item.caption} />
            </div>
          ))
      }
      return null
    }

    return (
      <div className="splash-side">{column(props.side)}</div>
    )    
  }

  const Header = () => {
    return (
      <header className={classnames('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <div className="splash-wrapper">
            <SplashCol side="left" key="left" />
            <div className="splash-middle" key="middle">
              <img className="hyak-splash" src={useBaseUrl(siteConfig.customFields.splashLogo)} alt='Hyak Logo' />
              <p className="tagline">{siteConfig.tagline}</p>
              <div className={styles.buttons}>
                <Link
                  className={classnames(
                    'button button--outline button--secondary button--lg',
                    styles.getStarted,
                  )}
                  to={useBaseUrl('docs/setup')}>
                  Get Started
                </Link>
              </div>
            </div>
            <SplashCol side="right" key="right" />
          </div>
        </div>
      </header>
    )
  }


  return (
    <Layout
      title="Home"
      description="HYAK Next Gen Supercomputer Homepage"
    >
      <Header />
      <StatContainer />
      <UserInterface />
      <ProgLangs />
      <AppStore />
      <NeedHelp />
      <BuiltWith />
      <PoweredBy />
    </Layout>
  );
}

export default Home;
