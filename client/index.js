import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';

import configureStore from './store/configureStore';
import Board from './components/Board';
import * as GlobalAction from './actions/global';

// ready to initial
// initialize
const store = configureStore();

store.dispatch(GlobalAction.addGlobalOnResize());
document.addEventListener(
    'touchstart',
    event => {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    },
    {
        passive: false
    }
);

// Render
ReactDom.render(
    <Provider store={store}>
        <Board />
    </Provider>,
    document.getElementById('wrapper')
);
