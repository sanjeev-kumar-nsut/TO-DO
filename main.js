//FOR EXPRESS
const express = require('express');
const app = express();

//FOR MONGOOSE
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("MONGODB WORKING");
});
const todolist = require('./models/todolist');

app.use(express.static('public'))

//FOR EJS
const path = require('path');
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'))

//ENCODED
app.use(express.urlencoded({extended:true}))
//REQUESTS
app.get('/',async(req,res) => {
    const list = await todolist.find();
    res.render('home',{list});
})
app.get('/add',(req,res)=>{
  res.render('add');
})
app.post('/',async(req,res) => {
  const newlist = new todolist(req.body);
  await newlist.save();
  res.redirect('/');
})
app.get('/deleteall',async(req,res) => {
  await todolist.deleteMany();
  res.redirect('/');
})
//LISTENING
app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000");
})