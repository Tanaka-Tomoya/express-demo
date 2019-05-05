const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const courses = [
  {id: 1, name: "course1"},
  {id: 2, name: "course2" },
  {id: 3, name: "course3" }
]

app.get("/", (req, res) => {
  res.send("Hello, world");
});

app.get("/courses", (req, res) => {
  res.send(courses);
})

app.get("/courses/:id", (req, res) => {
  let course = courses.find(course => course.id === parseInt(req.params.id));
  if(!course){
    res.send("not found")
  }
  res.send(course)

})

app.listen(3000, () => {
  console.log(`${port}`)
})