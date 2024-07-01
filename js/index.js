
window.onload = function () {
    const startButton = document.querySelector("#start-button");
    const instructionButton = document.querySelector("#instruction-button");
    const instruction = document.querySelector("#instruction-div");
    const sectionDiv = document.querySelector("#section-home");

    let game; // game

    startButton.addEventListener("click", function () {
        console.log('Button clicked');
    });

    instructionButton.addEventListener("click", function () {
        console.log('Instruction Button clicked');
        instruction.style.display = "flex";
        sectionDiv.style.display = "none";


    });

    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("keyup", handleKeyup);

    function handleKeydown(e) {
        const key = e.key;
        const possibleKeystrokes = [
            "ArrowLeft",
            "ArrowUp",
            "ArrowRight",
            "ArrowDown",
            "LetterA",
            "LetterW",
            "LetterD",
            "LetterS",
            "LetterP",
            "Enter",
            "Backspace",
        ];

        if (possibleKeystrokes.includes(key)) {
            e.preventDefault();

            switch (key) {
                case "ArrowLeft":
                case "LetterA":
                    game.player.directionX = -1;
                    break;
                case "ArrowUp":
                case "LetterW":
                    game.player.directionY = -1;
                    break;
                case "ArrowRight":
                case "LetterD":
                    game.player.directionX = 1;
                    break;
                case "ArrowDown":
                case "LetterS":
                    game.player.directionY = 1;
                    break;
                // Pause, Enter and Backspace to be implemented
            }
        }
    }
}
