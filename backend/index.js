const express = require('express');
const cors = require('cors');
const router = require('./router');

const app = express();
const PORT = process.env.PORT || 3201;

app
  .use(cors())
  .use(express.json())
  .use(router);


const isProduction = process.env.NODE_ENV === 'production';
const dbConnection = isProduction ? process.env.MONGO_URI_PROD : process.env.MONGO_URI_DEV;

// mongoose
//   .connect(dbConnection, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//   })



if (isProduction) {

  const port = process.env.PORT || 90;
  app.listen(port, () => console.log(`Server started on port ${port}`));

} else {
  const port = process.env.PORT || 3201;

  app.listen(PORT, () => {
    console.log(`App running at: http://localhost:${PORT} 🦜🐈`);     //eslint-disable-line no-console
  });
}


// app.listen(PORT, () => {
//   console.log(`App running at: http://localhost:${PORT} 🦜🐈`);     //eslint-disable-line no-console
// });