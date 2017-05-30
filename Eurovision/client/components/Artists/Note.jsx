import React from 'react';

export default class Note extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="note-item">
                <div>
                    {this.props.text}
                </div>
            </div>
        );
    }
}
