import React from 'react';
import {connect} from 'react-redux';
import Action from '../actions/board';

class Actions extends React.Component {
    render() {
        return (
            <div className="action">
                {this.props.state === 'none' && (
                    <p>
                        <a
                            className="main_button"
                            onClick={event => {
                                event.preventDefault();
                                this.props.myTurn();
                            }}
                        >
                            My turn
                        </a>
                    </p>
                )}
                {this.props.state === 'my' && (
                    <p>
                        <a
                            className="main_button"
                            onClick={event => {
                                event.preventDefault();
                                this.props.takeTurn();
                            }}
                        >
                            Take turns
                        </a>
                    </p>
                )}
                {this.props.state === 'none' && (
                    <p>
                        <a
                            className="sub_button"
                            onClick={event => {
                                event.preventDefault();
                                this.props.clear();
                            }}
                        >
                            All clear
                        </a>
                    </p>
                )}
            </div>
        );
    }
}

function stateToProps(state) {
    return {
        state: state.app.get('state')
    };
}

function dispatchToProps(dispatch) {
    return {
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

export default connect(stateToProps, dispatchToProps)(Actions);
