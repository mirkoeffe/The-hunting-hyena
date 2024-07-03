
import Player from './player.js';
import Obstacle from './obstacle.js';

class Game {
    constructor(timeRemaining) {
        this.sectionHome = document.querySelector('#section-home');
        this.instructionDiv = document.querySelector("#instruction-div");
        this.descriptionParagraph = document.querySelector("#description-paragraph");
        this.buttonsContainer = document.querySelector("#buttons-container");
        this.gameName = document.querySelector("#game-name");
        this.homeScreen = document.querySelector("#home-screen");
        this.gameScreen = document.querySelector("#game-screen");
        this.statsContainer = document.querySelector("#stats-container");
        this.mainElement = document.querySelector("main-element");
        this.endGameScreen = document.querySelector("#end-game-screen");
        this.endGameScreenOne = document.querySelector("#end-game-one");
        this.endGameScreenTwo = document.querySelector("#end-game-two");
        this.player = new Player(
            this.gameScreen,
            0,
            100,
            100,
            150,
            "./images/hyena.png"
        );
        this.height = 100;
        this.width = 100;
        this.obstacles = [];
        this.timeRemaining = timeRemaining;
        this.score = 0;
        this.lives = 3;
        this.gameIsOver = false;
        this.gameIntervalId = null;
        this.gameLoopFrequency = Math.round(1000 / 60);

        const goBackButton = document.querySelector("#go-back");
        goBackButton.addEventListener("click", () => {
            this.showHomeScreen();
        });
    }

    showInstructions() {
        this.sectionHome.style.display = "none";
        this.instructionDiv.style.display = "flex";
        this.descriptionParagraph.style.display = "block";
        this.buttonsContainer.style.display = "flex";
    }

    showHomeScreen() {
        this.sectionHome.style.display = "block";
        this.instructionDiv.style.display = "none";
    }

    startGame() {
        this.gameScreen.style.width = this.width + "%";
        this.gameScreen.style.height = this.height + "%";
        this.gameScreen.style.backgroundPosition = "0% 100%";
        this.homeScreen.style.display = "none";
        this.gameScreen.style.display = "block";
        this.statsContainer.style.display = "block";
        this.gameIntervalId = setInterval(() => {
            this.gameLoop();
        }, this.gameLoopFrequency);
    }

    gameLoop() {
        this.update();
        if (this.gameIsOver) {
            clearInterval(this.gameIntervalId);
        }
    }

    update() {
        this.player.move();
        const idScore = document.querySelector('#score-number');
        const idLives = document.querySelector('#lives-number');

        for (let i = 0; i < this.obstacles.length; i++) {
            const obstacle = this.obstacles[i];
            obstacle.move();

            if (this.player.didCollide(obstacle)) {
                obstacle.element.remove();
                this.obstacles.splice(i, 1);
                this.lives--;
                idLives.innerHTML = this.lives;
                i--;
            }
            else if (obstacle.left < 0) {
                obstacle.element.remove();
                this.obstacles.splice(i, 1);
                this.score++;
                idScore.innerHTML = this.score;
                i--;
            }
        }

        if (this.lives === 0) {
            this.gameOver();
        }

        if (Math.random() > 0.5 && this.obstacles.length < 1) {
            this.obstacles.push(new Obstacle(this.gameScreen));
        }
    }

    pause() {
        // implement the p key to pause the game only during gameplay
    }

    gameOver() {
        this.player.element.remove();
        this.obstacles.forEach(obstacle => { obstacle.element.remove() });
        this.gameIsOver = true;
        this.gameScreen.style.display = "none";
        this.endGameScreen.style.display = "block";
        this.endGameScreenOne.style.display = "flex";
    }

    timeIsOver() {
        this.player.element.remove();
        this.obstacles.forEach(obstacle => { obstacle.element.remove() });
        this.gameIsOver = true;
        this.gameScreen.style.display = "none";
        this.endGameScreen.style.display = "block";
        this.endGameScreenTwo.style.display = "flex";
    }

    restartGame() {
        // implement the enter key to restart the game at the end of the game (end screen)
        // counter must be reset to 0
        // lives must be reset to 3
        // timer must be reset to 60
    }
}

export default Game;
