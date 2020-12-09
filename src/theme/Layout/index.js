/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import clsx from 'clsx';
import AnnouncementBar from '@theme/AnnouncementBar';
import Navbar from '@theme/Navbar';
import Footer from '@theme/Footer';
import LayoutProviders from '@theme/LayoutProviders';
import LayoutHead from '@theme/LayoutHead';
import './styles.css';

import { useScrollPercentage } from 'react-scroll-percentage'

function Layout(props) {
  const {children, noFooter, wrapperClassName} = props;

  // Scroll notifier calculations
  // default initializations
  let effectiveDocumentHeight = 1
  let scrollPercent = 1

  try {
    effectiveDocumentHeight = document.body.scrollHeight - window.innerHeight
    scrollPercent = Math.min(1, window.scrollY / effectiveDocumentHeight)
  } catch (e) {

  }

  const [scrollRef,] = useScrollPercentage()  // purpose of this hook is to refresh data on scroll


  return (
    <LayoutProviders>
      <LayoutHead {...props} />

      <AnnouncementBar />
      <Navbar scrollPercent={scrollPercent} />
      <div className={clsx('main-wrapper', wrapperClassName)} ref={scrollRef}>{children}</div>

      {!noFooter && <Footer />}
    </LayoutProviders>
  );
}

export default Layout;
