# Hero Spin

Sometimes, having too many options can be overwhelming. We’ve all been there. Restaurants with long menus, a piece of clothing in many different colors, and of course, a quiet evening in front of the TV, not knowing what to watch. Especially with the last one, sometimes it would be great if someone could make that call for us. And since most of us, are also playing with our phone, while in front of the TV (if not also controlling the TV), what could be better than an app, that randomly picks a show for you.

(React + NextJS + TS) Full-stack project to recommend a movie from marvel movies to watch using IMDB’s open movie API and local MySQL database for customizing the user experience and cashing the results.

## Features

### Anonymous User

All/Any users can request spin request which gets random movie from marvel movies stored in OMDb API OR requests a random movie of a specific hero character.

### Registered User

Registered users has some unique features like storing history, and blocked movies.

The history can be viewed later in the history tab in the navbar, and the blocked/unwanted movies are stored to not be suggested again.

Any movie that is marked as viewed or blocked will never be suggested again for this user.

### Dark Mode

This app contains light/dark mode switch feature, which can be found in the top left corner of the page "most left of the navbar".

The initial value is determined from the system preferences found in the first website open then the desired configuration is stored in the local storage.

### SEO Enabled

This website is SEO Enabled with the following lighthouse results ... Which can be much better with production ready servers, and better meta description texts.

#### Home Page

![Home SEO](https://hero-spin.mostafa-mahmoud.com/docs/home-seo.png)

#### Spin Page

![Spin SEO](https://hero-spin.mostafa-mahmoud.com/docs/spin-seo.png)

#### History Page

![History SEO](https://hero-spin.mostafa-mahmoud.com/docs/history-seo.png)

#### Movie Page

![Movie SEO](https://hero-spin.mostafa-mahmoud.com/docs/movie-seo.png)

## Mechanism

1. User request a movie suggestion
2. The backend searches for a result in the local MySQL DB, If any movie is found it suggests it to the user.
3. If there are no movies found OR it's a registered user who has watched all available movies, the backend fetches/updates the results from the OMDb API.
4. Firstly it just stores the primary movie data (id, title, and poster image).
5. If the suggested movie does not contain all the details in the local DB it fetches it from OMDb and updates the local database and returns the result to the user.

## Database ERD

It contains 3 tables:

1. `users`: basic user data (uid, name, email, passwordHash, createdAt)
2. `movies`: movie details data (imdbID, Title, Poster, imdbRating, imdbVotes, BoxOffice, Rated, Released, Runtime, Genre, Director, Writer, Actors, Plot, Awards)
3. `users_movies` M:N relation between `users` and `movies` tables (uid, imdbID, status, createdAt),
   - status: -1: Not marvel movie, 0: I Don't like it, 1: Watched

![Database ERD](https://hero-spin.mostafa-mahmoud.com/docs/erd.png)

## Users data client side storage

There is 3 methodologies used

1. Context:
   1. user: logged in user data "Used internally in the client side to render the user specific data"
2. Local storage:
   1. REFRESH_TOKEN: Used to request the user and refresh the access token on refresh
   2. THEME: Selected theme (light - dark)
3. Cookies:
   1. uid: User id
   2. ACCESS: Token that used in authorization by backend when requesting the user data "This token is stored encrypted using AES encryption"

## Required env variables

1. ACCESS_TOKEN_SECRET: Secret used as a key for encryption and decryption of the JWT access token
2. REFRESH_TOKEN_SECRET: Secret used as a key for encryption and decryption of the JWT refresh token
3. ENCRYPTION_KEY: Secret used as a key for encryption and decryption of the JWT access token on the client side to be stored in cookies securely
4. DATABASE_NAME: Database schema name
5. DATABASE_HOST: Database server host url
6. DATABASE_USER: Database user id
7. DATABASE_PASS: Database user password
8. API_KEY: OMDb API Key, Generate one here `http://www.omdbapi.com/apikey.aspx`

## Deployed on Vercel

Deployed on vercel here `https://hero-spin.mostafa-mahmoud.com/`

## Suggested future updates

1. Filtering the movies that is marked as `Not a marvel movie` based on the watched/blocked ratio with specific number of feedbacks.
