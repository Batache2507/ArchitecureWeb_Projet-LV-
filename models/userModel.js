class Profile {
    constructor (id, firstname, lastname, nickname, region, musical_genre, instrument)
    {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.nickname = nickname;
        this.region = region;
        this.musical_genre = musical_genre; 
        this.instrument = instrument;
    }
}

module.exports = Profile;