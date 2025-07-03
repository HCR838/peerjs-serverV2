// const express = require('express');
// const { ExpressPeerServer } = require('peer');

// const app = express();
// const server = app.listen(process.env.PORT || 3000);
// const peerServer = ExpressPeerServer(server, {
//   debug: true,
//   path: '/'
// });

// app.use('/peerjs', peerServer);

// console.log("PeerJS server is running...");


const express = require('express');
const { ExpressPeerServer } = require('peer');

const app = express();
const server = app.listen(process.env.PORT || 3000);

const peerServer = ExpressPeerServer(server, {
  debug: true,
  path: 'peerjs'  // ✅ Fixed this!
});

app.use('/peerjs', peerServer);

// Optional: nice homepage response
app.get('/', (req, res) => {
  res.send('PeerJS server is up and running!');
});

console.log("PeerJS server is running...");
