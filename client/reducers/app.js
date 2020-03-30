import {Map} from 'immutable';
import * as Const from '../constants';

export const initialState = Map({
    room: '',
    peerId: '',
    turnId: '',
    board: {
        width: 0,
        height: 0
    },
    remoteIds: [],
    img: null,
    // state: 'my': use own camera
    // state: 'mate': use mate camera
    // state: 'none': no one start camera
    state: 'none'
});

const app = (state = initialState, action) => {
    switch (action.type) {
        case Const.RESIZE: {
            return state.set('board', action.payload.board);
        }
        case Const.INIT: {
            return state.set('peerId', action.payload.peerId);
        }

        case Const.JOIN:
        case Const.Exit: {
            return state.set('remoteIds', action.payload.remoteIds || []);
        }

        case Const.SHOW_MY_VIDEO: {
            return state
                .set('state', 'my')
                .set('turnId', action.payload.peerId);
        }

        case Const.SHOW_VIDEO: {
            return state
                .set('state', 'mate')
                .set('turnId', action.payload.peerId);
        }
        case Const.REFRESH_IMG: {
            return state
                .set('img', action.payload.imgBase64)
                .set('state', 'none')
                .set('turnId', '');
        }

        default: {
            return state;
        }
    }
};

export default app;
