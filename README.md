# Rock - Paper - Scissors
[![CircleCI](https://circleci.com/gh/olahakos/rock-papper-scissors.svg?style=svg)](https://circleci.com/gh/olahakos/rock-papper-scissors)

It's a little rock - paper - scissors application.

The twist on it is I tried to not user third party components on the front end.

To start the application you just have to pull the repo, and run this two commands.

```
$ npm install
$ npm start
```

By default it starts the web server on the `:8080` port. But you can override this one from environment parameters. You can find more about them in the `/app/config.js` file.

The folder stucture of the app looks like this:

```
|-- app
|   |-- client
|   |   |-- assets
|   |   |   |-- css
|   |   |   `-- images
|   |   |-- controllers
|   |   |-- models
|   |   `-- views
|   |
|   |-- app.js
|   `-- config.js
|-- mock
|-- circle.yml
`-- package.json
```

- In the `root` you can find the `mock` folder with all of the helper objects. It's needed to test out the code.
- I used [CircleCI](https://circleci.com/) for CI system. After every push it runs my tests. If I'd like to make this app live than Circle could build a Docker image, and upload it to my Docker repository. It works based on my `circle.yml` file.
- All of the important code is inside on the `/app` directory.
- `/app/app.js` is the entry point of my application. It starts the Node server based on the config, and ENV variables.
- `/app/client`: this is the 'public' folder. All the browser codes are here.
- The tests are always next to the main files with `*.spec.js` extension.

## Tools

I tried to ignore the third party frameworks while I did this puzzle. However I touched several testing tools and witch are help me to maintain the code quality.

- [ESlint](http://eslint.org/): Keeps the code clean.
- [Koa](http://koajs.com/): I used Koa for running the application server.
- [Babel](https://babeljs.io/): I needed Babel to write my code in the ES6 standard.
- [pre-commit](https://github.com/observing/pre-commit): A little tool to run given tasks before commiting the changes into the repo. It makes the code more clean and consistent.
- [Mocha](https://mochajs.org/): The main test framework
- [Chai](http://chaijs.com/): I used Chai expect to test the results
- [Sinon](http://sinonjs.org/): It helps to spy functions, and check if there has been called or not. It's good for stub out timers too
- [jsdom](https://www.npmjs.com/package/jsdom): Helps to build up a virtual DOM in the background.
- [istanbul](https://github.com/gotwarlost/istanbul): I was curious about the test coverage, so I added istanbul to the project.


## Testing

As I mentioned previously, my testing environment built on Mocha, Chai, Sinon, jsdom, istanbul. You can run the tests with the usual command:

```
$ npm test
```

If you curious about the test coverage report, you can do generate that too.

```
$ npm run cover
```

It'll generates a report into the `/coverage` directory.

## TODO

- Pure JS server without Koa
- Static file serving witout koa-static, or use Nginx
- I just made a Desktop version of the app. Writing the media queries, and add mobile layout is a TODO.
- I wanted to make little animations between the pages to make the gameplay more interesting.
