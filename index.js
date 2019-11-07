const mongoose = require('mongoose');
const { createApp } = require('./app');
const keys = require('./config/keys');
const port = process.env.PORT || 3000;
const app = createApp();

mongoose
  .connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Database connect');
    app.listen(port, console.log(`Server has been started on port ${port} pid ${process.pid}`));
  })
  .catch(err => console.error(err));
