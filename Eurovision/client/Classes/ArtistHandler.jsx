import storage from "./Storage.jsx";
import Event from './Event.jsx';

let artistsData;
class ArtistHandler {
    constructor() {
    }

    getArtists(callback) {
        if (artistsData) {
            callback(artistsData.map((artist) => {
                const artistData = storage.getArtist(artist.id);
                artist.rating = artistData.rating;
                artist.notes = artistData.notes;
                return artist;
            }));
            return;
        }
        var xmlhttp = new XMLHttpRequest();   
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                artistsData = JSON.parse(this.responseText);
                const data = artistsData.map((artist) => {
                    const artistData = storage.getArtist(artist.id);
                    artist.rating = artistData.rating;
                    artist.notes = artistData.notes;
                    return artist;
                });
                callback(data);
            }
        };
        xmlhttp.open("GET", "/api/artists", true);
        xmlhttp.send();
    }

    addNote(artistId, note) {
        storage.addNote(artistId, note);
        Event.trigger("artists");
    }

    updateRating(artistId, rating) {
        storage.updateRating(artistId, rating);
        Event.trigger("artists");
    }
}

export default new ArtistHandler();