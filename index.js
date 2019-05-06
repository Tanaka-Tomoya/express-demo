const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser")
const routes = require("./routes/routes")

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))

app.use("/", routes)

app.listen(3000, () => {
  console.log(`${port}`)
})


