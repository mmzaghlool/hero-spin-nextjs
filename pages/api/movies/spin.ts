import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Op } from 'sequelize';
import sequelize from '../../../backend/core/sequelize';
import MovieModel, { Movie } from '../../../backend/models/Movie';
import UserMovieModel from '../../../backend/models/UsersMovies';
import { API_KEY } from '../../../backend/utils/constants';
import JWT from '../../../backend/utils/JWT';

type Data = {
  success: boolean;
  movie?: Movie | null;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'GET') {
    const { uid, hero } = req.query;
    const { authorization } = req.headers;

    if (typeof uid === 'string') {
      const valid = JWT.checkUser(uid, authorization);

      if (!valid) {
        return res.status(401).json({ success: false });
      }

      const movie = await handleGetMovie(hero as string, uid);
      return res.status(200).json({ success: true, movie });
    }

    const movie = await handleGetMovie(hero as string);
    return res.status(200).json({ success: true, movie });
  }

  res.status(404).json({ success: false });
}

/**
 * Fetch random movie from local DB
 * If there is missing data or not found fetch it from "omdbapi"
 */
async function handleGetMovie(hero?: string, uid?: string) {
  let movie = await getRandomMovie(hero, uid).then((m) => m?.get() || null);

  /**
   * if no movie found and user selected specific hero ... fetch this hero movies from "omdbapi"
   *
   * Only happens if local DB is empty
   */
  if (!movie && hero !== undefined) {
    await fetchNewMovies(hero);
    movie = await getRandomMovie(hero, uid).then((m) => m?.get() || null);
  }

  /**
   * If movie is exists but its data not found ... fetch it from "omdbapi"
   */
  if (movie && movie.imdbRating === null) {
    movie = await fetchMovieDetails(movie.imdbID);
  }

  return movie;
}

/**
 * Query to the local database
 */
async function getRandomMovie(hero?: string, uid?: string) {
  // Filter movies with no posters
  const where: any = { Poster: { [Op.not]: 'N/A' } };

  // Filter by hero if exists
  if (hero) where.Title = { [Op.substring]: hero };

  // Filter the watched and blocked movies
  if (uid) {
    const ids = await UserMovieModel.findAll({ attributes: ['imdbID'], where: { uid: { [Op.eq]: uid } } }).then((m) =>
      m.map((movie) => movie.get('imdbID')),
    );
    where.imdbID = { [Op.notIn]: ids };
  }

  return MovieModel.findOne({ where, order: [sequelize.fn('RAND')], limit: 1 });
}

type MovieSearch = { Title: string; imdbID: string; Poster: string };
type Response = { Search: MovieSearch[]; totalResults: number; Response: 'True' | 'False' };

/**
 * Fetch all movies list for specific hero
 */
async function fetchNewMovies(hero: string, page = 1) {
  const { Search, Response }: Response = await axios({
    url: `http://www.omdbapi.com/?apikey=${API_KEY}&page=${page}&type=movie&s=${hero}`,
  }).then((res) => res.data);

  // End the loop if there is no other movies
  if (Response === 'False') return;

  await MovieModel.bulkCreate(
    Search.map((v) => ({ imdbID: v.imdbID, Title: v.Title, Poster: v.Poster })),
    {
      fields: ['imdbID', 'Title', 'Poster'],
      updateOnDuplicate: ['Title'],
    },
  );

  // Get the next page
  await fetchNewMovies(hero, page + 1);
}

type FetchMovieType = Movie & { Response: 'True' | 'False' };

/**
 * Get all movie details using imdbID
 */
async function fetchMovieDetails(imdbID: string) {
  const movie: FetchMovieType = await axios({
    url: `http://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`,
  }).then((res) => res.data);

  if (movie.Response === 'False') return null;

  const { imdbRating, imdbVotes, BoxOffice, Rated, Released, Runtime, Genre, Director, Writer, Actors, Plot, Awards } = movie;

  await MovieModel.update(
    { imdbRating, imdbVotes, BoxOffice, Rated, Released, Runtime, Genre, Director, Writer, Actors, Plot, Awards },
    { where: { imdbID } },
  );

  return MovieModel.findOne({ where: { imdbID } }).then((m) => m?.get() || null);
}
