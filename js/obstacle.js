class Obstacle {
    constructor(gameScreen) {
        this.gameScreen = gameScreen;
        this.top = Math.floor(Math.random() * (this.gameScreen.offsetHeight - 150)); // offsetHeight - 150 to avoid the lion to be out of the screen
        this.left = this.gameScreen.offsetWidth; // Start from the right side
        this.width = 150;
        this.height = 150;
        this.element = document.createElement('img');

        this.element.src = "images/lion.png";
        this.element.style.position = "absolute";
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;

        this.gameScreen.appendChild(this.element);
    }

    move(isPaused) {
        if (isPaused) return;

        this.left -= 3;
        this.updatePosition();
    }

    updatePosition() {
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
    }
}

class BonusObstacle extends Obstacle {
    constructor(gameScreen) {
        super(gameScreen);
        this.element.src = "images/zebra.png";
    }

    move(isPaused) {
        if (isPaused) return;

        this.left -= 7;
        this.updatePosition();
    }


}

export { Obstacle, BonusObstacle };
