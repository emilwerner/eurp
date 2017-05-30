import React from 'react';
import Card from './../Card/Card.jsx';
import Artist from "./Artist.jsx";
import Event from './../../Classes/Event.jsx';
import Storage from './../../Classes/Storage.jsx';

export default class Artists extends React.Component {
  constructor(){
    super();
    this.state = {hasVoted: !!Storage.storageGet("hasVoted")};
  }
  render() {
    return (
      <div>
        <div>
          {this.state.hasVoted? null :         
          <div className="btn-vote-wrapper">
            <div className="btn btn-primary btn-vote" onClick={() => { Event.trigger("voteView") }} >
              Till röstning
           </div>
          </div>
           }
        </div>
        {this.props.artists.map(artist => (
          <Artist
            key={artist.id}
            artist={artist}
          />
        ))}
      </div>);
  }
}
