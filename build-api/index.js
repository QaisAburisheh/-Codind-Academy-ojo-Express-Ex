const express = require("express");
const app = express();
const studentsRouter = require("./routes/students.js");
const port = 5000;
// it will read the data that i will send (body parser)
app.use(express.json());
// uuid it's a library used for generate id

app.get("/", (req, res) => {
  res.send("hi");
});

app.use("/students", studentsRouter);

app.listen(port, () => {
  console.log(`the server is listening on port ${port}`);
});
