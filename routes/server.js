const express = require("express");
const app = express();
const helmet = require("helmet");
const session = require("express-session");
const cookie = require("cookie-parser");
const cors = require("cors");
const { body, validationResult } = require("express-validator");
const compression = require("compression");

// 1.Create a basic Express.js server that listens on port 3000 and returns "Hello, World!" when the

app.get("/", (req, res) => {
  res.status(200).send("Hello, world");
});

app.listen(3000, () => {
  console.log(`server is listening at port 3000`);
});

// 2.Create an Express.js route that accepts a name parameter and returns a personalized greeting.

app.get("/greet/:name", (req, res) => {
  const { name } = req.params;
  res.status(200).send(`Hello, ${name}`);
});

// 3. Create an Express.js route that accepts a query parameter and returns the value in the response.
app.get("/echo", (req, res) => {
  console.log(req.query);
  res.send("Hello");
});

// 4. Create an Express.js route that reads the contents of a JSON file and returns it as the response.

// if you activate app.get('*')... it will not work!!
app.get("/data", (req, res) => {
  res.json([
    { fname: "Qais" },
    { lname: "Aburisheh" },
    { major: "Mechanical Engineer" },
  ]);
});

//5 Create an Express.js route that accepts a POST request with a JSON payload and returns it in the response.

// app.post("/postdata", (req, res) => {

//   res.send("data posted");
//   console.log(req.body)
// });

// 6. Set the express-session module to store session data.

app.use(
  session({
    secret: "your-secret-key", // Replace with your own secret key
    resave: true,
    saveUninitialized: true,
  })
);

// whatever the user uou hit it will print out his name
// http://localhost:3000/session?username=qais

app.get("/session", (req, res) => {
  const { username } = req.query;

  if (username) {
    req.session.username = username;
  }

  const storedUsername = req.session.username;

  res.send(`Hello, ${storedUsername}`);
});

// 7 . Use the cookie-parser middleware to parse and set cookies

app.use(cookie());
app.get("/cookie", (req, res) => {
  if (username) {
    req.cookies.username = username;
  }

  const storedUsername = req.cookies.username;

  res.send(`Hello, ${storedUsername}`);
});

//8 . Use the express-validator module to validate user input on a route.

// 9
app.use(helmet());
const morgan = require("morgan");
app.use(morgan("tiny"));

// 10 cors
app.use(cors());

// 11
app.use(compression());

// 12. Use the morgan middleware to log HTTP requests.

// for this path you will see this in the console GET /morgan 200 17 - 9.248 ms
app.get("/morgan", (req, res) => {
  res.send("morgan middleware");
});

//   path  not found
app.get("*", (req, res) => {
  res.status(404).send("resource not found");
});
