require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3030;

const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");
const activity = require("./routers/activity.router.js");
const todo = require("./routers/todo.router.js");

app.use(bodyParser.json());
app.use(cors());

db.sequelize.sync();

app.use("/activity-groups", activity);
app.use("/todo-items", todo);

app.listen(PORT, () => console.log(`app listening on port ${PORT}!`));
