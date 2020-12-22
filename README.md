# Node.js

- Node.js is server-side javascript.
- Node.js runs javascript code outside of the browser.
- Node.js works on a V8 engine environment.
- Node.js is event-driven programming.
- Node.js implements CommonJS modules standard.
  - core modules
  - local modules
  - third party modules
- Asynchronous I/O Framework.
  - Node.js favors asynchronous APIs because it is single-threaded.
  

## Express Framework
- Node.js web application framework
  ```
  npm install express
  ```
- application
  - express instance
    ```
    const express = require('express');
    const app = express();

    app.listen(3000, function() {
      console.log('server is running.');
    })
    ```
  - middleware
    - logging middleware
      ```
      function logger(req, res, next) {
        console.log('logger.');
        next();
      }
      
      app.use(logger);
      ```
    - third party middleware
      ```
      const morgan = require('morgan');
      app.use(morgan('dev'));
      ```
    - error middleware
      ```
      function commonmw(req, res, next) {
        console.log('commonmw');
        next(new Error('error occured.'));
      }

      function errormw(err, req, res, next) {
        console.log(err.message);
        // handle the error here.
        next();
      }

      app.use(commonmw);
      app.us(errormw);
      ```
  - routing
    - Router
  - waiting requests status
  - request object
    - req.params(), req.query(), req.body() ...
  - response object
    - res.send(), res.stauts(), res.json() ...
