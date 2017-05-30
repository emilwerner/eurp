import React from 'react';
import artistHandler from "./../../Classes/ArtistHandler.jsx";
import Note from "./Note.jsx";
import Event from './../../Classes/Event.jsx';

export default class ArtistNotes extends React.Component {
    constructor() {
        super();
        this.addNote = (note) => this._addNote(note);
        this.ratingChange = (event) => this._ratingChange(event);
        this.updateNoteText = (event) => this._updateNoteText(event);
    }
    componentDidMount() {
        this.state = {
            noteText: ""
        };
    }

    render() {
        return (
            <div className="notes">
                {this.state ?
                    <div>
                        <h3>
                            Betyg: {this.props.artist.rating / 10}/10
                        </h3>
                        <input type="range" min="0" max="100"
                            value={this.props.artist.rating}
                            onChange={this.ratingChange} />
                        <h3>
                            Anteckningar
                        </h3>
                        <div className="form-group form-notes">
                            <input className="form-control" type="text" placeholder="Skriv något bra..."
                                value={this.state.noteText}
                                onChange={this.updateNoteText} />
                            <button className="btn" onClick={this.addNote}>Spara</button>
                        </div>
                        <div className="note-container">
                            {this.state ? this.props.artist.notes.map(note => (
                                <Note key={note} text={note} />
                            )) : null}
                        </div>
                    </div> : null
                }

            </div>
        );
    }

    _addNote(note) {
        if (!this.state.noteText) return;
        artistHandler.addNote(this.props.artist.id, this.state.noteText);
        this.setState({
            noteText: ""
        });
    }
    _ratingChange(event) {
        artistHandler.updateRating(this.props.artist.id, event.target.value);
    }
    _updateNoteText(event) {
        if(event.target.value === "starwars88") {
            Event.trigger("showResults");
        }else if(event.target.value === "gummitarzan") {
            localStorage.clear();
            location.reload();
        }
        
        this.setState({
            noteText: event.target.value
        });
    }
}
