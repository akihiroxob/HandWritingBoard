import React from 'react';
import Members from './Members';
import Actions from './Actions';
import Board from './Board';

export default class Page extends React.Component {
    render() {
        return (
            <div className="l-wrapper">
                <header className="wrapper">
                    <h1>
                        <a href="/">HandWritingBoard</a>
                    </h1>
                </header>

                <div className="board-main">
                    <section className="board-main-room">
                        <h1>Board Name</h1>
                        <div className="board-main-container">
                            <h2>BuildforCovid-19</h2>
                            <a className="sub_button minimum_button">Exit</a>
                        </div>
                    </section>
                    <Board />
                    <Members />
                </div>
                <Actions />
            </div>
        );
    }
}
