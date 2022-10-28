const express=require('express');
const path=require('path');
const app = express();
const PORT = process.env.port || 3001;
const data = require('./db/db.json');
const uuid = require('./helper/uuid');
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
  res.json(data);

  // Log our request to the terminal
  console.info(data);
});
app.post("/api/notes/", function(req,res) {
  //logic to post a note
  res.json(true);
});
//catch all path
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'/public/index.html'));
});

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
