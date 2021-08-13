class Song {
    constructor (id, title, duration, musical_genre, user_id)
    {
        this.id = id;
        this.title = title;
        this.duration = duration;
        this.musical_genre = musical_genre;
        this.user_id = user_id;
    }
}

module.exports = Song;