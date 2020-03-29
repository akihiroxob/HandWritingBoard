// server settings
import express from 'express';
import io from 'socket.io';
import {createEngine} from 'express-react-views';
import path from 'path';
import https from 'https';
import fs from 'fs';

const remoteIds = new Set();
const app = express();

const options = {
    key: fs.readFileSync('/Users/aokayama/etc/https/orekey.pem'),
    cert: fs.readFileSync('/Users/aokayama/etc/https/orecert.pem'),
    passphrase: 'password'
};
const server = https.Server(options, app);
const socket = io(server);
socket.on('connection', client => {
    console.log('connection');

    client.on('join', data => {
        console.log('join', data);
        client.join('general');
        client.peerId = data.peerId;
        remoteIds.add(data.peerId);
        console.log(Array.from(remoteIds));
        socket.to('general').emit('join', {
            newId: client.peerId,
            allIds: Array.from(remoteIds)
        });
    });

    client.on('turnOn', data => {
        console.log('turnOn');
        socket.to('general').emit('turnOn', data);
    });

    client.on('turnOff', data => {
        console.log('img update');
        socket.to('general').emit('turnOff', data);
    });

    client.on('disconnect', () => {
        console.log(client.peerId);
        remoteIds.delete(client.peerId);
        socket.to('general').emit('exit', {
            removeId: client.peerId,
            allIds: Array.from(remoteIds)
        });
    });

    client.emit('connection');
});

app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine(
    'jsx',
    createEngine({
        transformViews: false
    })
);
app.use(express.static(path.join(__dirname, '/../assets')));

// router
import PageRouter from './routes/page';
app.use('/', PageRouter);

server.listen(4000);
