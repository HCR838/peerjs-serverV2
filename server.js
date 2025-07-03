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


// const express = require('express');
// const { ExpressPeerServer } = require('peer');
// const cors = require('cors'); //CORS

// const app = express();

// // ✨ Enable CORS for all origins (you can restrict it later if needed)
// app.use(cors({
//   origin: 'https://hcr838.github.io/peerjs-serverV2/'
// })); //Enabled CORS TEMPORARY


// const server = app.listen(process.env.PORT || 3000);

// const peerServer = ExpressPeerServer(server, {
//   debug: true,
//   path: '/peerjs'  // ✅ Fixed this!
// });

// app.use('/peerjs', peerServer);

// // Optional: nice homepage response
// app.get('/', (req, res) => {
//   res.send('PeerJS server is up and running!');
// });

// console.log("PeerJS server is running...");


const express = require('express');
const { ExpressPeerServer } = require('peer');
const cors = require('cors');

const app = express();

// ✅ Enable CORS (update origin to your GitHub Pages link if you want to restrict)
app.use(cors());

const server = app.listen(process.env.PORT || 3000, () => {
  console.log("Server started on port 3000");
});

// ✅ Correct PeerJS path (NO slash here)
const peerServer = ExpressPeerServer(server, {
  debug: true,
  path: '/'  // IMPORTANT: this should be '/', not 'peerjs' or '/peerjs'
});

// ✅ Mount at /peerjs (ONLY here!)
app.use('/peerjs', peerServer);

// ✅ Optional: root route for test
app.get('/', (req, res) => {
  res.send('PeerJS server is up and running!');
});

console.log("PeerJS server is running...");

