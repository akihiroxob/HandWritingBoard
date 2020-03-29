import React from 'react';

export default class NormalLayout extends React.Component {
    render() {
        return (
            <html>
                <head>
                    <title>from off to on</title>
                    <meta charSet="utf8" />
                    <meta name="description" content="" />
                    <meta name="keywords" content="" />
                    <meta
                        name="viewport"
                        content="width=device-width,initial-scale=1,user-scalable=no"
                    />
                    <link
                        href="https://fonts.googleapis.com/icon?family=Material+Icons"
                        rel="stylesheet"
                    />
                    <link rel="stylesheet" href={this.props.css} />
                    {/*
                    <script src="https://unpkg.com/peerjs@1.0.0/dist/peerjs.min.js"></script>
                    */}
                </head>
                <body>
                    {this.props.children}
                    <script type="text/javascript" src={this.props.js}></script>
                </body>
            </html>
        );
    }
}
