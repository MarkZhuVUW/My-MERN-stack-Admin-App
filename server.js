/**
 * My MERN Stack Admin App.
 * This is a sample server Petstore server.  You can find out more about     Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).      For this sample, you can use the api key `special-key` to test the authorization     filters.
 *
 * OpenAPI spec version: 1.0.0
 * Contact: zdy120939259@outlook.com
 *
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *
 */

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');

const app = express();


//swagger UI documentation
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const swaggerDocs =  require("./routes/api/swagger.json");
// extended: https://swagger.io/specification/#infoOjbect
// const swaggerOptions = {
//   swaggerDefinition: {
//     info: {
//       title: "My MERN Stack Admin App API",
//       description: "My MERN Stack Admin App API Information",
//       contact: {
//         name: "Mark Zhu"
//       },
//       servers: ["http://localhost:5000"]
//     }
//   },
//   // ['.routes/*.js']
//   apis: ["./routes/api/*.js"]
// }

// const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
// Bodyparser Middleware
app.use(express.json());

// DB Config
const db = config.get('mongoURI');

// Connect to Mongo
mongoose
  .connect(db, { 
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }) // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/TFA', require('./routes/api/TFA'));


// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
