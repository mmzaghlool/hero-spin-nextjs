import { useState } from 'react';
import type { NextComponentType } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Navbar } from 'react-bootstrap';
import SVG from 'react-inlinesvg';

import styles from './Navbar.module.scss';

const NavBar: NextComponentType = () => {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  const { pathname } = router;

  const isCurrentPath = (path: string) => (pathname === path ? styles.active : undefined);

  return (
    <Navbar expanded={expanded} expand="md" className={styles.nav} collapseOnSelect>
      <div className={styles.navContainer}>
        {/* Title */}
        <div className={styles.title}>
          <Link passHref href="/">
            <p>Hero Spin</p>
          </Link>
        </div>

        {/* Mobile toggle */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" className={styles['toggle-btn']} onClick={() => setExpanded((p) => !p)}>
          <SVG src="/assets/hamburger.svg" />
        </Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav" className={styles['navbar-collapse']}>
          <ul>
            <NavLink path="/">Home</NavLink>
            <NavLink path="/history">History</NavLink>
            <NavLink path="/settings">Settings</NavLink>
          </ul>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default NavBar;

type NavLinkProps = {
  path: string;
  children: string;
};

const NavLink = ({ path, children }: NavLinkProps) => {
  const router = useRouter();
  const { pathname } = router;

  const isCurrentPath = (p: string) => (pathname === p ? styles.active : undefined);

  return (
    <li>
      <Link passHref href={path}>
        <p className={isCurrentPath(path)}>{children}</p>
      </Link>
    </li>
  );
};
