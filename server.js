const express = require('express');
const routes = require('./routes/index');

const { env } = process;

const app = express();
const port = env.PORT || 5000;

app.use(express.json());

app.use('/', routes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
