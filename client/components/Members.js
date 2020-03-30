import React from 'react';
import {connect} from 'react-redux';

class Members extends React.Component {
    render() {
        return (
            <ul className="canvas-member">
                {this.props.peerIds
                    .sort((a, b) => {
                        if (a === this.props.myId) {
                            return -1;
                        }
                        return 0;
                    })
                    .map(id => {
                        const className =
                            id === this.props.turnId
                                ? 'canvas-member__activate'
                                : '';
                        return (
                            <li
                                key={id}
                                data-peer-id={id}
                                className={className}
                            ></li>
                        );
                    })}
            </ul>
        );
    }
}

function stateToProps(state) {
    return {
        myId: state.app.get('peerId'),
        turnId: state.app.get('turnId'),
        peerIds: state.app.get('remoteIds')
    };
}

function dispatchToProps(dispatch) {
    return {};
}

export default connect(stateToProps, dispatchToProps)(Members);
