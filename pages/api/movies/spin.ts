import type { NextApiRequest, NextApiResponse } from 'next';
import Movie from '../../../types/Movie';

type Data = {
  success: boolean;
  movie?: Movie;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'GET') {
    const { hero } = req.query;
    // const movie = await getRandomMovie(hero as string);

    return res.status(200).json({ success: true, movie: movieExample });
  }

  res.status(404).json({ success: false });
}

async function getRandomMovie(hero?: string) {
  return movieExample;
}

const movieExample: Movie = {
  Title: 'The Avengers',
  Rated: 'PG-13',
  Released: '04 May 2012',
  Runtime: '143 min',
  Genre: 'Action, Adventure, Sci-Fi',
  Director: 'Joss Whedon',
  Writer: 'Joss Whedon, Zak Penn',
  Actors: 'Robert Downey Jr., Chris Evans, Scarlett Johansson',
  // eslint-disable-next-line max-len
  Plot: "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
  Awards: 'Nominated for 1 Oscar. 38 wins & 80 nominations total',
  Poster:
    'https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
  imdbRating: '8.0',
  imdbVotes: '1,361,604',
  imdbID: 'tt0848228',
  BoxOffice: '$623,357,910',
};
