import Link from 'next/link';
import type { GetServerSideProps, NextPage } from 'next';
import { getCookie } from 'cookies-next';
import { API } from '../../backend/utils/constants';
import Head from '../../components/Head';
import NavBar from '../../components/nav-bar/Navbar';
import Button from '../../components/forms/Button';
import { Movie } from '../../backend/models/Movie';
import RenderMovie from '../../components/movie/Movie';
import styles from '../../styles/history.module.scss';

export const getServerSideProps: GetServerSideProps = async ({ query, req, res }) => {
  const { imdbID } = query;
  const authorization = getCookie('ACCESS', { req, res }) as string;

  const movie = await fetch(`${API}/api/movie/${imdbID}`, { headers: authorization ? { authorization } : {} })
    .then((res) => res.json())
    .then((res) => res.movie);

  return { props: { movie } };
};

type P = { movie: Movie | null };

const Movie: NextPage<P> = ({ movie }) => {
  if (!movie) {
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

  return <RenderMovie title="History" description="View your watch history" movie={movie} />;
};

export default Movie;
