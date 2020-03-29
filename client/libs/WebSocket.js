import io from 'socket.io-client';
import EventEmitter from 'eventemitter3';

export default class WebSocket {
    static getInstance(channel) {
        if (!(WebSocket._instance instanceof WebSocketClient)) {
            // arg channel will be use
            WebSocket._instance = new WebSocketClient(channel);
        }
        return WebSocket._instance;
    }
}

class WebSocketClient extends EventEmitter {
    constructor(channel) {
        super();
        this.socket = io({
            reconnection: false
            //transports: ['websocket']
        });

        // socket.io default Events
        // -----------------------------
        this.socket.on('connection', () => {
            console.log('connect on ws');
            this.emit('connection');
        });
        this.socket.on('reconnect', () => {
            this.emit('reconnect');
        });
        this.socket.on('disconnect', () => {
            this.emit('disconnect');
        });

        // normal event
        // -----------------------------
        this.socket.on('join', data => {
            console.log('come join on ws');
            this.emit('join', data);
        });

        this.socket.on('exit', data => {
            this.emit('join', data);
        });

        this.socket.on('turnOn', data => {
            console.log('coming next turn on ws');
            this.emit('turnOn', data);
        });
        this.socket.on('turnOff', data => {
            console.log('come on img update on ws');
            this.emit('turnOff', data);
        });
    }

    //
    joinToChannel(peerId) {
        this.socket.emit('join', {peerId});
    }

    refreshImg(base64) {
        this.socket.emit('turnOff', base64);
    }

    turnOn(peerId) {
        this.socket.emit('turnOn', peerId);
    }
}
