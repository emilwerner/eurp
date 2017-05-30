import React from 'react';
import Event from './../../Classes/Event.jsx';
import Storage from './../../Classes/Storage.jsx';
import Card from './../Card/Card.jsx';
import SelectorInfo from './SelectorInfo.jsx';
import ArtistSelection from './ArtistSelection.jsx';

export default class Note extends React.Component {
    constructor() {
        super();
        this.selectArtist = (val) => this._selectArtist(val);
        this.stopArtistSelection = () => this.setState({currentVoteSelection: null, vote: Storage.getVote()});
        this.voteUpdated = () => this.setState({vote: Storage.getVote()});
        this.readyForVoting = () => this._readyForVoting();
        this.vote = () => this._vote();
        this.state = { vote: Storage.getVote() };   
    }

    render() {

        return (
            <div>
                <ArtistSelection 
                    artists={this.filterArtists(this.props.artists)} 
                    voteValue={this.state.currentVoteSelection}
                    stopArtistSelection={this.stopArtistSelection} />
                <div className="btn-vote-wrapper">
                    <div className="btn btn-default btn-vote-2" onClick={() => { Event.trigger("voteView") }} >
                        Tillbaka
                 </div>
                    <div className="btn btn-primary btn-vote-2" disabled={!this.readyForVoting()} onClick={this.vote} >
                        Rösta
                 </div>
                </div>
                {this.getPoints().map(point => (
                    <Card key={point.value}>
                        <SelectorInfo 
                            voteUpdated={this.voteUpdated}
                            point={point} 
                            artists={this.props.artists} 
                            selectArtist={this.selectArtist} />
                    </Card>
                ))}
            </div >
        );
    }
    _selectArtist(voteValue) {        
        this.setState({
            currentVoteSelection: voteValue
        });
    }

    _readyForVoting(){
        const points = this.getPoints();
        for(const point of points){
            if(!point.artistId) return false;
        }
        return true;
    }
    _vote() {        
        if(!this.readyForVoting()) return;
        let obj = {senderName: "John Rambo"}
        const points = this.getPoints();

        for(const point of points) {
            obj["p"+point.value] = point.artistId;
        }
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/vote', true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function () {
            Storage.storageSet("hasVoted", true);
            location.reload();
        };
        xhr.send(JSON.stringify(obj));
    }
    filterArtists(artists) {
        const points = this.getPoints();
        return artists.filter((artist) => {
            return !points.find((point) => {
                return point.artistId === artist.id;
            })
        }).sort((a,b) => {
            return b.rating - a.rating;
        });
    }

    getPoints() {
        return !this.state ? [] : Object.keys(this.state.vote).map((prop) => {
            return {
                value: prop,
                artistId: this.state.vote[prop]
            }
        }).reverse();
    }
}
