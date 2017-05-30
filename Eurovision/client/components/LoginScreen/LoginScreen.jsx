import React from 'react';
import Card from './../Card/Card.jsx'
import Storage from './../../Classes/Storage.jsx';
import Event from './../../Classes/Event.jsx';

export default class LoginScreen extends React.Component {

  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

  }
  componentWillMount() {
    this.setState({
      name: ''
    });
  }

  handleChange(event) {
    this.setState({ name: event.target.value.replace(/[^A-Za-z-]/g, "") });
  }

  handleClick() {
    if (this.state.name.length > 3) {
      Storage.currentUser(this.state.name);
      Event.trigger("login");
    }
    else {
      alert("Din lata jävel.");
    }
  }

  render() {
    return (
      <div className="loginScreen">
        <Card>
          <h1>
            Registrering
          </h1>
          <p>
            Du behöver registrera dig innan vi kör igång!
          </p>
          <div className="form-group">
            <input type="text"
              value={this.state.name}
              onChange={this.handleChange}
              style={{ width: "150px", display: "inline-block", marginRight: "5px" }}
              className="form-control" placeholder="Namn.." />
            <button type="submit" className="btn btn-default" onClick={this.handleClick}>Kör!</button>
          </div>
        </Card>
      </div>)
  }
}
