import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';

import {initialState} from './reducers/app';
import configureStore from './store/configureStore';
import Page from './components/Page';
import * as GlobalAction from './actions/global';

// ready to initial
// initialize
const initialData = document.getElementById('initial-data');
const props = JSON.parse(initialData.getAttribute('data-json'));
const store = configureStore({
    app: initialState.set('room', props.room)
});

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
        <Page />
    </Provider>,
    document.getElementById('container')
);
