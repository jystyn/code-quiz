var questions = [
    {
        question: 'What is like the skeleton of the website?',
        answers: [
            {text: 'html', correct: true },
            {text: 'css', correct: false },
            {text: 'javascript', correct: false },
            {text: 'c++', correct: false }
        ]
    },
    {
        question: 'Which of these styles the website?',
        answers: [
            {text: 'html', correct: false },
            {text: 'css', correct: true },
            {text: 'javascript', correct: false },
            {text: 'c++', correct: false}
        ]
    },
    {
        question: 'What makes a website interactive?',
        answers: [
            {text: 'html', correct: false },
            {text: 'css', correct: false },
            {text: 'javascript', correct: true },
            {text: 'c++', correct: false}
        ]
    },
    {
        question: 'Which of these is the "and" logical operator?',
        answers: [
            {text: '&&', correct: true },
            {text: '||', correct: false },
            {text: '>=', correct: false },
            {text: '!', correct: false}
        ]
    },
    {
        question: 'Which of these is the "or" logical operator?',
        answers: [
            {text: '&&', correct: false },
            {text: '||', correct: true },
            {text: '>=', correct: false },
            {text: '!', correct: false}
        ]
    }
];
    //timerEl allows us to display the countdown timer in the top right corner
    var timerEl = document.getElementById('timer');
    // creating elements for us to modify different parts of our base HTML
    var questionEl = document.getElementById('question');
    // var answerBtnEls = document.querySelector('.answer');
    var msgEl = document.getElementById('message');
    var startBtnEl = document.getElementById('startBtn');
    var wrapperEl = document.querySelector('.wrapper');
    var btnEl = document.querySelector('.btn');
    // create variables to shuffle questions
    var shuffledQuestions, currentQuestionIndex;
    var timeLeft = 60;
    function startTimer() {
       var timer = setInterval(function(){
            if (timeLeft > 0) {
                timeLeft--;
                timerEl.innerHTML = 'Time Left: ' + timeLeft + 's';;
            } else if (timeLeft === 0) {
                timerEl.innerHTML = 'Times Up!';
                clearInterval(timer);
            }
        },1000); 
    }
    function start(){
        startTimer();
        // When we press 'Start Quiz' it changes the page to get us ready for questions
        msgEl.innerHTML = '';
        startBtnEl.remove();
        shuffledQuestions = questions.sort(() => Math.random() - .5 );
        currentQuestionIndex = 0;
        setNextQuestion();
    }    

    function setNextQuestion() {
        showQuestion(shuffledQuestions[currentQuestionIndex]);
    }

    function showQuestion(question) {
        questionEl.innerText = question.question;
        question.answers.forEach(answer => {
            var button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn');
            wrapperEl.appendChild(button);
            // selectAnswer();
        })
    }

    function selectAnswer(){
        btnEl.addEventListener('click', function(){
        var userAnswer = this.innerText;
        console.log(userAnswer);

        })

    }