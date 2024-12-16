export class Team {
    constructor(name, record) {
        this.name = name; // Team name
        this.record = record; // Record as a string (e.g., "10-2")
        this.players = []; // Array to hold player names or objects
        this.bans = []; //indexes represent different maps || 0:Ancient 1:Anubis 2:Dust2 3:Inferno 4:Mirage 5:Nuke 6:Vertigo 
    }

    // Method to add a player to the team
    addPlayer(player) {
        this.players.push(player);
    }

    // Method to get the list of players
    getPlayers() {
        return this.players;
    }

    // Method to update the team's record
    updateRecord(newRecord) {
        this.record = newRecord;
    }

    // Method to display team info
    displayTeamInfo() {
        console.log(`Team: ${this.name}`);
        console.log(`Record: ${this.record}`);
        console.log(`Players: ${this.players.join(', ')}`);
    }
}


