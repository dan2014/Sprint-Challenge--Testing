const express = require("express");

const app = express();
app.use(express.json())

let nextId = 6;

function getNewId() {
  return nextId++;
}


let data = [
    {   id:1,
        title: 'Pacman', // required
        genre: 'Arcade', // required
        releaseYear: 1980 // not required
    },
    {   id:2,
        title: 'Tetris', // required
        genre: 'Arcade', // required
        releaseYear: 1984 // not required
    },
    {   id:3,
        title: 'Doom', // required
        genre: 'FPS', // required
        releaseYear: 1993 // not required
    },
    {   id:4,
        title: 'Portal', // required
        genre: 'Puzzle-Platform', // required
        releaseYear: 2007 // not required
    },
    {   id:5,
        title: 'Fortnite', // required
        genre: 'Battle Royal', // required
        releaseYear: 2017 // not required
    }
];

app.get("/",(req,res) => {
    res.status(200).send("Server is live");
});

app.get("/games",(req,res) => {
    res.status(200).json(data);
});

app.post('/games', (req, res) => {
    const keys = Object.keys(req.body)
if(keys.length>0){
    const {genre,title,releaseYear} = {...req.body}
    if(genre && title && releaseYear){
        const newGame = { id: getNewId(), ...req.body };
        data = [...data, newGame];
        res.status(201).json(data);
    } else{
        res.status(422).send("Unprocessable Entity");
    }
} else{
    res.status(500).send("No data was received");
}
});

app.delete('/games/:id', (req, res) => {
    const { id } = req.params;
    let gamesIndex = data.findIndex(data => data.id == id);
    if (gamesIndex >= 0) {
        data = data.filter(data => data.id != req.params.id);
        res.status(200).json(data);
    } else{
        res
        .status(404)
        .json({ message: `The friend with id ${id} does not exist.` });
    }
});

module.exports = app;