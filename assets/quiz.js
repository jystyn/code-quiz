var questions = [
    {
        question: 'What is like the skeleton of the website?',
        answers: [
            {text: 'html'},
            {text: 'css'},
            {text: 'javascript'},
            {text: 'c++'}
        ],
        correct: 'html'
    },
    {
        question: 'Which of these styles the website?',
        answers: [
            {text: 'html'},
            {text: 'css'},
            {text: 'javascript'},
            {text: 'c++'}
        ],
        correct: 'css'
    },
    {
        question: 'What makes a website interactive?',
        answers: [
            {text: 'html'},
            {text: 'css'},
            {text: 'javascript'},
            {text: 'c++'}
        ],
        correct: 'javascript'
    },
    {
        question: 'Which of these is the "and" logical operator?',
        answers: [
            {text: '&&'},
            {text: '||'},
            {text: '>='},
            {text: '!'}
        ],
        correct: '&&'
    },
    {
        question: 'Which of these is the "or" logical operator?',
        answers: [
            {text: '&&'},
            {text: '||'},
            {text: '>='},
            {text: '!'}
        ],
        correct: '||'
    }
];
    //timerEl allows us to display the countdown timer in the top right corner
    var timerEl = document.querySelector('#timer');
    // creating elements for us to modify different parts of our base HTML
    var questionEl = document.querySelector('#question');
    var msgEl = document.querySelector('#message');
    var startBtnEl = document.querySelector('#start-btn');
    var wrapperEl = document.querySelector('.wrapper');
    var btnWrapperEL = document.querySelector('.btn-wrapper');
    var finalScorePageEl = document.querySelector('#final-score-page');
    var finalScoreEl = document.querySelector('#final-score');
    var submitScoreBtnEl = document.querySelector('#submit-score-btn');
    var leaderboardEl = document.querySelector('#leaderboard');
    // create variables to shuffle questions
    var shuffledQuestions;
    var currentQuestionIndex = 0;
    var userScore = 0;
    var timeLeft = 60;

    
    startBtnEl.addEventListener('click', startQuiz);
    
    // When we press 'Start Quiz' it clears the page
    function startQuiz(){
        msgEl.innerHTML = '';
        startBtnEl.remove();
        shuffledQuestions = questions.sort(() => Math.random() - .5 );
        startTimer();
        showQuestion(shuffledQuestions[currentQuestionIndex]);
    }   
    // timer function called when the user presses 'start quiz' 
    function startTimer() {
        var timer = setInterval(function(){
             if (timeLeft > 0) {
                 timeLeft--;
                 timerEl.innerHTML = 'Time Left: ' + timeLeft + 's';;
             } else if (timeLeft === 0) {
                 timerEl.innerHTML = 'Times Up!';
                 clearInterval(timer);
                 finalScorePage();
             }
         },1000); 
     }
    // The first question shows up when the user presses 'start quiz'
    function showQuestion(question) {
        questionEl.innerText = question.question;
        btnWrapperEL.innerHTML = '';
        question.answers.forEach(answer => {
            var button = document.createElement('button');
            button.innerText = answer.text;
            btnWrapperEL.appendChild(button);
            button.addEventListener("click", showNextQuestion);
        })
    }

    function showNextQuestion(){
        if (this.innerText == questions[currentQuestionIndex].correct) {
        userScore+=10;
        //message correct
        } else {
        timeLeft-=10;
        //message wrong
        }
        currentQuestionIndex++;
        if (currentQuestionIndex >= questions.length) {
            timeLeft = 0;
            finalScorePage();
        } else {
            showQuestion(shuffledQuestions[currentQuestionIndex]);
        }
    }

    function finalScorePage(){
        wrapperEl.innerHTML = '';
        finalScorePageEl.style.display = "flex";
        finalScoreEl.innerText = userScore;
        submitScoreBtnEl.addEventListener("click", showLeaderboard);

    }

    function showLeaderboard(event){
        console.log('test');
        event.preventDefault();
        leaderboardEl.style.display = "flex";
        finalScorePageEl.style.display = "none";
        //create leaderboard with local data
    }