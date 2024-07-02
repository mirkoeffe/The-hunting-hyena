// obstacle.js
class Obstacle {
    constructor(gameScreen) {
        this.gameScreen = gameScreen;
        this.top = Math.floor(Math.random() * (this.gameScreen.offsetHeight - 50));
        this.left = this.gameScreen.offsetWidth; // Start from the right edge
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

    move() {
        this.left -= 1; // Move to the left
        this.updatePosition();
    }

    updatePosition() {
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
    }
}

export default Obstacle;
