import type { NextPage } from 'next';
import Head from '../components/Head';
import NavBar from '../components/nav-bar/Navbar';
import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {
  return (
    <div className="page-container">
      <Head title="Home" description="Spin to get random movie suggestion across marvel heros !!!" />

      <NavBar />
    </div>
  );
};

export default Home;
