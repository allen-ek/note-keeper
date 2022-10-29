const express=require('express');
const path=require('path');
const app = express();
const PORT = process.env.PORT || 3001;
let noteDB = require('./db/db.json');
const {v4 : uuidv4} = require('uuid');
const fs = require('fs');
//html routes to send for 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/notes',(req,res)=>{
  res.sendFile(path.join(__dirname,'/public/notes.html'));
});
//api routes

app.get('/api/notes',(req,res)=>{
  res.json(noteDB);

  // Log our request to the terminal
  console.info(noteDB);
});

app.post("/api/notes/", function(req,res) {
  //logic to post a note
  const { title,text } = req.body;
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      id: uuidv4(), 
    };
    //const noteString=JSON.stringify(newNote);
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        var noteString=JSON.parse(data);
        noteString.push(newNote);
        noteDB = noteString;
        fs.writeFile(
          './db/db.json',
          JSON.stringify(noteString),
          (err) =>
            err
              ? console.error(err)
              : console.info('Added notes')
        );
      }
    });
        

  }//ifstatement 
  res.json(newNote)
});

//catch all path
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'/public/index.html'));
});

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
