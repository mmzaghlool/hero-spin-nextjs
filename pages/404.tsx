import { useRouter } from 'next/router';
import NavBar from '../components/nav-bar/Navbar';

import styles from '../styles/404.module.scss';

const NotFound = () => {
  const history = useRouter();

  return (
    <div className="page-container">
      <NavBar />

      <div className={styles.content}>
        <p className={styles['not-found']}>404</p>
        <h1>The page you are looking for was not found</h1>
      </div>
    </div>
  );
};

export default NotFound;
