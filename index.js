const express = require('express');
const path = require('path');
var cors = require('cors');
const generatePassword = require('password-generator');

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://admin:admin@payme-todo-list-mg5qr.mongodb.net/users?retryWrites=true&w=majority";
let data = [];

const app = express();
app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.get('/api/passwords', (req, res) => {
  const count = 5;

  // Generate some passwords
  const passwords = Array.from(Array(count).keys()).map(i =>
    generatePassword(12, false)
  )

  // Return them as json
  res.json(passwords);

  console.log(`Sent ${count} passwords`);
});
app.get('/api/getall',(req,res)=>{
    data = [];
    MongoClient.connect(url, function(err, db) {

        if (err) throw err;
        let dbo = db.db("users");
        dbo.collection('user1').find({}).toArray(function(err, result) {
          if (err) throw err;
          
          result.map(elem => {
            if(elem.title){
                data.push({title:elem.title,desc:elem.desc})
                console.log(elem);
              }
          })
          db.close();
          console.log(data);
          return res.json(data)
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

console.log(`Password generator listening on ${port}`);

