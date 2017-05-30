import React from 'react';
import Toolbar from './../Toolbar/Toolbar.jsx'
import Artists from './../Artists/Artists.jsx'
import LoginScreen from './../LoginScreen/LoginScreen.jsx'
import Results from './../Results/Results.jsx'

import Vote from './../Vote/Vote.jsx'
import Storage from './../../Classes/Storage.jsx';
import Event from './../../Classes/Event.jsx';
import artistHandler from "./../../Classes/ArtistHandler.jsx";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = { 
      appState: this.getAppState(), 
      isVoting: false,
      artists: [],
      showResult: false
    };

    artistHandler.getArtists((artists) => {
      this.setState({artists: artists});
    });

    Event.on("login", () => {
      this.setState({ appState: this.getAppState() });
    });
     Event.on("voteView", () => {
      this.setState({
        isVoting: !this.state.isVoting
      });
      setTimeout(() => {
        this.setState({
          appState: this.getAppState()
        });
      });
    });
    Event.on("artists", () => {
        artistHandler.getArtists((artists) => {
            this.setState({
                artists: artists 
            });
        });
    });

    Event.on("showResults", () => {
      this.setState({
            showResult: true 
      });
       setTimeout(() => {
        this.setState({
          appState: this.getAppState()
        });
      });
    });
  }


  render() {
    return (
      <div>
        {this.getView()}
      </div>);
  }

  getView() {
    if (this.state.appState === 2) {
       return <Results artists={this.state.artists}/>;
    }  if (this.state.appState === 3) {
      return <Vote artists={this.state.artists}/>;
    }
    return <Artists artists={this.state.artists}/>;
  }

  getAppState() {
    let appState = 1;
    if(this.state && this.state.showResult){
      appState = 2;
    } else if (this.state && this.state.isVoting) {
      appState = 3;
    }
    return appState;
  }
}