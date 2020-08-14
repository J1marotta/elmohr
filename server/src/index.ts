const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Twit = require('twit');
require('dotenv').config();

// types
import { Request, Response, NextFunction } from 'express'
import { User as TwitterUser, Status as Tweet } from 'twitter-d'
import { IncomingMessage } from 'http'

const T = new Twit({
  consumer_key: process.env.API_KEY as string,
  consumer_secret: process.env.API_SECRET_KEY as string,
  access_token: process.env.ACCESS_TOKEN as string,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET as string,
})

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Send a 500 otherwise keep going
app.use((_req: Request, res: Response, next: NextFunction) => {
  try {
    next()
  } catch (e) {
    res.sendStatus(500)
  }
})

app.get('/search', async (req: Request, res: Response) => {
  const query = req.query.q as string 
  
  T.get(
    'users/search',
    { q: query },
    (err: Error, data:TwitterUser[], response: IncomingMessage) => {
      if (
        err ||
        (response.statusCode &&
          (response.statusCode <= 200 || response.statusCode >= 300))
      ) {
        console.error('there was an error hitting the search Api', err, response.statusCode)
      }

      res.send(data)
    },
  )
})

type ourParams = { user_id: string; screen_name: string }
type completeTwitUser = TwitterUser & {tweets: Tweet[]}

app.get('/users/:id/:screen_name', async (req: Request, res: Response) => {
  const { user_id, screen_name }: ourParams = req.params as ourParams
   
  T.get(
    'users/show',
    { id: user_id, screen_name },
    (err: Error, userdata: TwitterUser, response: IncomingMessage) => {
      if (
        err ||
        (response.statusCode &&
          (response.statusCode <= 200 || response.statusCode >= 300))
      ) {
        console.error('there was an error hitting the user Api', err,response.statusCode )
      }

    T.get(
      'statuses/user_timeline',
      {id: user_id, screen_name, count: 5},
      (err:Error, tweetdata: Tweet[], response: IncomingMessage) => {
        if (
          err ||
          (response.statusCode &&
            (response.statusCode <= 200 || response.statusCode >= 300))
        ) {
          console.error('there was an error hitting the tweet Api', err, response.statusCode)
        }


      const data: completeTwitUser = {
        ...userdata,
        tweets: tweetdata
      }

      res.send(data)

      })      
    },
  )
})

app.listen(4000)
console.log(
  `Listening on port: 4000, wait for the development server to be up...`,
)

export default app
