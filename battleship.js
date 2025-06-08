function checkHit(value) {
    if (value.length == 1) {
        return;
    }
    controller.processGuess(value);
}


var controller = {
    guesses: 0,
    allowedGuess : [
        'A0', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 
        'B0', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 
        'C0', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6',
        'D0', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6',
        'E0', 'E1', 'E2', 'E3', 'E4', 'E5', 'E6', 
        'F0', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 
        'G0', 'G1', 'G2', 'G3', 'G4', 'G5', 'G6'],

    processGuess: function (guess) {
        guess = guess.toUpperCase();
        if (!this.allowedGuess.includes(guess)) {
            alert('Your Guess is invalid!!')
            document.getElementById('guessInput').value = '';
        } else {
            let parts = guess.split('');
            let location = this.toNumber(parts[0]) + parts[1];
            const ship = model.fire(location);
            this.informView(ship, location);
            document.getElementById('guessInput').value = '';
        }
        this.guesses++;
        this.allowedGuess = this.allowedGuess.filter(it => it !== guess)
    },
    
    informView: function (ship, location) {
        if(model.shipSunk == model.numShips){
            view.displayHit(location)
            view.displayMessage('You sunk all my battleship in ' + controller.guesses + ' guesses!!')
        } else if (ship) {
            view.displayHit(location)
            if (model.isSunk(ship)) {
                view.displayMessage('You sank my battleship!!');
            } else{
                view.displayMessage('HIT');
            }
        } else {
            view.displayMiss(location);
            view.displayMessage('MISS');
        }
    },

    toNumber: function (letter) {
        switch (letter) {
            case 'A':
                return '0';
            case 'B':
                return '1';
            case 'C':
                return '2';
            case 'D':
                return '3';
            case 'E':
                return '4';
            case 'F':
                return '5';
            default:
                return '6';
        }
    }

}

var model = {
    boardSize: 7,
    numShips: 3,
    shipLength: 3,
    shipSunk: 0,
    ships: [
        { locations: ['', '', ''], hits: ["", "", ""] },
        { locations: ['', '', ''], hits: ["", "", ""] },
        { locations: ['', '', ''], hits: ["", "", ""] }
    ],

    fire: function (guess) {
        for (let i = 0; i < this.numShips; i++) {
            let locations = this.ships[i].locations;
            let index = locations.indexOf(guess);
            if (index >= 0) {
                this.ships[i].hits[index] = 'hit';
                const sunk = this.isSunk(this.ships[i]);
                if(sunk) 
                    this.shipSunk++;
                return this.ships[i];
            }
        }
        return null;
    },

    isSunk: function (ship) {
        for (let i = 0; i < this.shipLength; i++) {
            if (ship.hits[i] != 'hit') 
                return false;
        }
        return true;
    },

    generateLocations: function(){
        var location;
        for(let i = 0; i < this.numShips; i++){
            do {
                location =  this.generateLocation();
            } while (this.colision());
        }
    },

    colision: function(location){
        let locations = []
        this.ships.forEach(it => locations.push(it.locations));
        return locations.includes(location);
    },

    generateLocation: function(){

    }
};

var view = {
    displayMessage: function (msg) {
        console.log(msg)
        const messageArea = document.getElementById("message");
        messageArea.innerHTML = msg;
        const shot = msg == 'MISS' ? 'missBackground' : 'hitBackground'
        messageArea.classList.add('pulse', shot);
        setTimeout(() => {
            messageArea.innerHTML = "";
            messageArea.setAttribute('class', '')
        }, 3000)
    },

    displayHit: function (location) {
        const hit = document.getElementById(location);
        hit.setAttribute('class', "hit");
    },

    displayMiss: function (location) {
        const miss = document.getElementById(location);
        miss.setAttribute("class", "miss")
    }
}