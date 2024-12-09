const wordsWithHints = [
    { word: "apple", hint: "A sweet red or green fruit", color: "red" },
    { word: "banana", hint: "A long, yellow tropical fruit", color: "yellow" },
    { word: "cherry", hint: "A small, bright red fruit", color: "red" },
    { word: "grape", hint: "A small purple or green fruit used to make wine", color: "purple" },
    { word: "orange", hint: "A round citrus fruit, orange in color", color: "orange" },
    { word: "mango", hint: "A juicy tropical fruit, often golden or orange", color: "goldenrod" },
    { word: "blueberry", hint: "A small, dark blue fruit", color: "blue" },
    { word: "watermelon", hint: "A large green fruit with red flesh and black seeds", color: "green" },
];

const scrambledWordElement = document.getElementById("scrambled-word");
const hintElement = document.getElementById("hint");
const guessInput = document.getElementById("guess-input");
const guessButton = document.getElementById("guess-button");
const feedbackElement = document.getElementById("feedback");
const nextLevelButton = document.getElementById("next-level-button");
const levelIndicator = document.getElementById("level-indicator");
const attemptsElement = document.getElementById("attempts");

let currentLevel = 1;
let currentWord = "";
let currentHint = "";
let currentColor = "";
let attempts = 5;

function shuffleWord(word) {
    return word.split("").sort(() => Math.random() - 0.5).join("");
}

function startLevel() {
    const wordObject = wordsWithHints[currentLevel - 1];
    currentWord = wordObject.word;
    currentHint = wordObject.hint;
    currentColor = wordObject.color;

    scrambledWordElement.textContent = shuffleWord(currentWord);
    hintElement.textContent = `Hint: ${currentHint}`;
    hintElement.style.color = currentColor; 
    feedbackElement.textContent = "";
    guessInput.value = "";
    attempts = 5;
    attemptsElement.textContent = `Attempts left: ${attempts}`;
    nextLevelButton.classList.add("hidden");
    guessInput.disabled = false;
    guessButton.disabled = false;
    levelIndicator.textContent = `Level: ${currentLevel}`;
}

guessButton.addEventListener("click", () => {
    const guess = guessInput.value.trim().toLowerCase();
    attempts--;
    attemptsElement.textContent = `Attempts left: ${attempts}`;

    if (guess === currentWord) {
        feedbackElement.textContent = "🎉 Correct! Great job!";
        feedbackElement.className = "correct animated";
        guessInput.disabled = true;
        guessButton.disabled = true;

        if (currentLevel < wordsWithHints.length) {
            nextLevelButton.classList.remove("hidden");
        } else {
            feedbackElement.textContent = "🏆 You are the Winner!";
            feedbackElement.className = "winner animated";
        }
    } else if (attempts === 0) {
        feedbackElement.textContent = "💀 Game Over!";
        feedbackElement.className = "incorrect animated";
        guessInput.disabled = true;
        guessButton.disabled = true;
    } else {
        feedbackElement.textContent = "❌ Incorrect. Try again!";
        feedbackElement.className = "incorrect animated";
    }
});

nextLevelButton.addEventListener("click", () => {
    currentLevel++;
    if (currentLevel <= wordsWithHints.length) {
        startLevel();
    }
});
startLevel();
