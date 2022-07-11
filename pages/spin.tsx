import { useContext } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { API } from '../backend/utils/constants';
import { Movie } from '../backend/models/Movie';
import Head from '../components/Head';
import NavBar from '../components/nav-bar/Navbar';
import { UserContext } from '../configs/UserContext';
import Survey from '../components/spen/survey/Survey';
import RenderMovie from '../components/movie/Movie';
import AccessCookie from '../configs/AccessCookie';
import UIDCookie from '../configs/UIDCookie';
import styles from '../components/movie/Movie.module.scss';

export const getServerSideProps: GetServerSideProps = async ({ query, req, res }) => {
  const hero = query.hero || null;
  const uid = UIDCookie.getUid(req, res);
  const authorization = AccessCookie.getToken(req, res);

  let link = `${API}/api/movies/spin?`;
  if (hero) {
    link = link.concat(`hero=${hero}&`);
  }
  if (uid) {
    link = link.concat(`uid=${uid}&`);
  }

  const movie = await fetch(link, { headers: authorization ? { authorization } : {} })
    .then((res) => res.json())
    .then((res) => res.movie);

  return { props: { hero, movie } };
};

type P = {
  hero: string | null;
  movie: Movie | null;
};

const Spin: NextPage<P> = ({ hero, movie }) => {
  const { user } = useContext(UserContext);
  const router = useRouter();

  if (movie === null) {
    return (
      <div className="page-container">
        <Head title="Spin" description="Spin to get random movie suggestion across marvel heros !!!" />

        <NavBar />

        <div className={styles.content}>
          <h1>Sorry we did not found a movie you did not watch</h1>
          <p>You watched all our movies please try selecting {hero ? 'other hero' : 'a specific hero'}</p>
        </div>
      </div>
    );
  }

  return (
    <RenderMovie title="Spin" description="Spin to get random movie suggestion across marvel heros !!!" movie={movie}>
      <>
        {/* Render survey */}
        {user === undefined && (
          <>
            <h2>Did not like the result?</h2>
            <p>
              Whether you did not like the result or already watched that movie just{' '}
              <a href="#" onClick={() => router.reload()}>
                re-spin to get a new result
              </a>
            </p>
          </>
        )}
        {!!user && <Survey imdbID={movie.imdbID} />}
      </>
    </RenderMovie>
  );
};

export default Spin;
