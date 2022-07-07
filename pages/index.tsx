import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import Head from '../components/Head';
import NavBar from '../components/nav-bar/Navbar';
import styles from '../styles/Home.module.scss';
import { marvelHeros } from '../types/MarvelHeros';

// eslint-disable-next-line no-undef
let interval: NodeJS.Timer;

const Home: NextPage = () => {
  const router = useRouter();

  // Spin button animation
  useEffect(() => {
    const button = document.getElementById('spin-button');
    let op = 0.2;
    let increase = true;

    if (!button) return;

    clearInterval(interval);
    interval = setInterval(() => {
      if (increase) {
        op += 0.1;
        if (op > 1) increase = false;
      } else {
        op -= 0.1;
        if (op < 0.2) increase = true;
      }

      button.style.opacity = op + '';
    }, 50);
  }, []);

  return (
    <div className="page-container">
      <Head title="Home" description="Spin to get random movie suggestion across marvel heros !!!" />

      <NavBar />

      <div className={styles.content}>
        <img className={styles.cover} src="/covers/home.webp" alt="cover image" />

        {/* Heading */}
        <h1>Let us find your next marvel movie !</h1>
        <p>Just spin or choose your favorite hero and let us find your next movie to watch</p>

        {/* Buttons */}
        <div className={styles.buttons}>
          {/* Spin button */}
          <button className={styles.spin} id="spin-button" onClick={() => router.push('/spin')}>
            Spin
            <p>find random hero movie</p>
          </button>

          {/* Break line */}
          <div className={styles.column}>
            <div className={styles.line} />
            <p>OR</p>
            <div className={styles.line} />
          </div>

          {/* Choose hero button */}
          <div className={styles.hero}>
            <Dropdown className={styles.dropdown} onSelect={(key) => router.push('/spin?hero=' + key)}>
              <Dropdown.Toggle>Select your hero</Dropdown.Toggle>

              <Dropdown.Menu>
                {marvelHeros.map((v, i) => (
                  <Dropdown.Item key={`hero-${i}`} eventKey={v}>
                    {v}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
