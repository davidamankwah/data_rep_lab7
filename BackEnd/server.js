//Express Server
const express = require('express')
const app = express()

const port = 4000

const cors = require('cors');
const bodyParser = require('body-parser');

//avoid a CORS error
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://admin:admin@cluster0.oiviaxb.mongodb.net/?retryWrites=true&w=majority'); //Database connection. Asychronous call

  
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');
}

//Define schema 
const bookSchema = new mongoose.Schema({
  title: String,
  cover: String,
  author: String
});

const bookModel = mongoose.model('books', bookSchema);//'books' represents collections. Model allow interaction with database.

//added body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//a route point that returns a 'Hello World' message
app.get('/', (req, res) => {
  res.send('Hello World!')
})

//a post method 
app.post('/api/books', (req, res) => {
  console.log(req.body);
  //create records in database
  bookModel.create({
    title:req.body.title,
    cover:req.body.cover,
    author:req.body.author
  }) 
  res.send('Data received');
})


// a  route point that find books and gets it to display 
app.get('/api/books', (req, res) => {
  bookModel.find( (error,data) => {
    res.json(data);
  })
})

//a  route point that pass an id and reads a book by id from the database.
app.get('/api/books/:id', (req, res) => {
  console.log(req.params.id);

  bookModel.findById(req.params.id, (error,data)=>{  
    res.json(data);
  })
})

// connect port 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})