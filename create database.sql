
CREATE TABLE `users` (
  `uid` varchar(36) NOT NULL,
  `name` varchar(45) NOT NULL,
  `email` varchar(320) NOT NULL,
  `passwordHash` varchar(128) NOT NULL,
  `createdAt` datetime NOT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `uid_UNIQUE` (`uid`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `movies` (
  `imdbID` varchar(15) NOT NULL,
  `Title` varchar(128) NOT NULL,
  `Poster` varchar(512) DEFAULT NULL,
  `imdbRating` varchar(5) DEFAULT NULL,
  `imdbVotes` varchar(10) DEFAULT NULL,
  `BoxOffice` varchar(15) DEFAULT NULL,
  `Rated` varchar(15) DEFAULT NULL,
  `Released` varchar(15) DEFAULT NULL,
  `Runtime` varchar(10) DEFAULT NULL,
  `Genre` varchar(128) DEFAULT NULL,
  `Director` varchar(128) DEFAULT NULL,
  `Writer` varchar(128) DEFAULT NULL,
  `Actors` varchar(256) DEFAULT NULL,
  `Plot` varchar(1024) DEFAULT NULL,
  `Awards` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`imdbID`),
  UNIQUE KEY `imdbID_UNIQUE` (`imdbID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `users_movies` (
  `uid` varchar(36) NOT NULL,
  `imdbID` varchar(15) NOT NULL,
  `status` tinyint(4) NOT NULL COMMENT '-1: Not marvel movie\n0: I Don''t like it\n1: Watched\n',
  `createdAt` datetime NOT NULL,
  PRIMARY KEY (`uid`,`imdbID`),
  KEY `movie_fk_idx` (`imdbID`),
  CONSTRAINT `movie_fk` FOREIGN KEY (`imdbID`) REFERENCES `movies` (`imdbID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `user_fk` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

