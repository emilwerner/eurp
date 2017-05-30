import React from 'react';
import Storage from './../../Classes/Storage.jsx';
import ArtistPresentation from './../Artists/ArtistPresentation.jsx'
import Card from './../Card/Card.jsx'
import Note from './../Artists/note.jsx'
import storage from "./../../Classes/storage.jsx";
import Event from './../../Classes/Event.jsx';


export default class ArtistSelection extends React.Component {
    constructor() {
        super();
        this.selectPoint = (id) => this._selectPoint(id);
    } 

    render() {
        return (
            (!this.props.voteValue ? null:
                <div className="selectArtists" >
                   <div className="topbar" onClick={this.props.stopArtistSelection}>
                       För {this.props.voteValue} poäng:
                    </div>   
                     {this.props.artists.map(artist => (
                        <Card key={artist.id}>
                           <div className="shortPresentation">
                                <h1>
                                    {artist.name}
                                </h1>
                                <p className="country">
                                    {artist.country}
                                </p>                               
                         </div>
                        <div className="note-container" style={{padding:"10px"}}>
                            <div className="btn btn-default btn-block" onClick={() => {this.selectPoint(artist.id)}}>
                                Välj
                            </div>
                            {(artist.notes.map(note => (<Note key={note} text={note} />)))}                         
                        </div>
                        <div className={this._getRatingCSS(artist.rating)}>
                                {artist.rating / 10}
                        </div>    
                        </Card>
                    ))}            
                </div>
            )            
        );
    }

    _selectPoint(id){
        storage.updateVote(this.props.voteValue, id);
        this.props.stopArtistSelection();
        Event.trigger("artists");
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
}
