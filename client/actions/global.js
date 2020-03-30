import * as Const from '../constants';
import * as Key from '../constants/keycode';

export function addWindowEvent(name, func) {
    return function(dispatch) {
        function handleEvent(e) {
            dispatch(func(e));
        }

        window.addEventListener(name, handleEvent);
        return () => window.removeEventListener(name, handleEvent);
    };
}

export function addGlobalOnKeyDown() {
    return function(dispatch) {
        function globalKeyDown(event) {
            const pressOthers = event.altKey || event.shiftKey;
            dispatch({
                type: Const.KEY_DOWN,
                payload: {
                    keycode: event.which || event.keyCode
                },
                meta: {
                    event,
                    keys: {
                        ctrlKey: event.ctrlKey,
                        altKey: event.altKey,
                        shiftKey: event.shiftKey,
                        metaKey: event.metaKey
                    }
                }
            });
        }

        window.addEventListener('keydown', globalKeyDown);
    };
}

export function addGlobalOnKeyUp() {
    return function(dispatch) {
        function globalKeyUp(event) {
            dispatch({
                type: Const.KEY_UP,
                payload: {
                    keycode: event.which || event.keyCode
                },
                meta: {
                    event,
                    keys: {
                        ctrlKey: event.ctrlKey,
                        altKey: event.altKey,
                        shiftKey: event.shiftKey,
                        metaKey: event.metaKey
                    }
                }
            });
        }
        window.addEventListener('keyup', globalKeyUp);
    };
}

export function addGlobalOnResize() {
    return function(dispatch) {
        function globalResize(event) {
            const width = window.innerWidth;
            //const height = window.innerHeight;
            const height = document.getElementById('board').clientHeight;

            const board = {width, height};
            dispatch({
                type: Const.RESIZE,
                payload: {board},
                meta: {event}
            });
        }

        // initial. will move this initial function later
        window.addEventListener('load', globalResize);
        window.addEventListener('resize', globalResize);
    };
}
