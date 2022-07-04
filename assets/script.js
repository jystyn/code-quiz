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
    // These elements allow us to modify the html with javascript
    var timerEl = document.querySelector('#timer');
    var questionEl = document.querySelector('#question');
    var msgEl = document.querySelector('#message');
    var startBtnEl = document.querySelector('#start-btn');
    var wrapperEl = document.querySelector('.wrapper');
    var btnWrapperEL = document.querySelector('.btn-wrapper');
    var AnsValidationEL = document.querySelector('#ans-validation');
    var finalScorePageEl = document.querySelector('#final-score-page');
    var finalScoreEl = document.querySelector('#final-score');
    var submitScoreBtnEl = document.querySelector('#submit-score-btn');
    var leaderboardEl = document.querySelector('#leaderboard');
    var viewLeaderboardEL = document.querySelector('#view-leaderboard');
    var leaderboardListEl = document.querySelector('#leaderboard-list');
    // Variables to help cycle through questions and keep track of time and the user's score
    var shuffledQuestions;
    var currentQuestionIndex = 0;
    var userScore = 0;
    var timeLeft = 60;
    
    // Clicking events on the home page
    viewLeaderboardEL.addEventListener("click", goToLeaderboard);
    startBtnEl.addEventListener('click', startQuiz);
    
    // When we press 'Start Quiz' it clears the page and shows the first question
    function startQuiz(){
        msgEl.innerHTML = '';
        startBtnEl.remove();
        //this shuffles the questions
        shuffledQuestions = questions.sort(() => Math.random() - .5 );
        startTimer();
        showQuestion(shuffledQuestions[currentQuestionIndex]);
    }   

    // Timer function 
    function startTimer() {
        var timer = setInterval(function(){
             if (timeLeft > 0) {
                 timeLeft--;
                 timerEl.innerHTML = `Time left: ${timeLeft}s`;
             } else if (timeLeft === 0) {
                 timerEl.innerHTML = 'Times Up!';
                 clearInterval(timer);
                 finalScorePage();
             }
         },1000); 
     }

    // This populates the first question and it's corresponding answers
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

    // This shows a new question everytime you submit an answer
    function showNextQuestion(){
        AnsValidationEL.innerHTML = '';
        if (this.innerText == questions[currentQuestionIndex].correct) {
        userScore+=10;
        //Show message if correct
        var p = document.createElement('p');
        p.innerText = 'Correct! 10 points!'
        AnsValidationEL.appendChild(p);
        } else {
        timeLeft-=10;
        //show message if wrong
        var p = document.createElement('p');
        p.innerText = 'Incorrect! 10 second penalty.'
        AnsValidationEL.appendChild(p);

        }
        currentQuestionIndex++;
        if (currentQuestionIndex >= questions.length) {
            timeLeft = 0;
            finalScorePage();
        } else {
            showQuestion(shuffledQuestions[currentQuestionIndex]);
        }
    }

    // This shows the user their final score and allows them to enter their initials
    function finalScorePage(){
        wrapperEl.innerHTML = '<h1>Game Over!</h1>';
        finalScorePageEl.style.display = "flex";
        finalScoreEl.innerText = userScore;
        submitScoreBtnEl.addEventListener("click", showLeaderboard);

    }

    // This shows the leaderboard after the user enters initials
    function showLeaderboard(event){
        event.preventDefault();
        wrapperEl.innerHTML = '';
        leaderboardEl.style.display = "flex";
        finalScorePageEl.style.display = "none";
        // This gets rid of the ability to click "View Leaderboard" since we're already there
        viewLeaderboardEL.removeEventListener("click", goToLeaderboard);
        addHighScore();
    }

    // This function is what adds the users score to the leaderboard
    function addHighScore(){
        var listHighScores = JSON.parse(localStorage.getItem('listHighScores')) || [];
        var userInitials = document.querySelector("#initials").value;
        var highScore = {
            initials : userInitials,
            score: userScore,
        }
        // This adds a new score to the High Scores list in local storage
        listHighScores.push(highScore);
        localStorage.setItem("listHighScores", JSON.stringify(listHighScores));
        // Order high scores from greatest to least
        var ordererdLdrbrd = listHighScores.sort((a, b) => (b.score > a.score) ? 1 : -1);

        // This creates the ordered list on the Leaderboard
        for (var i = 0; i < ordererdLdrbrd.length; i++) {
            var li = document.createElement('li');
            li.innerText = `${ordererdLdrbrd[i].initials}: ${ordererdLdrbrd[i].score}`;
            leaderboardListEl.appendChild(li);
        }
    }

    // This sends the user to the leaderboard when they click "View Leaderboard"
    function goToLeaderboard() {
        wrapperEl.innerHTML = '';
        leaderboardEl.style.display = "flex";
        finalScorePageEl.style.display = "none";
        // This gets rid of the ability to click "View Leaderboard" since we're already there
        viewLeaderboardEL.removeEventListener("click", goToLeaderboard);
        
        var leaderboardList = JSON.parse(localStorage.getItem('listHighScores')); 

        for (var i = 0; i < leaderboardList.length; i++) {
            var li = document.createElement('li');
            li.innerText = `${leaderboardList[i].initials} ${leaderboardList[i].score}`;
            leaderboardListEl.appendChild(li);
        }
    }