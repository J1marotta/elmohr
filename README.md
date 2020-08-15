A small application using React and Node to interact with Twitter API
as part of Elmo HR onboarding test.

You can see my thoughts on the process inside [Thoughts](./thoughts.md)

To run the application
You will need your own twitter developer api to run the server

```sh
  cd server && touch .env
```

copy and paste the following into the .env file and fill in your credentials

```
API_KEY=
API_SECRET_KEY=
ACCESS_TOKEN=
ACCESS_TOKEN_SECRET=

```

for the client

```sh
 cd client/ npm i && npm run start

```

You can run tests for the client with `npm run test`

for the server

```sh
 cd server/  npm i && npm run start:dev
```

Two starter templates were used to reduce config time, more details can be found inside the client and server folders.
