import React from 'react';
import NavbarLayout from './Layout';
import NavbarContent from './Content';

export default function Navbar({ scrollPercent }) {
  return (
    <NavbarLayout>
        <NavbarContent scrollPercent={scrollPercent} />
    </NavbarLayout>
  );
}
