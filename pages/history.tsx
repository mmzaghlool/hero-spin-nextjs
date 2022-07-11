import { useContext } from 'react';
import Link from 'next/link';
import type { GetServerSideProps, NextPage } from 'next';
import { API } from '../backend/utils/constants';
import Head from '../components/Head';
import NavBar from '../components/nav-bar/Navbar';
import { UserContext } from '../configs/UserContext';
import styles from '../styles/history.module.scss';
import Button from '../components/forms/Button';
import AccessCookie from '../configs/AccessCookie';
import UIDCookie from '../configs/UIDCookie';

export const getServerSideProps: GetServerSideProps = async ({ query, req, res }) => {
  const uid = UIDCookie.getUid();
  const authorization = AccessCookie.getToken();

  if (!uid) {
    return { props: { movies: null } };
  }
  const movies = await fetch(`${API}/api/movies/${uid}`, { headers: authorization ? { authorization } : {} })
    .then((res) => res.json())
    .then((res) => res.movies);

  return { props: { movies } };
};

type MovieHead = { imdbID: string; Title: string; Poster: string };
type P = { movies: MovieHead[] | null };

const History: NextPage<P> = ({ movies }) => {
  const { user } = useContext(UserContext);

  if (!movies) {
    return (
      <div className="page-container">
        <Head title="History" description="View your watch history" />
        <NavBar />

        <div className={styles.login}>
          <h1>You need to login to your account to access this page</h1>
          <Link href={'/login'}>
            <Button>Login</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Head title="History" description="View your watch history" />
      <NavBar />

      <div className={styles.content}>
        <h1>You can view your movies that marked as will watch here</h1>
        <div className={styles.movies}>
          {movies.map((v, i) => (
            <Card key={`movie-${i}`} {...v} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;

const Card = ({ imdbID, Title, Poster }: MovieHead) => (
  <Link href={`/movies/${imdbID}`}>
    <div className={styles.card}>
      <img src={Poster} alt={Title} />
      <p>{Title}</p>
    </div>
  </Link>
);
