const express = require('express')
const Datastore = require('nedb')
const socket = require('socket.io')
const fetch = require('node-fetch')



var app = express();
app.use(express.static('dist'));
app.use(express.json({
  limit: '1mb'
}));
var server = app.listen(3000, '0.0.0.0');
var io = socket(server);
console.log("My socket server is running");


const database = new Datastore({
  filename: 'allgemeineDiscourses.db',
  autoload: true
});

app.post('/api', (request, response) => {
  console.log('I got a request')
  console.log(request.body)
})

app.get('/howdy', (request, response) => {
  response.send([{
      d: "Howdy Doody",
      zeno: "for shame"
    },
    {
      x: "ohm",
      place: "kiddo"
    }
  ])
})

app.get('/database', (request, response) => {
  database.find({}, (err, docs) => {
    if (err) {
      console.log("error in retrieval find process...")
      response.end();
      return;
    }
    response.json(docs)
  })
})

app.post('/database')



io.on('connection', newConnection);

function newConnection(socket) {
  console.log('new connection: ' + socket.id);


  socket.on('unit', data => {
    console.log(data)
    socket.broadcast.emit('unit', data)
    database.insert(data);

  })

  socket.on('relation', data => {
    console.log("got relation")
    console.log(data)

    if
    database.update({ u: data.u }, { $push: { r: data.r } }, {}, function () {
  // Now the fruits array is ['apple', 'orange', 'pear', 'banana']
})

  })


  socket.on('mouse', data => {
    socket.broadcast.emit('mouse', data)
  });
}
