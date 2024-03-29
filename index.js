const express = require('express');
const path = require('path');
var bodyParser = require("body-parser");
const cors = require('cors');
const mongodb =  require('mongodb')

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://admin:admin@payme-todo-list-mg5qr.mongodb.net/users?retryWrites=true&w=majority";
let data = [];

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.post('/api/checkuser',(req,res)=>{
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    let dbo = db.db("users");
    let message = req.body;
    //not working for some reason i had to work around the problem
    //db.getCollectionNames().forEach(function(collname) {})
    const collections = ['user1','user2']
    if(collections.includes(message.username)){
      console.log(message);
      let myobj = {username: message.username, password: message.password };
      //this will be fixed
      //i need to keep going with the task for now
      dbo.collection(message.username).findOne({}, function(err, result) {
        if (err) throw err;
        if(message.username === result.username && message.password === result.password){
          console.log('done');
          return res.json(true);
        }else{
          return res.json(false);
        }
        db.close();
      });
  }else{
    return res.json(false);
  }
  });

})

app.post('/api/getall',(req,res)=>{
    data = [];
    let message = req.body;
    MongoClient.connect(url, function(err, db) {

        if (err) throw err;
        let dbo = db.db("users");
        dbo.collection(message.user).find({}).toArray(function(err, result) {
          if (err) throw err;
          
          result.map(elem => {
            if(elem.title || elem.desc){
                data.push({id:elem._id,title:elem.title,desc:elem.desc})
              }
          })
          db.close();
          console.log(data);
          return res.json(data)
        });
      });

})
app.post('/api/addnew',(req,res)=>{
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    let dbo = db.db("users");
    let message = req.body;
    console.log(message);
    let myobj = {title: message.title, desc: message.desc };
    dbo.collection(message.user).insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
    return res.json('done');
  });

})
app.post('/api/delete',(req,res)=>{
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    let dbo = db.db("users");
    let message = req.body;
    let myquery = { _id:new mongodb.ObjectId(message.id) };
    console.log(myquery);
    dbo.collection(message.user).deleteOne(myquery, function(err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      db.close();
      return res.json('done');
    });
  });
})
// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Server listening on ${port}`);

