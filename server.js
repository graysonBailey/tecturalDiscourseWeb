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

const architectural = new Datastore({
  filename: 'architectural.db',
  autoload: true
});

const medial = new Datastore({
  filename: 'medial.db',
  autoload: true
});

const anarchic = new Datastore({
  filename: 'anarchic.db',
  autoload: true
});


const verbunden = new Datastore({
  filename: 'verbunden.db',
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

app.get('/medial', (request, response) => {
  architectural.find({}, (err, docs) => {
    if (err) {
      console.log("error in retrieval find process...")
      response.end();
      return;
    }
    response.json(docs)
  })
})

app.get('/architectural', (request, response) => {
  architectural.find({}, (err, docs) => {
    if (err) {
      console.log("error in retrieval find process...")
      response.end();
      return;
    }
    response.json(docs)
  })
})

app.get('/anarchic', (request, response) => {
  anarchic.find({}, (err, docs) => {
    if (err) {
      console.log("error in retrieval find process...")
      response.end();
      return;
    }
    response.json(docs)
  })
})

app.get('/verbunden', (request, response) => {
  verbunden.find({}, (err, docs) => {
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

  socket.on('unit', data => {
    socket.broadcast.emit('unit', data)
    if(data.db == "ver"){
      delete data.db
      verbunden.insert(data);
    } else if (data.db == "arch"){
      delete data.db
      architectural.insert(data);
    } else if (data.db == "an"){
      delete data.db
      anarchic.insert(data);
    }
  })

  socket.on('relation', data => {
    if(data.db == "ver"){
      delete data.db
      verbunden.update({ u: data.u }, { $push: { r: data.r } }, {}, function (){})
    } else if (data.db == "arch"){
      delete data.db
      architectural.update({ u: data.u }, { $push: { r: data.r } }, {}, function (){})
    } else if (data.db == "an"){
      delete data.db
      anarchic.update({ u: data.u }, { $push: { r: data.r } }, {}, function (){})
    }
  })

  socket.on('mouse', data => {
    socket.broadcast.emit('mouse', data)
  });
}
