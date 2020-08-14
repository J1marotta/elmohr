Here is my footnotes about what challenges, I experiences while doing this application, and also just a log of my thoughts along the way.  

Given the time limit, I decided to use a CRA template with typescript and redux already included, and I found [typekit ](https://github.com/rrebase/cra-template-typekit)

Which has TS and redux-toolkit ready to start 

As for the node server I'm using [simple-typescript-starter](https://github.com/stemmlerjs/simple-typescript-starter)

This helped me get over the inital set up hurdles and move to code over config.

My First challenge was understanding Twitter API, as I've not interacted with and API that had `OAuth 1.0` authentication. Twitter docs bounced me around a bit before I understood what was required.

I've not worked with a complex api like this before ( coming from mostly front end development where internal engineers were exposing the endpoints )

###### Node commonjs vs Typescript and esm

Lots of challenges with node and TS. 

My node and Typescript abilites are well behind where I'd like them, luckily the node server is quite basic but I a lot of troubles with when to use commonjs vs esm because you can `import` types but then I was still writing node in commonjs

My current experience with Typescript is more time figuring out types rather than writing code, obviously it improves with practice.

But for example

```js
    const x : int | null;
    const fn = (x : int) = { 
    // some calculation
    }


    ;[x].filter(Boolean).map(
    f(x) // type error could be null
    )
 
```
we filter Boolean, so it can't be null, but TS says it can, and if you map the empty array the function doesn't run so it's not going to run with null. 

A lot of my time is figuring out why TS is saying something like this. 

or another example from my code my secret keys for twitter api

```js
const T = new Twit({
  consumer_key: process.env.API_KEY as string,
  consumer_secret: process.env.API_SECRET_KEY as string,
  access_token: process.env.ACCESS_TOKEN as string,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET as string,
})
```
There must be a better way to utilise types than this.


#### Using the twitter api

 This is an understandbly very complex api, but the documentation was pretty lacking in terms of readability.
 It took me a while to realise tweets don't come for free when you search a user. So I had to then merge them together on my own. 

 Once I got the Api going using a npm package it wasn't too challenging, but I'd be really keen to talk about what is standard development practices for node.







