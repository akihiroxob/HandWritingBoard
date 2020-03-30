import React from 'react';
import Layout from './layout/PlainLayout.jsx';

export default class Index extends React.Component {
    render() {
        return (
            <Layout
                css="/css/styles.css"
                js="/js/index.bundle.js"
                properties={this.props}
            >
                <div className="l-wrapper">
                    <header className="wrapper">
                        <h1>
                            <a href="/">HandWritingBoard</a>
                        </h1>
                    </header>
                    <section className="wrapper">
                        <h1 className="circle"></h1>
                        <h2>Mr.Ninja</h2>
                    </section>
                    <div className="main">
                        <dl className="form">
                            <dt>Board Name</dt>
                            <dd>
                                <input type="text" id="js-boardname" />
                            </dd>
                        </dl>
                        <p className="enter" id="js-submit">
                            <a className="main_button mini_button">Enter</a>
                        </p>
                    </div>
                    <footer>
                        Copyright (C) 2020 OKAYAMA FU-FU All Rights Reserved.
                    </footer>
                </div>
            </Layout>
        );
    }
}
