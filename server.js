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


// const express = require('express');
// const { ExpressPeerServer } = require('peer');
// const cors = require('cors');

// const app = express();

// // ✅ Enable CORS (update origin to your GitHub Pages link if you want to restrict)
// app.use(cors());

// const server = app.listen(process.env.PORT || 3000, () => {
//   console.log("Server started on port 3000");
// });

// // ✅ Correct PeerJS path (NO slash here)
// const peerServer = ExpressPeerServer(server, {
//   debug: true,
//   path: '/'  // IMPORTANT: this should be '/', not 'peerjs' or '/peerjs'
// });

// // ✅ Mount at /peerjs (ONLY here!)
// app.use('/peerjs', peerServer);

// // ✅ Optional: root route for test
// app.get('/', (req, res) => {
//   res.send('PeerJS server is up and running!');
// });

// console.log("PeerJS server is running...");




// const express = require('express');
// const { ExpressPeerServer } = require('peer');
// const cors = require('cors');

// const app = express();

// // ✅ Enable CORS (update origin to your GitHub Pages link if you want to restrict)
// app.use(cors());

// const server = app.listen(process.env.PORT || 3000, () => {
//   console.log("Server started on port 3000");
// });

// // ✅ Correct PeerJS path (NO slash here)
// const peerServer = ExpressPeerServer(server, {
//   debug: true,
//   path: '/'  // IMPORTANT: this should be '/', not 'peerjs' or '/peerjs'
// });

// // ✅ Mount at /peerjs (ONLY here!)
// app.use('/peerjs', peerServer);

// const fetch = require('node-fetch');

// app.get('/ice', async (req, res) => {
//   try {
//     const response = await fetch('https://global.xirsys.net/_turn/myP2PChannel', {
//       method: 'PUT',
//       headers: {
//         'Authorization': 'Basic' + Buffer.from('Yemoxem:6939cb34-57ff-11f0-ab2c-0242ac150003').toString('base64'),
//         'Content-Type': 'application/json'
//       }
//     });

//     const data = await response.json();
//     res.json(data.v); //sends: {iceServers: [...] }
//   } catch (err) {
//     console.error("Failed to fetch ICE config", err);
//     res.status(500).json({ error: "Could not get ICE servers" });

//   }
// });

// // ✅ Optional: root route for test
// app.get('/', (req, res) => {
//   res.send('PeerJS server is up and running!');
// });

// console.log("PeerJS server is running...");


const express = require('express');
const { ExpressPeerServer } = require('peer');
const cors = require('cors');
const fetch = require('node-fetch'); // Make sure node-fetch is installed

const app = express();

// ✅ Enable CORS for all origins (you can restrict it to your GitHub Pages domain)
app.use(cors());

const server = app.listen(process.env.PORT || 3000, () => {
  console.log('✅ Server started on port 3000');
});

// ✅ PeerJS Server Configuration
const peerServer = ExpressPeerServer(server, {
  debug: true,
  path: '/' // Internal PeerJS path
});

// ✅ Mount the PeerJS server at /peerjs
app.use('/peerjs', peerServer);

// ✅ Xirsys ICE server fetch endpoint
app.get('/ice', async (req, res) => {
  try {
    const response = await fetch('https://global.xirsys.net/_turn/myP2PChannel', {
      method: 'PUT',
      headers: {
        'Authorization': 'Basic ' + Buffer.from('Yemoxem:6939cb34-57ff-11f0-ab2c-0242ac150003').toString('base64'),
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (data && data.v && data.v.iceServers) {
      res.json(data.v.iceServers); // Only send iceServers array
    } else {
      res.status(500).json({ error: 'Invalid ICE response from Xirsys' });
    }
  } catch (err) {
    console.error('❌ Failed to fetch ICE config', err);
    res.status(500).json({ error: 'Could not get ICE servers' });
  }
});

// ✅ Root test route
app.get('/', (req, res) => {
  res.send('✅ PeerJS server is up and running!');
});

console.log('🚀 PeerJS server is running...');

