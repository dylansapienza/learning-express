const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

const songs = [
  { id: 1, name: "song1" },
  { id: 2, name: "song2" },
  { id: 3, name: "song3" },
];

app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

app.get("/api/songs", (req, res) => {
  res.send(songs);
});

//PORT

// /api/course/1

app.post("/api/songs", (req, res) => {
  const schema = {
    name: Joi.string().alphanum().min(3).required(),
  };

  const result = Joi.validate(req.body, schema);

  console.log(result);

  if (result.error) {
    //400 Bad Request
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const song = {
    id: songs.length + 1,
    name: req.body.name,
  };
  songs.push(song);
  res.send(song);
});

app.get("/api/songs/:id", (req, res) => {
  const song = songs.find((s) => s.id == parseInt(req.params.id));
  if (!song) {
    res.status(404).send("This song id does not exist");
  }
  res.send(song);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}...`));
