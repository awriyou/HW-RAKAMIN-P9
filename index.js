const express = require("express");
const app = express();
const pool = require("./query.js");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
// const basicAuth = require('express-basic-auth');
// const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const morgan = require('morgan');
  
//logging
app.use(morgan('tiny'))
// apidocs
const apiDocumentation = require('./apidocs.json');
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(apiDocumentation))
// const option = {
//     definition: {
//         openapi : '3.0.0',
//         info : {
//             title: 'API DOCS Awriyou HW P9',
//             version: '0.1.0',
//             description: 'HW P9'
//         },
//         servers:[
//             {
//                 url: 'http://localhost:3000'
//             },
//         ],
//     },
//     apis:['./*.js'],
// };
// const specs = swaggerJsdoc(option);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {explore: true}))

//basic auth
// app.use(basicAuth({
//     users: {'ario' : 'sangatrahasia'},
//     unauthorizedResponse: basicAuthRes
// }))

// function basicAuthRes(req){
//     return req.auth ? ('Credentials' + req.auth.user + ':' + req.auth.password + 'rejected') : 'Unauthorized'
// }

//=========================
//author = hak aksesnya
//authen = verifikasi iya atau tidak



//RAKAMIN
app.get("/", (req, res) => {
  const token = jwt.sign(
    {
      userID: 101,
      role: "admin",
    },
    "naxcrd02",
    { expiresIn: "1h" }
  );
  res.json({
    token: token,
  });
});

app.get("/verify/:token", (req, res) => {
  const data = jwt.verify(req.params.token, "naxcrd02");
  res.json({
    data: data,
  });
});

// ===========================


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const movies = require("./movies.js");
app.use("/movies", movies);

const user = require("./user.js");
app.use("/users", user);




// ========================

pool.connect((err, res) => {
  if (err) {
    console.log(err);
  }
  console.log("database connected");
});

app.listen(3000);
