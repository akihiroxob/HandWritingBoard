// import
import SkyWay from 'skyway-js';

export default class Peer {
    static getInstance(localStream) {
        if (!(Peer._instance instanceof PeerClient)) {
            // arg room will be use
            Peer._instance = new PeerClient(localStream);
        }
        return Peer._instance;
    }
}

class PeerClient extends SkyWay {
    constructor(localStream) {
        super({key: API_KEY});
        this.videoList = document.getElementById('board');
        this.localStream = localStream;
    }

    joinToRoom(roomName) {
        const room = this.joinRoom(roomName, {
            mode: 'mesh',
            stream: this.localStream
        });

        room.on('stream', async stream => {
            const newVideo = document.createElement('video');
            newVideo.srcObject = stream;
            newVideo.playsInline = true;
            newVideo.autoplay = true;
            // mark peerId to find it later at peerLeave event
            newVideo.setAttribute('id', stream.peerId);
            newVideo.classList.add('is-disable');
            this.videoList.append(newVideo);
            await newVideo.play().catch(console.error);
        });

        // for closing room members
        room.on('peerLeave', peerId => {
            const remoteVideo = document.getElementById(peerId);
            if (!remoteVideo) {
                return;
            }

            remoteVideo.srcObject.getTracks().forEach(track => track.stop());
            remoteVideo.srcObject = null;
            remoteVideo.remove();
        });
    }
}
