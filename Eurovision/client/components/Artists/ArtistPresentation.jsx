import React from 'react';

export default class ArtistNotes extends React.Component {
    constructor() {
        super();
    }

    render() {
        const imgUri = `/static/${this.props.artist.country}_artist.jpg`;
        return (
            <div>
                <img src={imgUri} alt="" />
                <div className="shortPresentation">
                    <p className="country">
                        {this.props.artist.country}
                    </p>
                    <h1>
                        {this.props.artist.name}
                    </h1>
                </div>
            </div>
        );
    }
}
