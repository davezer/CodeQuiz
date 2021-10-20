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
        answer: "a. //This is comment"
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
        answer: " a. An infinite loop formed when a function calls itself"
    },
   
];

// starts game
function startQuiz(){
    //sets the timer 
    timerSeconds = 100;
    timerDisplay.textContent = timerSeconds;

    //starts timer 

    //starts questions

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

    //display the answer buttons
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











// start quiz EL
startButton.addEventListener("click", startQuiz);