let currentQuestion = 0;
let answers = { happy: 0, sad: 0, angry: 0, anxious: 0 };

const questions = [
    {
        question: "How do you start your day?",
        answers: {
            happy: "With a smile and a plan!",
            sad: "Lying in bed, questioning existence.",
            angry: "Annoyed that my alarm exists.",
            anxious: "Overthinking everything before I even get up."
        }
    },
    {
        question: "What’s your ideal way to relax?",
        answers: {
            happy: "A nice walk outside!",
            sad: "Crying into a pillow.",
            angry: "Punching a wall (or imagining it).",
            anxious: "Worrying about relaxing correctly."
        }
    },
    {
        question: "What do you do when things don’t go your way?",
        answers: {
            happy: "Find a positive side to it!",
            sad: "Accept my fate in despair.",
            angry: "Complain loudly about it.",
            anxious: "Panic and overanalyze."
        }
    },
    {
        question: "Pick an evening activity:",
        answers: {
            happy: "Hanging out with friends!",
            sad: "Staring at the ceiling.",
            angry: "Yelling at a video game.",
            anxious: "Worrying about tomorrow."
        }
    },
    {
        question: "How do you respond to stress?",
        answers: {
            happy: "Meditation. I’m zen.",
            sad: "I shut down and cry in silence.",
            angry: "I yell and make a scene.",
            anxious: "I spiral into panic."
        }
    },
    {
        question: "What’s your favorite season?",
        answers: {
            happy: "Spring! It’s fresh and hopeful.",
            sad: "Winter. It’s cold and lonely.",
            angry: "Summer. Too hot, too much!",
            anxious: "Fall. It’s too transitional, I never know what to expect."
        }
    },
    {
        question: "How do you deal with conflict?",
        answers: {
            happy: "Stay calm and find a peaceful solution.",
            sad: "I avoid confrontation and stay silent.",
            angry: "I go straight for the verbal attack.",
            anxious: "I try to manage the situation, but worry the whole time."
        }
    },
    {
        question: "How do you feel about your job?",
        answers: {
            happy: "I love it! It’s fulfilling.",
            sad: "I drag myself to work every day.",
            angry: "I hate my job, why do I even bother?",
            anxious: "I constantly worry about my performance."
        }
    },
    {
        question: "What’s your relationship with social media?",
        answers: {
            happy: "It’s fun, I love staying connected!",
            sad: "I scroll mindlessly, feeling disconnected.",
            angry: "I get upset by everything I see on there.",
            anxious: "I worry if I’m posting the right thing."
        }
    },
    {
        question: "What’s your favorite way to spend a Saturday?",
        answers: {
            happy: "Outdoors, having fun with friends!",
            sad: "Staying in bed, feeling miserable.",
            angry: "Running errands, complaining the whole time.",
            anxious: "Overthinking how I should spend my time."
        }
    }
];

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('startBtn').addEventListener('click', startQuiz);
    document.getElementById('nextBtn').addEventListener('click', nextQuestion);
    document.getElementById('restartBtn').addEventListener('click', restartQuiz);
    showIntro();
});

function showIntro() {
    document.getElementById('intro').style.display = 'block';
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('results').style.display = 'none';
}

function startQuiz() {
    document.getElementById('intro').style.display = 'none';
    document.getElementById('quiz').style.display = 'block'; 
    currentQuestion = 0;
    answers = { happy: 0, sad: 0, angry: 0, anxious: 0 };
    displayQuestion();
}

const snarkyComments = {
    happy: [
        "Oh look, someone’s happy!",
        "Isn't it just the best thing ever to be this happy?",
        "Wow, happiness! So rare these days...",
        "Exhausting.",
        "You must be a walking ray of sunshine."
    ],
    sad: [
        "Awww, poor you.",
        "We all have our 'cry in the shower' moments.",
        "Poor thing. Want a tissue or a whole box?",
        "Well, isn’t that just heartwarming...",
        "Don’t worry, everything is totally fine..."
    ],
    angry: [
        "Angry much? Someone needs a chill pill.",
        "Take it easy, it'll be okay. Probably...",
        "Oh, you’re angry? What a shocking twist.",
        "Maybe tone it down a little?",
        "Yikes."
    ],
    anxious: [
        "Just breathe... or don't, your call.",
        "You’re overthinking this, aren’t you?",
        "Worry about it later, I mean it’s probably nothing...",
        "If you want to panic, it’s your show.",
        "Everything will fall apart."
    ]
};


const resultsComments = {
    happy: "Oh, look at you, overflowing with positivity, I'm sure that'll last a long time.",
    sad: "How utterly unexpected. Another sad soul. Truly shocked.",
    angry: "Oh, Someone's on fire. Don't burn the world down while you're at it.",
    anxious: "Congratulations on overthinking every little thing. It's impressive, really."
};

function displayQuestion() {
    if (currentQuestion < questions.length) {
        let questionData = questions[currentQuestion];
        document.getElementById('question').textContent = questionData.question;

        let answersContainer = document.getElementById('answers');
        answersContainer.innerHTML = ''; 
        document.getElementById('snarkyComment').innerHTML = ''; 

        for (let emotion in questionData.answers) {
            let answerOption = document.createElement('label');
            answerOption.innerHTML = `
                <input type="radio" name="answer" value="${emotion}">
                ${questionData.answers[emotion]}
            `;
            answersContainer.appendChild(answerOption);

            let radioButton = answerOption.querySelector('input');
            radioButton.addEventListener('change', function() {
                displaySnarkyComment(emotion);
            });
        }
    } else {
        showResults();
    }
}

function displaySnarkyComment(emotion) {
    const comments = snarkyComments[emotion];
    const randomComment = comments[Math.floor(Math.random() * comments.length)];
    document.getElementById('snarkyComment').textContent = randomComment;
}

let gaslight = false; // New variable to track if the alert has already been shown

function nextQuestion() {
    let selectedAnswer = document.querySelector('input[name="answer"]:checked');

    if (selectedAnswer) {
        // If it's question 5 and the alert hasn't been shown yet
        if (currentQuestion === 4 && !gaslight) { // Question 5 is index 4
            alert("Hey, I think you picked the wrong answer!");

            // Swap the answers order
            let answerOptions = Array.from(document.querySelectorAll('input[name="answer"]'));
            let temp = answerOptions[0].parentNode.innerHTML;
            answerOptions[0].parentNode.innerHTML = answerOptions[1].parentNode.innerHTML;
            answerOptions[1].parentNode.innerHTML = temp;

            // Reset the radio buttons so the user can pick again
            answerOptions.forEach(button => button.checked = false);

            // Add event listeners to the new swapped buttons
            answerOptions.forEach(button => {
                button.addEventListener('change', function() {
                    displaySnarkyComment(button.value);
                });
            });

            // Set gaslighted to true so the alert won't show again
            gaslight = true;

            return; // Prevent moving to the next question until a new answer is selected
        }

        let answer = selectedAnswer.value;
        answers[answer]++; 

        currentQuestion++;
        displayQuestion();
    } else {
        alert("You gotta pick something, you can't just click 'next'.");
    }
}

function showResults() {
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('results').style.display = 'block';

    // Find the emotion with the highest count
    let maxAnswer = Object.keys(answers).reduce((a, b) => answers[a] > answers[b] ? a : b);

    let resultMessage = '';
    if (maxAnswer === 'happy') {
        resultMessage = "You seem pretty positive, that's great!";
    } else if (maxAnswer === 'sad') {
        resultMessage = "You might need some time to recharge, take care of yourself.";
    } else if (maxAnswer === 'angry') {
        resultMessage = "Take a breather every once and a while.";
    } else {
        resultMessage = "Try not to overthink, eat, drink, it’ll be okay.";
    }

    document.getElementById('resultMessage').textContent = resultMessage;
    document.getElementById('score').textContent = `You selected "${maxAnswer}" the most.`;

  document.getElementById('sarcasticComment').textContent = resultsComments[maxAnswer];

   
    let countMessage = `
        <p>Here's a breakdown of how you answered:</p>
        <ul>
            <li>Happy: ${answers.happy}</li>
            <li>Sad: ${answers.sad}</li>
            <li>Angry: ${answers.angry}</li>
            <li>Anxious: ${answers.anxious}</li>
        </ul>
    `;

    // Append the count breakdown to the results section
    document.getElementById('emotionCounts').innerHTML = countMessage;
}

function restartQuiz() {
    let confirmRestart = confirm("Really? You serious..? Again?");

    if (confirmRestart) {
        currentQuestion = 0;
        answers = { happy: 0, sad: 0, angry: 0, anxious: 0 };
        document.getElementById('results').style.display = 'none';
        document.getElementById('intro').style.display = 'block';
    } else {
        return;
    }
}

document.getElementById('noBtn').addEventListener('click', function () {
    let response = confirm("What are you even doing here then? Just Leave. ");
    if (response) {
        window.location.href = "https://www.google.com";
    }
});
