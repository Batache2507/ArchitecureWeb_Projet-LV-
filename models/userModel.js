class Profile {
    constructor (id, firstname, lastname, nickname, country, musical_genre, instrument)
    {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.nickname = nickname;
        this.country = country;
        this.musical_genre = musical_genre; 
        this.instrument = instrument;
    }
}

module.exports = Profile;