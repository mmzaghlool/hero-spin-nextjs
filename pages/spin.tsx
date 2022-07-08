import { useContext } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import StarRatings from 'react-star-ratings';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import { API } from '../backend/utils/constants';
import { Movie } from '../backend/models/Movie';
import Head from '../components/Head';
import NavBar from '../components/nav-bar/Navbar';
import styles from '../styles/movie.module.scss';
import { UserContext } from '../configs/UserContext';
import Survey from '../components/spen/survey/Survey';

export const getServerSideProps: GetServerSideProps = async ({ query, req, res }) => {
  const hero = query.hero || null;
  const uid = getCookie('UID', { req, res });
  const authorization = getCookie('ACCESS', { req, res }) as string;

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
  movie: Movie;
};

const Spin: NextPage<P> = ({ hero, movie }) => {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const { Poster, Title, Actors, Awards, BoxOffice, Director, Genre, Plot, Rated, Released, Runtime, imdbRating, imdbVotes, Writer } =
    movie;

  return (
    <div className="page-container">
      <Head title="Spin" description="Spin to get random movie suggestion across marvel heros !!!" />

      <NavBar />

      <div className={styles.content}>
        <div className={styles.movie}>
          <img className={styles.poster} src={Poster} alt="cover image" />

          <div className={styles.data}>
            {/* Heading */}
            <h1>{Title}</h1>

            {/* Rating */}
            <div className={styles.rate}>
              <p>{imdbRating}</p>
              <StarRatings starRatedColor="#FFD500" rating={1} starDimension="2rem" numberOfStars={1} name={'rate'} />
              <p>{`(${imdbVotes} Ratings)`}</p>
            </div>

            {/* Description */}
            <p>{Plot}</p>

            <table>
              <tbody>
                <Row title="Director" value={Director} />
                <Row title="Writers" value={Writer} />
                <Row title="Actors" value={Actors} />
                <Row title="Awards" value={Awards} />
                <Row title="Genres" value={Genre} />
                <Row title="Release date" value={Released} />
                <Row title="Box office" value={BoxOffice} />
                <Row title="Duration" value={Runtime} />
                <Row title="Rate" value={Rated} />
              </tbody>
            </table>
          </div>
        </div>

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
      </div>
    </div>
  );
};

export default Spin;

type RowProps = {
  title: string;
  value: string;
};

const Row = ({ title, value }: RowProps) => (
  <tr className={styles.row}>
    <td>{title} </td>
    <td className={styles.value}>{value}</td>
  </tr>
);
