const request = require('supertest')
const app = require('./index')
import {User as twitterUser} from 'twitter-d'
import { Response } from 'express'

test('/search should return data', () => {
    request(app)
    .get('/search')  
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .then( (x: Response)  => {

        console.log(x)
    })
})


export {}