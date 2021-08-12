var lives;
var lockFlag;
var guessedLetterFlag;

var firstHintLock;
var secondHintLock;
var thirdHintLock;

var firstHint;
var secondHint;
var thirdHint;

var firstHintPressed;
var timer;

var flag;
var countdown;

var wordsArr = ['force', 'numerous', 'invincible', 'count', 'overwrought', 'colour', 'memory', 'succeed', 'overrated', 'voracious',
    'machine', 'tight', 'use', 'flesh', 'smash', 'cactus', 'mammoth', 'ashamed', 'tough', 'servant', 'lamp', 'manage', 'dependent',
    'guarded', 'thick', 'scrawny', 'regular', 'angle', 'delay', 'quilt', 'monkey', 'leg', 'drunk', 'separate', 'hall', 'haunt',
    'stuff', 'pipe', 'ill', 'belong', 'art', 'rice', 'poor', 'truculent', 'spectacular', 'work', 'swanky', 'hang', 'dashing',
    'attack', 'wren', 'veil', 'skillful', 'jellyfish', 'fasten', 'neighborly', 'waggish', 'press', 'argue', 'lethal', 'petite',
    'coordinated', 'ducks', 'stimulating', 'uttermost', 'arrogant', 'bare', 'daily', 'dog', 'complete', 'observation', 'perform',
    'squeeze', 'blush', 'shrug', 'cakes', 'wasteful', 'sophisticated', 'best', 'line', 'injure', 'hesitant', 'star', 'amuck',
    'noisy', 'relieved', 'unequaled', 'breath', 'hook', 'chilly', 'toys', 'compete', 'gather', 'chunky', 'concerned', 'ambitious',
    'righteous', 'symptomatic', 'grip', 'thin', 'available', 'cemetery', 'pretend', 'scientific', 'encouraging', 'taste', 'unadvised',
    'quixotic', 'afterthought', 'comparison', 'airplane', 'shoe', 'right', 'battle', 'puzzling', 'first', 'irritating', 'sweets',
    'appointment', 'anarchy', 'lollipop', 'fragrance', 'albatross', 'animal', 'tired', 'penguin', 'watermelon', 'polio', 'cherry'
];

var guess = [];
var guessedLetterArr = [];
var allGuessesArr = [];

var randomWord = wordsArr[Math.floor(Math.random() * wordsArr.length)];
var randomWordArr = [...randomWord];

var vowelArr = ['a', 'e', 'i', 'o', 'u'];
var vowelCount;

var alphabet;

var wordStatus = null;

var playGame = () => {
    lives = 6;
    lockFlag = true;
    guessedLetterFlag = false;

    firstHintLock = true;
    secondHintLock = true;
    thirdHintLock = true;

    firstHintPressed = false;
    timer = 101;

    /* generate a random word from the word array */
    randomWord = wordsArr[Math.floor(Math.random() * wordsArr.length)];
    randomWordArr = [...randomWord];

    vowelCount = 0;

    alphabet = "qwertyuiopasdfghjklzxcvbnm";

    /* loop through and make sure that each button is clickable again */
    for (let i = 0; i < alphabet.length; i++) {
        document.getElementById(alphabet.charAt(i)).disabled = false;
    }

    /* count the number of vowels present */
    for (let i = 0; i < randomWordArr.length; i++) {
        for (let j = 0; j < vowelArr.length; j++) {
            if (randomWordArr[i] === vowelArr[j])
                vowelCount++;
        }
    }

    /* add an 's' to end of sentence if more than one vowel is present */
    if (vowelCount === 1) {
        document.getElementById("displayS").innerHTML = "";
    } else {
        document.getElementById("displayS").innerHTML = "s";
    }

    /* hints will not show up when game is loaded */
    document.getElementById("displayFirstHint").style.display = "none";
    document.getElementById("displaySecondHint").style.display = "none";
    document.getElementById("displayThirdHint").style.display = "none";

    document.getElementById("vowelCount").innerHTML = vowelCount;
    document.getElementById("firstLetter").innerHTML = randomWordArr[0];
    document.getElementById("play").innerHTML = "Play";

    startTimer();
    updatePicture();
}

var toggleFirstHint = () => {
    firstHintPressed = true;
    firstHint = document.getElementById("displayFirstHint");
    firstHint.style.display = "block";

    /* go through each element of word and check if the letter guessed is located in word - if it is,
       display the letter, if not, display ' _ ' */
    wordStatus = randomWord.split("").map(element => (guess.indexOf(element) >= 0 ? element : " _ ")).join("");
    document.getElementById("answer").innerHTML = wordStatus;

    /* decrement time by '40' if user views first hint */
    if (firstHintLock) {
        timer -= 40;
        firstHintLock = false;
    }
}

var toggleSecondHint = () => {
    secondHint = document.getElementById("displaySecondHint");
    secondHint.style.display = "block";

    /* decrement time by '10' if user views second hint */
    if (secondHintLock) {
        timer -= 10;
        secondHintLock = false;
    }
}

var toggleThirdHint = () => {
    thirdHint = document.getElementById("displayThirdHint");
    thirdHint.style.display = "block";

    /* decrement time by '25' if user views third hint */
    if (thirdHintLock) {
        timer -= 25;
        thirdHintLock = false;
    }
}

var handleClick = (letter) => {
    if (lockFlag) {
        guessedLetterFlag = false;
        flag = false;

        guess.indexOf(letter) === -1 ? guess.push(letter) : null;

        if (randomWord.indexOf(letter) >= 0) {
            /* same logic as previously mentioned */
            if (document.getElementById("displayFirstHint").style.display = "block" && firstHintPressed) {
                wordStatus = randomWord.split("").map(element => (guess.indexOf(element) >= 0 ? element : " _ ")).join("");

                document.getElementById("answer").innerHTML = wordStatus;
            }
        } else if (randomWord.indexOf(letter) === -1) {
            updatePicture();
        }

        for (let i = 0; i < randomWordArr.length; i++) {
            if (letter === randomWordArr[i]) {
                if (!firstHintPressed) {
                    /* only display this if the user does not click on the first hint */
                    document.getElementById("displayContent").innerHTML = letter + " is in the word";
                }
                flag = true;
                guessedLetterFlag = true;
                
                for (let i = randomWordArr.length; i >= 0; i--) {
                    /* remove letter from array so that the user can't guess it again */
                    if (randomWordArr[i] === letter) {
                        randomWordArr.splice(i, 1);
                    }
                }

                if (randomWordArr.length === 0) {
                    wonGame();
                }
            }
        }

        if (!guessedLetterFlag) {
            /* show letters in wordbank */
            guessedLetterArr.push(letter);
            document.getElementById("guessedLetters").innerHTML = guessedLetterArr.join(' ');
        }

        if (!flag) {
            /* if guess is not in array, decrement lives by '1' and update the picture */
            lives--;
            updatePicture();
        }

        if (lives === 0) {
            document.getElementById("displayContent").innerHTML = "Game Over! You Lost!  The word was " + randomWord + "!";
            document.getElementById("play").innerHTML = "Play Again";
            lockFlag = false;
            clearInterval(countdown);
        }
        
        /* every button is disabled once clicked */
        document.getElementById(document.getElementById(letter).id).setAttribute('disabled', true)
    }
}

var updatePicture = () => {
    /* picture gets updated each time a life is lost in the game */
    document.getElementById("picture").src = "./images/" + lives + ".jpg";
}

var startTimer = () => {
    if (timer > 0) {
        timer--;
    } else {
        lockFlag = false;
        document.getElementById("displayContent").innerHTML = "Time is up!  Game Over!  The word was " + randomWord + "!";
        document.getElementById("play").innerHTML = "Play Again";
        timer = 0;
    }

    clearInterval(countdown);
    countdown = setInterval(startTimer, 1000);
    document.getElementById("gameScore").innerHTML = timer;
}

var wonGame = () => {
    clearInterval(countdown);
    document.getElementById("displayContent").innerHTML = "You Won!  Time Left: " + timer;
    document.getElementById("play").innerHTML = "Play Again";
    lockFlag = false;
}

var reset = () => {
    /* reset game attributes so that guesses from previous games no longer show up */
    guess = [];
    guessedLetterArr = [];
    allGuessesArr = [];

    document.getElementById("displayContent").innerHTML = "";
    document.getElementById("lives").innerHTML = "";
    document.getElementById("answer").innerHTML = "";
    document.getElementById("guessedLetters").innerHTML = "";

    playGame();
}