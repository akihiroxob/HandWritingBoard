import * as Const from '../constants/index';
import WebSocket from '../libs/WebSocket';
import Peer from '../libs/Peer';
import Capture from '../libs/Capture';

const THRESHOLD = 128;

class Board {
    init() {
        return dispatch => {
            this.websocket = WebSocket.getInstance();
            console.log('board constructor');

            this.websocket.on('connection', () => {
                console.log('connection');
                Capture.getCamera().then(stream => {
                    this.localStream = stream;
                    this.peer = Peer.getInstance(this.localStream);
                    this.peer.on('open', () => {
                        this.websocket.joinToChannel(this.peer.id);
                        this.peer.joinToRoom('general');
                    });
                });
            });

            this.websocket.on('join', data => {
                //Capture.getCamera().then(stream => {
                //    this.peer.localStream = stream;
                //});
                console.log('join');
                dispatch(this.join(data));
            });

            this.websocket.on('turnOn', data => {
                dispatch(this.turnOn(data));
            });

            this.websocket.on('turnOff', data => {
                console.log('img update');
                dispatch(this.refreshImg(data));
            });

            this.websocket.on('exit', data => {
                dispatch(this.remove(data));
            });
        };
    }

    myTurn() {
        const video = document.getElementById('myvideo');
        video.srcObject = this.localStream;
        video.classList.remove('is-disable');
        Promise.resolve().then(() => {
            video.play();
        });

        this.websocket.turnOn(this.peer.id);
        return {
            type: Const.SHOW_MY_VIDEO
        };
    }

    takeTurn() {
        return (dispatch, getStore) => {
            const board = getStore().app.get('board');
            const imgsrc = getStore().app.get('img');

            const video = document.getElementById('myvideo');
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');

            ctx.drawImage(video, 0, 0);
            const src = ctx.getImageData(0, 0, board.width, board.height);
            const dst = ctx.createImageData(board.width, board.height);
            for (let i = 0; i < src.data.length; i += 4) {
                const y = ~~(
                    0.299 * src.data[i] +
                    0.587 * src.data[i + 1] +
                    0.114 * src.data[i + 2]
                );

                // alpha 0 = 0. 1 = 255;
                const ret = y > THRESHOLD ? 255 : 0;
                dst.data[i] = dst.data[i + 1] = dst.data[i + 2] = ret;
                dst.data[i + 3] = ret ? 0 : 255;
            }
            ctx.putImageData(dst, 0, 0);
            video.classList.add('is-disable');

            if (imgsrc !== null) {
                const img = new Image();
                img.onload = () => {
                    ctx.drawImage(img, 0, 0, board.width, board.height);
                    const base64 = canvas.toDataURL('image/png');
                    this.websocket.refreshImg({base64, peerId: this.peer.id});
                };
                img.src = imgsrc;
            } else {
                const base64 = canvas.toDataURL('image/png');
                this.websocket.refreshImg({base64, peerId: this.peer.id});
            }
        };
    }

    join(data) {
        return {
            type: Const.JOIN,
            payload: {
                joinId: data.newId,
                remoteIds: data.remoteIds
            },
            meta: {}
        };
    }

    refreshImg(data) {
        if (this.peer.id === data.peerId) {
            document.getElementById('myvideo').classList.add('is-disable');
        } else {
            document.getElementById(data.peerId).classList.add('is-disable');
        }

        return {
            type: Const.REFRESH_IMG,
            payload: {
                imgBase64: data.base64
            }
        };
    }

    remove(data) {
        return {
            type: Const.EXIT,
            payload: {
                removeId: data.removeId,
                remoteIds: data.remoteIds
            },
            meta: {}
        };
    }

    turnOn(peerId) {
        if (this.peer.id === peerId) {
            document.getElementById('myvideo').classList.remove('is-disable');
            return {
                type: Const.SHOW_MY_VIDEO
            };
        } else {
            document.getElementById(peerId).classList.remove('is-disable');
            return {
                type: Const.SHOW_VIDEO
            };
        }
    }

    clearImg() {
        return (dispatch, getStore) => {
            const board = getStore().app.get('board');
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, board.width, board.height);
            const base64 = canvas.toDataURL('image/png');
            this.websocket.refreshImg({base64, peerId: this.peer.id});
        };
    }
}

export default new Board();
