/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import clsx from 'clsx';
import ErrorBoundary from '@docusaurus/ErrorBoundary';
import {
  PageMetadata,
  SkipToContentFallbackId,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import {useKeyboardNavigation} from '@docusaurus/theme-common/internal';
import SkipToContent from '@theme/SkipToContent';
import AnnouncementBar from '@theme/AnnouncementBar';
// bsoni: importing from @theme/Navbar doesn't correctly render our overridden Navbar
import Navbar from '../Navbar';
import Footer from '@theme/Footer';
import LayoutProvider from '@theme/Layout/Provider';
import ErrorPageContent from '@theme/ErrorPageContent';
import { useScrollPercentage } from 'react-scroll-percentage';
import styles from './styles.module.css';
import { useLocation } from '@docusaurus/router';

function Layout(props) {
  const {
    children,
    noFooter,
    wrapperClassName,
    // Not really layout-related, but kept for convenience/retro-compatibility
    title,
    description,
  } = props;

  useKeyboardNavigation();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Scroll notifier calculations
  let effectiveDocumentHeight = 1;
  let scrollPercent = 1;

  try {
    effectiveDocumentHeight = document.body.scrollHeight - window.innerHeight;
    scrollPercent = Math.min(1, window.scrollY / effectiveDocumentHeight);
  } catch (e) {
    // Ignore errors in scroll calculations
  }

  const [scrollRef] = useScrollPercentage();  // purpose of this hook is to refresh data on scroll

  return (
    <LayoutProvider>
      <PageMetadata title={title} description={description} />

      <SkipToContent />

      <AnnouncementBar />

      <Navbar scrollPercent={isHomePage ? undefined : scrollPercent} />

      <div
        id={SkipToContentFallbackId}
        className={clsx(
          ThemeClassNames.wrapper.main,
          styles.mainWrapper,
          wrapperClassName,
        )}
        ref={scrollRef}>
        <ErrorBoundary fallback={(params) => <ErrorPageContent {...params} />}>
          {children}
        </ErrorBoundary>
      </div>

      {!noFooter && <Footer />}
    </LayoutProvider>
  );
}

export default Layout;
