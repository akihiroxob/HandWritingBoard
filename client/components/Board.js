import React from 'react';
import {connect} from 'react-redux';
import Action from '../actions/board';

class Board extends React.Component {
    componentDidMount() {
        document.getElementById('myvideo').muted = true;
        this.props.init();
    }

    render() {
        return (
            <div id="board" className="canvas">
                <canvas
                    id="canvas"
                    width={this.props.board.width}
                    height={this.props.board.height}
                ></canvas>
                <img src={this.props.img} />
                <video
                    id="myvideo"
                    className="is-disable"
                    playsInline
                    muted
                ></video>
            </div>
        );
    }
}

function stateToProps(state) {
    return {
        board: state.app.get('board'),
        img: state.app.get('img')
    };
}

function dispatchToProps(dispatch) {
    return {
        init: () => {
            dispatch(Action.init());
        }
    };
}

export default connect(stateToProps, dispatchToProps)(Board);
