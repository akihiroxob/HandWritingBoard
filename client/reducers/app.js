import {Map} from 'immutable';
import * as Const from '../constants';

export const initialState = Map({
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

        case Const.JOIN:
        case Const.Exit: {
            return state.set('remoteIds', action.payload.remoteIds || []);
        }

        case Const.SHOW_MY_VIDEO: {
            return state.set('state', 'my');
        }

        case Const.SHOW_VIDEO: {
            return state.set('state', 'mate');
        }
        case Const.REFRESH_IMG: {
            return state
                .set('img', action.payload.imgBase64)
                .set('state', 'none');
        }

        default: {
            return state;
        }
    }
};

export default app;
