const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Twit = require('twit');
require('dotenv').config();

// types
import { Request, Response, NextFunction } from 'express';
import { User as TwitterUser } from 'twitter-d';
import { IncomingMessage } from 'http';

const T = new Twit({
  consumer_key: process.env.API_KEY as string,
  consumer_secret: process.env.API_SECRET_KEY as string,
  access_token: process.env.ACCESS_TOKEN as string,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET as string,
});

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Send a 500 otherwise keep going
app.use((req: Request, res: Response, next: NextFunction) => {
  try {
    next();
  } catch (e) {
    res.sendStatus(500);
  }
});

app.get('/', async (req: Request, res: Response) => {
  res.send('hello');
});

app.get('/search', async (req: Request, res: Response) => {
  T.get(
    'users/search',
    { q: req.query.q },
    (err: Error, data: TwitterUser[], response: IncomingMessage) => {
      if (
        err ||
        (response.statusCode &&
          (response.statusCode >= 200 || response.statusCode <= 300))
      ) {
        console.error('there was an error hitting the twitter Api');
      }

      res.send(data);
    },
  );
});

app.listen(4000);
console.log(
  `Listening on port: 4000, wait for the development server to be up...`,
);

