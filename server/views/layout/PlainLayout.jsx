import React from 'react';

export default class NormalLayout extends React.Component {
    render() {
        let title = 'HandWritingBoard';
        if (this.props.properties.title) {
            title = `${title} ${this.props.properties.title}`;
        }

        // create data which handover from server to client
        const initialData = {};
        ['room'].forEach(prop => {
            if (this.props.properties[prop]) {
                initialData[prop] = this.props.properties[prop];
            }
        });

        return (
            <html>
                <head>
                    <title>{title}</title>
                    <meta charSet="utf-8" />
                    <meta name="description" content="HandWritingBoard" />
                    <meta
                        name="keywords"
                        content="HandWritingBoard,ホワイトボード,lesson,授業,学校,school,mtg,会議"
                    />
                    <meta
                        name="viewport"
                        content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no"
                    />
                    <meta name="format-detection" content="telephone=no" />
                    <link rel="stylesheet" href={this.props.css} />
                    <script
                        id="initial-data"
                        type="text/plain"
                        data-json={JSON.stringify(initialData)}
                    ></script>
                </head>
                <body>
                    {this.props.children}
                    <script type="text/javascript" src={this.props.js}></script>
                </body>
            </html>
        );
    }
}
