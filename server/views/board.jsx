import React from 'react';
import Layout from './layout/PlainLayout.jsx';

export default class Index extends React.Component {
    render() {
        return (
            <Layout
                css="/css/styles.css"
                js="/js/board.bundle.js"
                properties={this.props}
            >
                <div id="container" />
            </Layout>
        );
    }
}
