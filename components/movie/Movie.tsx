import type { NextPage } from 'next';
import StarRatings from 'react-star-ratings';
import { Movie } from '../../backend/models/Movie';
import Head from '../Head';
import NavBar from '../nav-bar/Navbar';
import styles from './Movie.module.scss';

type P = {
  movie: Movie;
  // eslint-disable-next-line no-undef
  children?: JSX.Element;
  title: string;
  description: string;
};

const Movie: NextPage<P> = ({ movie, children = null, title, description }) => {
  const { Poster, Title, Actors, Awards, BoxOffice, Director, Genre, Plot, Rated, Released, Runtime, imdbRating, imdbVotes, Writer } =
    movie;

  return (
    <div className="page-container">
      <Head title={title} description={description} />

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

        {children}
      </div>
    </div>
  );
};

export default Movie;

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
