// OPTION #1 - if this one, how do i reference the answers without having to type everything over again?
// var quizDoc = document.getElementById(".quiz").querySelectorAll("div");
// var quizQuestions = document.getElementById('#questions');
// var quizAnswers = document.getElementById('#answers');


// var question = {
//     quizQuestion1: "What is the DOM?",
//     answer1: " ...data representation",
//     answer2: " ...i dont know.",
//     answer3: " ...who cares?",
//     answer4: " ...the wrong answer.",
//     correctAnswer: " ...data representation.",
// }
// 
// this is the beginning of an array of Q/A's and correct answers.
var questionsContainer = document.getElementById('questions');
var answersContainer = document.getElementById('answers');
//next 4 lines take user initials from scoreboard.
var scoreVal = 0
var score = document.getElementById('userScore');
var username = document.getElementById('username');
var submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click', userInitials);
var qId = 0
var questions = [{
        question: "Block scope is the same as...",
        answers: ['a. local variable', 'b. global variable', 'c. functions', 'd. declaration'],
        correctAnswer: 'a. local variable'
    },
    {
        question: "How does tightly scoping variable save memory?",
        answers: ['a. It does not matter.', 'b. The code no longer exists after the block executes.', 'c. The variables can be accessed anywhere.', 'd. Functions complete a task.'],
        correctAnswer: "b. The code no longer exists after the block executes."
    },
    {
        question: "What is the purpose of function parameters?",
        answers: ['a. to confuse new programmers.', 'b. a mouseclick event', 'c. so the function has data it can use', 'd. there is no purpose'],
        correctAnswer: "c. so the function has data it can use"
    },
    {
        question: "Why not declare all variables globally?",
        answers: ['a. scope pollution', 'b. global warming', 'c. it could create a new value for the variable', 'd. both \'a\' and \'c\''],
        correctAnswer: "d. both \'a\' and \'c\'"
    },
    {
        question: "What is a global variable?",
        answers: ['a. A variable defined in a function', 'b. A variable that is accessible in a block only', 'c. A variable that is also a parameter', 'd. A variable that is accessible in any part of the program.'],
        correctAnswer: "d. A variable that is accessible in any part of the program."
    },
    {
        question: "A local variable is...",
        answers: ['a. ...defined within a block and only available inside a block', 'b. ...available within a function', 'c. ...available throughout the program', 'd. ...outside of a block'],
        correctAnswer: "a. ...defined within a block and only available inside a block"
    },
    {
        question: "What type of data can an array store?",
        answers: ['a. lists', 'b. only the same', 'c. any', 'd. globes'],
        correctAnswer: 'c. any'
    },
    {
        question: "What should you do before getting started on a JavaScript project?",
        answers: ['a. cry', 'b. rethink your life decisions', 'c. pseudo code', 'd. open VS Code'],
        correctAnswer: "c. pseudo code"
    },
    {
        question: "What is the correct syntax for starting an array?",
        answers: ['a. " "', 'b. { }', 'c. ( )', 'd. [ ]'],
        correctAnswer: "d. [ ]"
    },
    {
        question: "Who is going to get a good grade on their JavaScript quiz?",
        answers: ['a. someone else', 'b. Joshua Clancy(me)', 'c. Bill Gates', 'd. Kobe Bryant'],
        correctAnswer: "b. Joshua Clancy(me)"
    },
]

// declared startButton for event Listener.
var startButton = document.getElementById('start');
startButton.addEventListener('click', startGame);

function startGame() {
    startButton.classList.add('hide')
    start.classList;
    start();
    setQuestion(qId);

}
// starts timer alerts 'game over' when at 0. var name was startTimer instead of start but caught some red
var counter = 60;

function start() {
    setInterval(function() {
        counter--;
        if (counter >= 0) {
            span = document.getElementById('count');
            span.innerHTML = counter;
        }
        if (counter === 0) {
            alert("GAME OVER, click any answers then next.")
            getStoredHighScores(score); //change this to enter score/intials
            clearInterval(counter);
        }
    }, 1000);
}

var q;
var A;

function setQuestion(qId) {
    questionsContainer.textContent = '';
    answersContainer.textContent = '';
    for (i = 0; i < questions.length; i++) {
        q = questions[qId].question

        A = questions[qId].answers;

        questionsContainer.textContent = q;

    }
    //forEach is used to call each element/question and to use another for loop inside a for loop without problems.
    A.forEach(ans => {
        var answerBtn = document.createElement('button');
        answerBtn.innerHTML = ans;
        answersContainer.appendChild(answerBtn);
        answerBtn.addEventListener('click', function() {
            checkAnswer(answerBtn.textContent);
        })
    })


    console.log(q)
    console.log(A)
}
// setQuestion(qId);

var nextBtn = document.getElementById('next')

function nextQuestion(q) {
    nextBtn.addEventListener('click', function() {
        if (q >= questions.length) {
            console.log('Your DONE!')
            end();
        } else {
            setQuestion(q);
            document.body.style.backgroundColor = 'blue';
        }
    })
}

//stops game, alerts to play a new game - i think this is where i need to add the scoreboard?

var quizContainer = document.querySelector('.quiz');

function getStoredHighScores() {
    var storedScores = localStorage.getItem('userScore');

    if (storedScores) {
        return JSON.parse(storedScores);

        // console.log('no score found, returning empty array');
        // return [];
    } else {
        console.log('before parsing', storedScores);
        console.log('after parsing', JSON.parse(storedScores));

    }


}


var scoreboard = document.querySelector('.scoreboard');
scoreboard.style.display = 'none';

function end() {
    quizContainer.style.display = 'none';
    scoreboard.style.display = 'block';


    //this is where lines 191-193 were(var, currentHighScores, localStorage, under submitBtnEventListner)

    alert('Refresh to play again'); //<--change this to display scoreboard.

}
//changes the body color depending on the right/wrong answer - right=green wrong=red
function checkAnswer(ans) {
    var checker = document.createElement('h3')
    if (ans === questions[qId].correctAnswer) {
        document.body.style.backgroundColor = 'green'
        scoreVal += 10;
        setScore();
    } else {
        document.body.style.backgroundColor = 'red'
        counter -= 10;
    }
    qId++
    nextQuestion(qId);
}

function setScore() {
    score.textContent = scoreVal;

}

//this next section will take in the users intials, hopefully.
//prevent page from reloading. tested and works - i think


function userInitials(event) {
    event.preventDefault();
    if (username.value === '') {
        return; //should i do return setScore();??
    }
    var tempArr = localStorage.getItem('userScore');
    var parsedArr = JSON.parse(tempArr);

    if (parsedArr != null) {
        parsedArr.push({
            username: username.value,
            score: score
        })
    }

}
//THIS WORKS BUT NEEDS TO BE SHOWN IN THE WINDOW, RIGHT NOW ONLY VISIBLE THRU CONSOLE.LOG
submitBtn.addEventListener('click', function() {
    var currentHighScores = getStoredHighScores();
    currentHighScores.push({ initials: username.value, score: scoreVal })
    localStorage.setItem('userScore', JSON.stringify(currentHighScores));
    var list = document.createElement('ul')
    list.classList.add('scoreList')
    var list2 = document.createElement('ul')
    list2.classList.add('scoreList');
    var listsContainer = document.createElement('div')
    listsContainer.classList.add('listsContainer');

    for (var i = 0; i < currentHighScores.length; i++) {
        var initials = currentHighScores[i].score;
        var initials2 = currentHighScores[i].initials;
        var initialHeader = document.createElement('li');
        initialHeader.textContent = initials;
        var initialHeader2 = document.createElement('li')
        initialHeader2.textContent = initials2
        list2.appendChild(initialHeader2);
        list.appendChild(initialHeader);
    }
    listsContainer.appendChild(list);
    listsContainer.appendChild(list2);

    scoreboard.appendChild(listsContainer);


    // displayNewScore(currentHighScores);
})

function displayNewScore(scores) {
    for (var i = 0; i < scores; i++) {

    }

}

//SCROLL DOWN TO SEE OTHER WAYS I WAS THINKING OF DOING THE Q/A SECTION.

// OPTION #2 - Would it be better to create the questions in HTML, answers in JS?  Answer - nope
// var answersQ1 = {
//     answer1: "...data representation that makes up the structure and content of a document on the web.",
//     answer2: "...i dont know.",
//     answer3: "...who cares?",
//     answer4: "...the wrong answer.",
//     correctAnswer: "...the wrong answer.",
// }

// OPTION #3 - Never learned about .this but it seems cool.
// var question1 = {
//     choiceX: true,
//     choiceY: false,
//     printQuestion: function() {
//         console.log(`Answer A is ${this.choiceX}`);

//     }

// }

// var answer = Object.create(question1);

// answer.choiceX = "...representation of data.";
// answer.choiceY = "...i don't know.";
// answer.choiceY = "...who cares?";
// answer.choiceY = "...the wrong answer.";
// answer.rightAnswer = true;

// OPTION #4 - Create a variable for every single answer (40+ vars!!) Dont do this if you can help it.