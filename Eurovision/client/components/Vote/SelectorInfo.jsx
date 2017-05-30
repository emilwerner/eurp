import React from 'react';
import Storage from './../../Classes/Storage.jsx';
import Event from './../../Classes/Event.jsx';

export default class SelectorInfo extends React.Component {
    constructor() {
        super();        
        this.state = {};
        this.deselectArtist = () => this._deselectArtist();
    } 
    componentDidMount(){
        if(this.props.point.artistId){
            const artist = this.props.artists.find((artist) => {
                return artist.id === this.props.point.artistId;
            })
            this.setState({
                artist: artist
            });
        }
    }

    render() {   
        let artist;
        if(this.props.point.artistId){
             artist = this.props.artists.find((artist) => {
                return artist.id === this.props.point.artistId;
            })           
        } 
        return (
            <div className="artistSelector">
                <div className="point">
                    {this.props.point.value} poäng
                </div>
                {(artist ? 
                <div className="artistArea-2" >
                    <div className="artistAreaArtist">{artist.name}, {artist.country}</div>                    
                    <div className="artistAreaRemove" onClick={this.deselectArtist}>
                        <i className="material-icons">highlight_off</i>
                        </div>
                </div>
                :
                <div className="artistArea" onClick={() => {this.props.selectArtist(this.props.point.value)}}>
                    Klicka för att välja artist
                </div>   
                )}
                
            </div>
        );
    }
    _deselectArtist(){
          Storage.updateVote(this.props.point.value, null);     
          Event.trigger("artists");         
          this.props.voteUpdated();
    }
}


