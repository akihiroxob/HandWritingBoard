import React from 'react';
import {connect} from 'react-redux';
import Action from '../actions/board';

class Board extends React.Component {
    componentDidMount() {
        this.props.init();
    }

    render() {
        console.log(this.props.state);
        return (
            <div id="board" className="p-board">
                <canvas
                    id="canvas"
                    width={`${this.props.board.width}px`}
                    height={`${this.props.board.height}px`}
                ></canvas>
                <img src={this.props.img} />
                <video id="myvideo" className="is-disable" playsInline></video>
                <button
                    className="p-board__clear"
                    onClick={() => {
                        this.props.clear();
                    }}
                >
                    clear
                </button>
                <button
                    className={`p-board__myturn ${
                        this.props.state !== 'none' ? 'is-none' : ''
                    }`}
                    onClick={() => {
                        this.props.myTurn();
                    }}
                >
                    my turn
                </button>
                <button
                    className={`p-board__taketurn ${
                        this.props.state !== 'my' ? 'is-none' : ''
                    }`}
                    onClick={() => {
                        this.props.takeTurn();
                    }}
                >
                    take turns
                </button>
            </div>
        );
    }
}

function stateToProps(state) {
    return {
        board: state.app.get('board'),
        img: state.app.get('img'),
        state: state.app.get('state')
    };
}

function dispatchToProps(dispatch) {
    return {
        init: () => {
            dispatch(Action.init());
        },
        myTurn: () => {
            dispatch(Action.myTurn());
        },
        takeTurn: () => {
            dispatch(Action.takeTurn());
        },
        clear() {
            dispatch(Action.clearImg());
        }
    };
}

export default connect(stateToProps, dispatchToProps)(Board);
