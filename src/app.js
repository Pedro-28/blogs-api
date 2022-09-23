const express = require('express');
const { errorMiddleware } = require('./middlewares');
const { loginRouter } = require('./router');

// ...

const app = express();

app.use(express.json());

app.use('/login', loginRouter);

app.use(errorMiddleware);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
