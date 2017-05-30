import React from 'react';

export default class Results extends React.Component {

    constructor(){
        super();
        this.state = {results: []};
        const update = (data) => {
            this.setState({results: data});
        }
        const xmlhttp = new XMLHttpRequest();  


        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let data = JSON.parse(this.responseText);
                console.log(data)
                update(data);
            }          
        };
        xmlhttp.open("GET", "/api/vote", true);
        xmlhttp.send();
    }
  render() {
    return (
    <div>
      {(this.state.results.map((result) => {
          return <p> 
              {result.nameCountry} : {result.votes}
          </p>
      }))}
    </div>
    );
  }
}
