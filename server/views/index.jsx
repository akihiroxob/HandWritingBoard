import React from 'react';
import Layout from './layout/PlainLayout.jsx';

export default class Index extends React.Component {
    render() {
        return (
            <Layout
                css="/css/style.css"
                js="/js/index.bundle.js"
                properties={this.props}
            >
                <main id="wrapper"></main>
            </Layout>
        );
    }
}
