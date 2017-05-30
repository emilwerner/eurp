const _userName = "userName";
const _notes = "notes";
const _vote = "vote";

class Storage {
    constructor() {
    }

    storageGet(name) {
        return JSON.parse(localStorage.getItem(name));
    }

    storageSet(name, obj) {
        localStorage.setItem(name, JSON.stringify(obj));
    }

    getArtist(artistId) {
        const artistName = this.getArtistName(artistId)
        let artist = this.storageGet(artistName);
        if (!artist) {
            artist = { id: artistId, notes: [], rating: 0 };
            this.storageSet(artistName, artist);
        }
        return artist;
    }

    updateRating(artistId, rating) {
        const artist = this.getArtist(artistId);
        artist.rating = rating;
        this.storageSet(this.getArtistName(artist.id), artist);
        return artist;
    }

    addNote(artistId, note) {
        let artist = this.getArtist(artistId);
        artist.notes.push(note);
        this.storageSet(this.getArtistName(artist.id), artist);
        return artist;
    }

    getArtistName(artistId) {
        if (!artistId) throw "WTF man";
        return "artist_" + artistId;
    }

  
    getVote() {
        let vote = this.storageGet(_vote);
        if (!vote) {
            vote = { "1": null, "2": null, "3": null, "4": null, "5": null, "6": null, "7": null, "8": null, "10": null, "12": null };
            this.storageSet(_vote, vote);
        }
        return vote;
    }

    updateVote(voteValue, artistId) {
        let voteObj = this.getVote();
        voteObj[voteValue] = artistId;
        this.storageSet(_vote, voteObj);
    }
}

export default new Storage();