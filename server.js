var express = require('express');
var app = express();

var server = app.listen(3000, () => {
 console.log('server is running on port', server.address().port);
});

app.use(express.static(__dirname));

//Conexão com o MongoDB
const mongoose = require('mongoose');

const uri = 'mongodb+srv://henriqueS7:5638388s@cluster0.oy7pv7v.mongodb.net/';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado ao banco de dados MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco de dados:', error);
  });

const Message = mongoose.model('Message', { name: String, message: String });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
  
// Métodos HTTP
app.get('/messages', (req, res) => {
    Message.find({})
      .then((messages) => {
        res.send(messages);
      })
      .catch((error) => {
        res.sendStatus(500);
      });
  });
  
app.post('/messages', (req, res) => {
    const message = new Message(req.body);
    message.save()
      .then(() => {
        res.sendStatus(200);
      })
      .catch((error) => {
        res.sendStatus(500);
      });
  });

//Socket, conexão usuáio/servidor
var io = require('socket.io')(server);
io.on('connection', () =>{
    console.log('a user is connected')
   })