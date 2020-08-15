## My Thoughts

Here is my footnotes about what I experiences while doing this application, and also just a log of my thoughts along the way.

Given the time limit, I decided to use a CRA template with typescript and redux already included, and I found [typekit ](https://github.com/rrebase/cra-template-typekit)
Which has TS and redux-toolkit ready to start I later scapped that for the redux-ts offical template which worked out much better

As for the node server I'm using [simple-typescript-starter](https://github.com/stemmlerjs/simple-typescript-starter)

This helped me get over the inital set up hurdles and move to code over config.

My First challenge was understanding Twitter API, as I've not interacted with and API that had `OAuth 1.0` authentication. Twitter docs bounced me around a bit before I understood what was required.

## Node commonjs vs Typescript and esm

---

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
but it will work with an `if`

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

Is this the right way to go about it?

Actually a case I use a lot (which no one except me likes)
Which I was trying to do in Viewer.tsx on the client before I had to move on because of time restraints

```js

  const component = ({status}) => {
    const data = useState()

    return {
      'idle': () => <div>Welcome</div>
      'error': () => <div>Something went wrong </div>
      'ready': () => <div>{data}</div>
    }[status || 'idle']

  }

```

I really like this paradigm as it gives you a nice and neat finite state machine. I've not figured out how to do it in TS
I believe the answer lies in `key of` Would love to chat about this one.

## Using the twitter api

---

This is an understandbly very complex api, but the documentation was pretty lacking in terms of readability.
It took me a while to realise tweets don't come for free when you search a user. So I had to then merge them together on my own.

Once I got the Api going using a npm package it wasn't too challenging, but I'd be really keen to talk about what is standard development practices for node.

## Front end Client

Redux has always been too verbose, they know it we know it. While revisiting redux this time around I found the [duck Pattern](https://github.com/erikras/ducks-modular-redux)
Which I really like, I'm a big fan of folders and file structures that make sense and aren't overly complex for the sake of it, additional `index.js` files (especially when only one component exported) does not make sense to me.

Putting everything for redux in one section per feature a really nice way to tidy up all the extra fluff of redux.
I ended up with my SearchSlice which handles the user Input, and my MetaSlice which handled the data and the application status.

Redux-toolkit has adapted this pattern and it made handling redux logic much easier, creating a Slice of redux which just has everything you need in one spot is really a big improvement.

Currently as I write this I had to make some hard choices on the front end, I don't think I will have time to make the second route, as I think the time is better spend writing some
test cases.

One thing I was happy with how it went was using a single `status` instead of bools in the view like `isError, isLoading` just a declarative status. I think that really improved the flow of it.

## Testing

I decided my limited TS knowledge with Node is going to mean no tests on the server files, I'm not 100% sure what the best way to mock api requests is, internal or external.

For the front end I decided that testing the meta status was the best way to go about.
So I wrote test cases for the `status` and matched that with the expected view

## Random sidebar

---

Separate to the challenge but still interesting in a nerdy way, this was the first work I was able to complete on a PC using Windows subsystem for linux. (WSL)
It worked _almost_ perfectly although `npm i` did freeze my system a few times forcing a hard shutdown. I think I would probably stick with Mac for the forseeable future.

## Final Thoughts

Huge challenge, really good that it pushed me, and it was really enjoyable. I'm excited to hear feedback especially around how I did the redux Slices and the view code. And definitely about using TS more effectively.

Thanks!
