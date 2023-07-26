const express = require("express");
const router = express.Router();
const uuidv4 = require("uuid");

// IT DOESNOT WORK
// import { v4 as uuid4 } from "uuid";
// uuid4();
let students = [
  {
    id: "1",
    name: "Anas",
    grade: 70,
  },
  {
    id: "2",
    name: "Ali",
    grade: 90,
  },
];

router.get("/", (req, res) => {
  res.json(students);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const student = students.find((student) => student.id === id);
  if (student) {
    res.json(student);
  } else {
    res.send("student not fount");
  }
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  students = students.filter((student) => student.id !== id);
  console.log(students);
  console.log(`student with id of  ${id} has been deleted `);
  res.send(`student with id of  ${id} has been deleted `);
});
router.post("/", (req, res) => {
  students.push(req.body);
  res.send(`student with ${req.body.name} has been added`);
});
// IT DIDNOT WORK

/*
  const student = req.body;
  const studentWithId = { ...student, id: uuidv4() };
  console.log(studentWithId);
  students.push(studentWithId);
*/

router.patch("/:id", (req, res) => {
  const id = req.params.id;
  const { name, grade } = req.body;
  let student = students.find((student) => student.id === id);

  if (name) {
    student.name = name;
  }
  if (grade) {
    student.grade = grade;
  }
  res.send(`student with id ${id} has been updated`);
});
module.exports = router;
