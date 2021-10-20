var navBar = document.querySelector("nav");
var highscoresLink = document.getElementById("highscores-link");
var container = document.getElementById("container");
var timerDisplay = document.getElementById("timer");
var startButton = document.getElementById("start-button");
var title = document.getElementById("title");
var text = document.getElementById("text");
var quizAnswers = document.getElementById("quiz-answers");
var answerButtons = document.getElementsByClassName("answer-button");
var answerMessage = document.getElementById("answer-message");
var inputField = document.getElementById("input-field");
var initials = document.getElementById("intials");
var submitButton = document.getElementById("submit-button");

//set variables
var timerSeconds = 0;
var currentQuestion = 0;
var score = 0;
var scoreArray = [];
var timerInterval = false;

const questions = [
    {
        title: "How do you add a comment in JavaScript?",
        choices: ["a. //This is a comment", "b. <!--This is a comment-->", "c. This is a comment", "d. *This is a comment*"],
        answer: "a. //This is a comment"
    },

    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["a. Curly Brackets", "b. Commas", "c. Quotes", "d. Parenthesis"],
        answer: "c. Quotes",
    },
    {
        title: "To see if two variables are equal in an if / else statement you would use ____.",
        choices: ["a. =", "b. ==", "c. 'Equals'", "d. !="],
        answer: "b. =="
    },
    {
        title: "The first index of an array is ____.",
        choices: ["a. 0", "b. 1", "c. 3", "d. 9"],
        answer: "a. 0"
    },
    {
        title: "How do you create a function in JavaScript?",
        choices: ["a. function = myFunction()", "b. function myFunction()", "c. createMyFunction.exe", "d. functionMyFunction;"],
        answer: "b. function myFunction()"
    },
    {
        title: "How do you call a function in Javascript",
        choices: ["a. By Phone", "b. function myFunction()", "c. myFunction()", "d. function = myfunction()"],
        answer:  "c. myFunction()"
    },
    {
        title: "Within a loop, the 'break' keyword may be used to do what?",
        choices :["a. Break your code", "b. Return to the top", "c. Exit the loop immediately", "d. Break time!"],
        answer: "c. Exit the loop immediately"
    },
    {
        title: "What is a recursive loop?",
        choices: ["a. An infinite loop formed when a function calls itself", "b. A loop that executes once and exits", "c. A loop that prints a return", "d. All of the above"],
        answer: "a. An infinite loop formed when a function calls itself"
    },
   
];

// starts game
function startQuiz(){
    //sets the timer 
    timerSeconds = 100;
    timerDisplay.textContent = timerSeconds;

    //starts timer 
    timerCountdown();
    //starts questions
    nextQuestion();
    //remove start button
    startButton.style.display = "none";
}

// changes to next question
function nextQuestion(){
    // change look of page
    container.className = "results-page mt-5"
    title.textContent = "Question" + (currentQuestion + 1);
    title.setAttribute("claass", "h2")
    text.textContent = questions[currentQuestion].title;
    text.className = "h4";
    text.setAttribute("style", "border-top: 1px double solid; padding-top 15px;")

    //display answer buttons
    quizAnswers.style.display = "block";

    // take answers from the questions array and assign to answer buttons
    answerButtons[0].textContent = questions[currentQuestion].choices[0];
    answerButtons[1].textContent = questions[currentQuestion].choices[1];
    answerButtons[2].textContent = questions[currentQuestion].choices[2];
    answerButtons[3].textContent = questions[currentQuestion].choices[3];

    // clicking button checks answer (***MAKE THIS FUNCTION NEXT***)
    for (i = 0; i < answerButtons.length; i++){
        answerButtons[i].addEventListener("click", checkAnswer);
    }
}

function checkAnswer(event){
    
    // correct answer
    if (event.target.textContent === questions[currentQuestion].answer){
        answerMessage.style.display = "block";
        answerMessage.textContent = "Yes!";
        answerMessage.className= "answer-message";
        currentQuestion++;
        score++;
    
        // remove message
        setTimeout(function() {
            answerMessage.style.display = "none";
        }, 800)

        // end game if no more questions
        if (currentQuestion === questions.length){
            endGame();
        
        //if more questions exist, keep going
        } else {
            nextQuestion();
        }

    // if wrong answer is selected
    } else {
        currentQuestion++;
        answerMessage.style.display = "block";
        answerMessage.textContent = "Nope!";
        answerMessage.className = "answer-message";

        if (timerSeconds < 10) {
            timerSeconds - 10;
            endGame();

        } else if (currentQuestion === 8) {
            endGame();

        } else {
            timerSeconds -= 10;
            nextQuestion();
        };
    }
};

function endGame(){
    //change page
    quizAnswers.style.display = "none";
    container.className = "quiz mage mt-5"
    title.setAttribute ("class", "h2");
    text.setAttribute("style", "border-top: 0");
    text.removeAttribute("class");
    text.textContent = "Final score: " + score + ". Enter your initials!";
    inputField.style.display = "block";

    //change title display
    if (timerSeconds <= 0){
        title.textContent = "Out of time!";
    } else {
        title.textContent = "Done!";
    }

    submitButton.addEventListener("click", storeHighScore);
    
}

//store high scores in localStorage
function storeHighScore (event){
    event.preventDefault();

    if (initials.value.length === 0){
        return
    } else {
        newScore = {
            userName: initials.value.trim(),
            userScore: score
        };
        scoreArray.push(newScore);

        scoreArray.sort((a,b) => b.userScore - a.userScore);

        localStorage.setItem("score", JSON.stringify(scoreArray));

        seeHighScores();
    }

}



//loads high scores into scores array
function loadHighScore(){
    storedScores = JSON.parse(localStorage.getItem("score"));

    if (storedScores !== null) {
        scoreArray = storedScores;

        return scoreArray;
    }

}

//shows the high scores
function seeHighScores() {
    // clears timerInterval if countdown has been initiated
    if (timerInterval) {
        clearInterval(timerInterval);
    };

    // creates new list and button elements and appends them to container
    container.className = 'score-page mt-5 card bg-light p-4';
    var ul = document.createElement('ul');
    var returnButton = document.createElement('button');
    var clearButton = document.createElement('button');
    returnButton.textContent = 'Go Back';
    clearButton.textContent = 'Clear High Scores';
    container.appendChild(ul);
    container.appendChild(returnButton);
    container.appendChild(clearButton);

    // removes navbar and other elements
    startButton.style.display = 'none';
    navBar.style.visibility = 'hidden';
    title.textContent = 'High Scores';
    text.textContent = '';
    text.setAttribute('style', 'border-top: 0');
    quizAnswers.style.display = 'none';
    inputField.style.display = 'none';

    // render a new li for each highscore
    for (i = 0; i < scoreArray.length; i++) {
        var score = scoreArray[i].userName + ' : ' + scoreArray[i].userScore;

        li = document.createElement('li');
        li.textContent = score;
        ul.appendChild(li);
    }

    // adds event listener for return button to bring person back to index.html
    returnButton.addEventListener('click', function() {
        location.href = 'index.html'
    });

    // adds event listener for clear button for clearing local storage and deletes li elements
    clearButton.addEventListener('click', function() {
        localStorage.clear();
        ul.innerHTML = '';
    });
};


// counts down from starting timerSecs 
function countdown() {
    // interval function that counts down
    timerInterval = setInterval(function() {
        timerSecs --;
        timerDisplay.textContent = timerSecs;

        // alert that user has run out of time and end game if timer runs out
        if (timerSecs < 1) {
            timerDisplay.textContent = 0;
            endGame();
            clearInterval(timerInterval);
        };

        // clear timer if current question hits 5 (game is over)
        if (currentQuestion === 5) {
            timerDisplay.textContent = timerSecs;
            clearInterval(timerInterval);
        }
    }, 1000)
}





//timer countdown function
function timerCountdown(){  
    timerInterval = setInterval(function(){
        timerSeconds --;
        timerDisplay.textContent = timerSeconds;

        if (timerSeconds < 1) {
            timerDisplay.text = 0;
            endGame();
            clearInterval(timerInterval);
        };

        if (currentQuestion === 8){
            timerDisplay.textContent = timerSeconds;
            clearInterval(timerInterval);
        }
    }, 1000)


} 

loadHighScore();

// start quiz EL
startButton.addEventListener("click", startQuiz);

//highScore EL
highscoresLink.addEventListener("click", seeHighScores);