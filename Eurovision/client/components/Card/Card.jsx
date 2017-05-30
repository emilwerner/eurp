import React from 'react';

export default class Card extends React.Component {
  render() {
    return (
     <div className="cardParent">
        <div className="card" >    
            {this.props.children}
        </div>
     </div>);
  }
}
