const express = require("express");
const router = express.Router();
const Joi = require("joi")

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" }
]


router.get("/", (req, res) => {
  res.send("Hello, world");
});

router.get("/courses", (req, res) => {
  res.send(courses);
})

router.post("/courses", (req, res) => {
  let { error } = validate(req.body)
  if (error) {
    res.send(error.details[0].message)
  }
  let course = {
    id: courses.length + 1,
    name: req.body.name
  }
  courses.push(course);
  res.send(course);
});

router.get("/courses/:id", (req, res) => {
  let course = courses.find(course => course.id === parseInt(req.params.id));
  if (!course) {
    res.send("not found")
  }
  res.send(course)
})

router.put("/courses/:id", (req, res) => {
  let { error } = validate(req.body)
  if (error) {
    res.send(error.details[0].message)
  }
  const schema = {
    name: Joi.string().min(3).required()
  };
  let result = Joi.validate(req.body, schema)
  if (result.error) {
    res.send(result.error.details[0].message)
  }
  courses.forEach(e => {
    if (e.id === parseInt(req.params.id)) {
      e.name = req.body.name
    }
  });
  res.send(courses)
});

router.delete("/courses/:id", (req, res) => {
  let course = courses.find(course => course.id === parseInt(req.params.id));
  if (!course) {
    res.send("not found")
  }
  let index = courses.indexOf(course)
  courses.splice(index, 1)
  res.send(courses);
})



function validate(course) {
  const schema = {
    name: Joi.string().min(3).required()
  };
  return Joi.validate(course, schema)
}

module.exports = router