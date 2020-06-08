const express = require('express')
const Datastore = require('nedb')
const socket = require('socket.io')
const fetch = require('node-fetch')

var app = express();
app.use(express.static('dist'));
app.use(express.json({
  limit: '1mb'
}));
var server = app.listen(8081, '0.0.0.0');
var io = socket(server);
console.log("My socket server is running");

const entire = new Datastore({
  filename: 'entire.db',
  autoload: true
});


app.post('/api', (request, response) => {
  console.log('I got a request')
  console.log(request.body)
})

app.get('/entire', (request, response) => {
  entire.find({}, (err, docs) => {

    if (err) {
      console.log("error in retrieval find process...")
      response.end();
      return;
    }
    console.log("it got grabbed")
    response.json(docs)
  })
})


io.on('connection', newConnection);

function newConnection(socket) {

  socket.on('unit', data => {
    socket.broadcast.emit('unit', data)
    entire.insert(data);
  })

  socket.on('relation', data => {
      entire.update({ u: data.u }, { $push: { r: data.r } }, {}, function (){})
  })

  socket.on('mouse', data => {
    socket.broadcast.emit('mouse', data)
  });
}
