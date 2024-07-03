import Player from './player.js';
import { Obstacle, BonusObstacle } from './obstacle.js';

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
        this.player = null;
        this.height = 100;
        this.width = 100;
        this.obstacles = [];
        this.timeRemaining = timeRemaining;
        this.score = 0;
        this.lives = 3;
        this.gameIsOver = false;
        this.isPaused = false;
        this.gameIntervalId = null;
        this.obstacleIntervalId = null;
        this.gameLoopFrequency = Math.round(1000 / 60);

        const goBackButton = document.querySelector("#go-back");
        goBackButton.addEventListener("click", () => {
            this.showHomeScreen();
        });
    }

    showInstructions() {
        this.clearGameElements();
        this.sectionHome.style.display = "none";
        this.instructionDiv.style.display = "flex";
        this.descriptionParagraph.style.display = "block";
        this.buttonsContainer.style.display = "flex";
    }

    showHomeScreen() {
        this.clearGameElements();
        this.sectionHome.style.display = "block";
        this.instructionDiv.style.display = "none";
    }

    startGame() {
        this.clearGameElements();
        this.initializeGame();

        this.gameScreen.style.width = this.width + "%";
        this.gameScreen.style.height = this.height + "%";
        this.gameScreen.style.backgroundPosition = "0% 100%";
        this.homeScreen.style.display = "none";
        this.gameScreen.style.display = "block";
        this.statsContainer.style.display = "block";
        this.startTimer();
        this.updateTimerDisplay();
        this.gameIntervalId = setInterval(() => {
            this.gameLoop();
        }, this.gameLoopFrequency);
        this.generateObstacle();
    }

    clearIntervals() {
        if (this.gameIntervalId) {
            clearInterval(this.gameIntervalId);
            this.gameIntervalId = null;
        }
        if (this.obstacleIntervalId) {
            clearTimeout(this.obstacleIntervalId);
            this.obstacleIntervalId = null;
        }
        if (this.timeIntervalId) {
            clearInterval(this.timeIntervalId);
            this.timeIntervalId = null;
        }
    }

    clearGameElements() {
        this.clearIntervals();

        if (this.player) {
            this.player.element.remove();
            this.player = null;
        }

        this.obstacles.forEach(obstacle => obstacle.element.remove());
        this.obstacles = [];
    }

    initializeGame() {
        this.player = new Player(
            this.gameScreen,
            0,
            200,
            100,
            150,
            "./images/hyena.png"
        );
        this.score = 0;
        this.lives = 3;
        this.timeRemaining = 30;
        this.gameIsOver = false;
        this.isPaused = false;

        document.querySelector('#score-number').innerHTML = this.score;
        document.querySelector('#lives-number').innerHTML = this.lives;
        this.updateTimerDisplay();
    }

    startTimer() {
        this.timeIntervalId = setInterval(() => {
            if (this.isPaused || this.gameIsOver) return;
            this.timeRemaining--;
            this.updateTimerDisplay();
            if (this.timeRemaining === 0) {
                this.timeIsOver();
            }
        }, 1000);
    }

    updateTimerDisplay() {
        const timerElement = document.querySelector('#timer')

        const seconds = this.timeRemaining % 60;
        timerElement.innerHTML = `00:${seconds < 10 ? "0" : ""}${seconds}`;
    }

    gameLoop() {
        if (this.isPaused || this.gameIsOver) return;
        this.update();
    }

    update() {
        this.player.move(this.isPaused);
        const idScore = document.querySelector('#score-number');
        const idLives = document.querySelector('#lives-number');

        for (let i = 0; i < this.obstacles.length; i++) {
            const obstacle = this.obstacles[i];
            obstacle.move(this.isPaused);

            if (this.player.didCollide(obstacle)) {
                console.log('Collision detected with:', obstacle);
                obstacle.element.remove();
                this.obstacles.splice(i, 1);

                if (obstacle instanceof BonusObstacle) {
                    this.score += 2;
                } else {
                    this.lives--;
                }

                idScore.innerHTML = this.score;
                idLives.innerHTML = this.lives;
                i--;
            } else if (obstacle.left < 0) {
                obstacle.element.remove();
                this.obstacles.splice(i, 1);

                if (!(obstacle instanceof BonusObstacle)) {
                    this.score++;
                }

                idScore.innerHTML = this.score;
                i--;
            }
        }

        if (this.lives === 0) {
            console.log('Game over. Lives are zero.');
            this.gameOver();
        }
    }


    generateObstacle() {
        if (this.gameIsOver) return;

        const randomValue = Math.random();
        if (randomValue < 0.35) {
            this.obstacles.push(new Obstacle(this.gameScreen));
        } else {
            this.obstacles.push(new BonusObstacle(this.gameScreen));
        }

        const nextInterval = (Math.random() + 1) * 2000;
        this.obstacleIntervalId = setTimeout(() => this.generateObstacle(), nextInterval);
    }

    pause() {
        this.isPaused = !this.isPaused;
    }

    gameOver() {
        this.clearGameElements();
        this.gameIsOver = true;
        this.gameScreen.style.display = "none";
        this.endGameScreen.style.display = "block";
        this.endGameScreenOne.style.display = "flex";
        this.endGameScreenTwo.style.display = "none";
    }

    timeIsOver() {
        this.clearGameElements();
        this.gameIsOver = true;
        this.gameScreen.style.display = "none";
        this.endGameScreen.style.display = "block";
        this.endGameScreenOne.style.display = "none";
        this.endGameScreenTwo.style.display = "flex";
    }

    // restartGame() doesn't work properly, player doesn't show up after restarting the game

    restartGame() {
        this.clearGameElements();
        this.initializeGame();
        this.startGame();
    }
}

export default Game;
