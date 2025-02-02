import Game from './game.js';

window.onload = function () {
    const startButton = document.querySelector("#start-button");
    const instructionButton = document.querySelector("#instruction-button");
    const restartButton = document.querySelector("#restart-button");
    const startAudio = document.querySelector("#start-audio");
    const gameAudio = document.querySelector("#main-audio");
    let game = new Game();

    startAudio.volume = 0.3;
    gameAudio.volume = 0.3;

    function playHomeAudio() {
        startAudio.play().catch((error) => {
            console.error("Error attempting to play home audio:", error);
            document.body.addEventListener('click', playHomeAudio, { once: true });
        })
    }

    playHomeAudio();


    startButton.addEventListener("click", function () {
        startAudio.pause();
        gameAudio.play().catch((error) => {
            console.error("Error attempting to play game audio:", error);
        });
        game.startGame();
    });

    instructionButton.addEventListener("click", function () {
        game.showInstructions();

    });

    restartButton.addEventListener("click", () => {
        game.restartGame();
    });

    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("keyup", handleKeyup);

    function handleKeydown(e) {
        if (!game) return;
        const key = e.key;

        const possibleKeystrokes = [
            "ArrowLeft",
            "ArrowUp",
            "ArrowRight",
            "ArrowDown",
            "a",
            "w",
            "d",
            "s",
            "p",
            "Enter",
            "Backspace",
        ];

        if (possibleKeystrokes.includes(key)) {
            e.preventDefault();

            switch (key) {
                case "ArrowLeft":
                case "a":
                    game.player.directionX = -5;
                    break;
                case "ArrowUp":
                case "w":
                    game.player.directionY = -5;
                    break;
                case "ArrowRight":
                case "d":
                    game.player.directionX = 5;
                    break;
                case "ArrowDown":
                case "s":
                    game.player.directionY = 5;
                    break;
                case "Enter":
                    if (isGameScreenVisible() || isEndScreenVisible()) {
                        game.restartGame();
                    }
                    break;
                case "p":
                    game.pause();
                    break;
                case "Backspace":
                    goBackHome();
                    break;
            }
        }
    }

    function handleKeyup(event) {
        if (!game) return;
        const key = event.key;
        const possibleKeystrokes = [
            "ArrowLeft",
            "ArrowUp",
            "ArrowRight",
            "ArrowDown",
            "a",
            "w",
            "d",
            "s",
        ];

        if (possibleKeystrokes.includes(key)) {
            switch (key) {
                case "ArrowLeft":
                case "a":
                    game.player.directionX = 0;
                    break;
                case "ArrowUp":
                case "w":
                    game.player.directionY = 0;
                    break;
                case "ArrowRight":
                case "d":
                    game.player.directionX = 0;
                    break;
                case "ArrowDown":
                case "s":
                    game.player.directionY = 0;
                    break;
            }
        }
    }

    function goBackHome() {
        location.reload();
    }

    function isGameScreenVisible() {
        const gameScreen = document.querySelector("#game-screen");
        return gameScreen && gameScreen.style.display === "block";
    }

    function isEndScreenVisible() {
        const endGameScreen = document.querySelector("#end-game-screen");
        return endGameScreen && endGameScreen.style.display === "block";
    }
};
