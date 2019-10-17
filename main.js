(function () {
    let Traveler = function (name) {
        this.name = name;
        this.food = 1;
        this.isHealthy = true;
    }

    let Wagon = function (capacity) {
        this.capacity = capacity;
        this.passengers = [];
    }

    Traveler.prototype.hunt = function () { this.food += 2; }
    Traveler.prototype.eat = function () {
        if (this.food > 0) {
            this.food--;
        }
        else {
            this.isHealthy = false;
        }
    }

    Wagon.prototype.getAvailableSeatCount = function () {
        return this.capacity - this.passengers.length;
    }
    Wagon.prototype.join = function (traveler) {
        if (this.capacity > this.passengers.length) {
            this.passengers.push(traveler);
        }
        else {
            console.log("Sorry " + traveler.name + ", your fatass can't fit on this wagon.");
        }
    }
    Wagon.prototype.shouldQuarantine = function () {
        for (let i of this.passengers) {
            if (!i.isHealthy) {
                return true;
            }
        }
        return false;
    }

    Wagon.prototype.totalFood = function () {
        let totalFood = 0
        for (let i of this.passengers) {
            totalFood += i.food;
        }
        return totalFood;
    }

    // Create a wagon that can hold 2 people
    let wagon = new Wagon(2);
    // Create three travelers
    let henrietta = new Traveler('Henrietta');
    let juan = new Traveler('Juan');
    let maude = new Traveler('Maude');
    console.log(`${wagon.getAvailableSeatCount()} should be 2`);
    wagon.join(henrietta);
    console.log(`${wagon.getAvailableSeatCount()} should be 1`);
    wagon.join(juan);
    wagon.join(maude); // There isn't room for her!
    console.log(`${wagon.getAvailableSeatCount()} should be 0`);
    henrietta.hunt(); // get more food
    juan.eat();
    juan.eat(); // juan is now hungry (sick)
    console.log(`${wagon.shouldQuarantine()} should be true since juan is sick`);
    console.log(`${wagon.totalFood()} should be 3`);
})();