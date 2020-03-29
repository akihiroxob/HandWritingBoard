import io from 'socket.io-client';

const socket = new io({});
socket.on('connection', () => {
    console.log('connection');
});
socket.on('disconnection', () => {
    console.log('connection');
});
socket.on('join', data => {
    console.log('connection', data);
    if (data.newId !== selfId) {
        peer.call(data.newId, localStream);
    }
});
socket.on('exit', data => {
    const video = document.getElementById(data.removeId);
    video.parentNode.removeChild(video);
});

const medias = {
    audio: false,
    video: {
        facingMode: {
            exact: 'environment'
        }
    }
};

var peer = null;
var selfId = null;
var localStream = null;

function initializePeer(callback) {
    peer = new Peer({
        debug: 2
        // host: '192.168.86.214',
        // port: 4000,
        // path: '/peerjs',
        // secure: true
    });

    peer.on('open', function(id) {
        selfId = id;
        socket.emit('join', id);
    });

    peer.on('call', function(mediaConnection) {
        console.log(mediaConnection);
        mediaConnection.answer(localStream);
        mediaConnection.on('stream', remoteStream => {
            console.log('recieve stream');
            const video = document.createElement('video');
            video.srcObject = remoteStream;
            document.getElementsByTagName('main')[0].appendChild(video);
            video.play();
        });
    });
    peer.on('close', function() {
        peer.destroy();
    });
    peer.on('error', function(err) {
        console.error(err);
    });
}

function initializeMedia(callback) {
    navigator.mediaDevices
        .getUserMedia(medias)
        .then(stream => {
            localStream = stream;
            var video = document.createElement('video');
            //video.src = URL.createObjectURL(stream);
            video.srcObject = stream;
            document.body.appendChild(video);
            video.play();
            callback();
        })
        .catch(console.error);
}

function callRemoteAll() {
    console.log('call remote all');
    peer.listAllPeers(function(remoteIds) {
        console.log('hogehoge');
        for (var i = 0; i < remoteIds.length; i++) {
            var remoteId = remoteIds[i];
            var mediaConnection = peer.call(remoteId, localStream);
            settingMediaConnection(mediaConnection);
        }
    });
}

function settingMediaConnection(mediaConnection) {
    var remoteId = mediaConnection.peer;
    var remoteStream = null;
    var video = null;
    mediaConnection.on('stream', function(stream) {
        video = document.createElement('video1');
        video.src = URL.createObjectURL(stream);
        video.play();
        var parent = document.getElementById('remoteVideos');
        parent.appendChild(video);
    });
    mediaConnection.on('close', function() {
        URL.revokeObjectURL(video.src);
        video.parentNode.removeChild(video);
    });
    mediaConnection.on('error', function(err) {
        console.error(err);
    });
}

function initialize() {
    initializeMedia(function() {
        initializePeer(function() {});
    });
}

window.addEventListener('load', initialize);

/*
(() => {
    window.addEventListener('load', () => {
        const canvas = document.getElementById('board');
        canvas.setAttribute('width', `${window.innerWidth}px`);
        canvas.setAttribute('height', `${window.innerHeight}px`);

        setupCamera();
    });
    window.addEventListener('resize', () => {
        const canvas = document.getElementById('board');
        canvas.setAttribute('width', `${window.innerWidth}px`);
        canvas.setAttribute('height', `${window.innerHeight}px`);
    });

    const setupCamera = () => {
        const medias = {
            audio: false,
            video: {
                facingMode: {
                exact: 'environment'
                }
            }
        };

        navigator.mediaDevices
            .getUserMedia(medias)
            .then(successCallback)
            .catch(errorCallback);

        function successCallback(stream) {
            const video = document.getElementById('video');
            video.srcObject = stream;
            const canvas = document.getElementById('board');
            video.addEventListener('timeupdate', function() {
                canvas.getContext('2d').drawImage(video, 0, 0);
            });
        }

        function errorCallback(err) {
            alert(err);
        }
    };
})();
*/
