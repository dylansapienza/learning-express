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
  const { error } = validateSong(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
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
    return;
  }
  res.send(song);
});

app.put("/api/songs/:id", (req, res) => {
  //Look up course
  //if not existiting return 404
  const song = songs.find((s) => s.id == parseInt(req.params.id));
  if (!song) {
    res.status(404).send("This song id does not exist");
    return;
  }

  //validate
  //if invalid return 400
  const { error } = validateSong(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  //update course
  song.name = req.body.name;
  res.send(song);
  //return the updated course
});

app.delete("/api/songs/:id", (req, res) => {
  //Look up the course
  //Not existing, return 404
  const song = songs.find((s) => s.id == parseInt(req.params.id));
  if (!song) {
    res.status(404).send("This song id does not exist");
    return;
  }

  //Delete
  const index = songs.indexOf(song);
  songs.splice(index, 1);
  //Return the removed course
  res.send(song);
});

function validateSong(song) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(song, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}...`));
