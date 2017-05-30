import React from 'react';
import Card from './../Card/Card.jsx'
import ArtistNotes from "./ArtistNotes.jsx"
import ArtistPresentation from "./ArtistPresentation.jsx"
import artistHandler from "./../../Classes/ArtistHandler.jsx";

export default class Artist extends React.Component {
    constructor() {
        super();
        this.state = { isFocus: false };
        this.setFocus = () => this._setFocus();
        this.stopFocus = () => this._stopFocus();

    }

    render() {
        const ratingCss = this._getRatingCSS(this.props.artist.rating);

        return (
            <div onClick={this.setFocus}
                className={this.state.isFocus ? 'isFocus' : null}
                ref="container">

                <Card>
                    <ArtistPresentation artist={this.props.artist} />
                    <ArtistNotes artist={this.props.artist} />
                    <div className="exitBar">
                        <div onClick={this.stopFocus}>
                            <i className="material-icons">
                                highlight_off
                            </i>
                        </div>
                    </div>
                    <div className={ratingCss}>
                        {this.props.artist.rating / 10}
                    </div>
                </Card>
            </div>);
    }

    _getRatingCSS(rating) {
        let base = "score-preview";
        if (rating < 40) {
            base += " bad";
        } else if (rating < 70) {
            base += " medium";
        } else {
            base += " good";
        }
        return base;
    }

    _setFocus() {
        if (!this.state.isFocus) {
            this.setState({ isFocus: true });
        }
    }
    _stopFocus() {
        this.setState({ isFocus: false });      
    }
}
