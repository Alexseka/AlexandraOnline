let currentQuestion = 0;
let answers = { happy: 0, sad: 0, angry: 0, anxious: 0 };

const questions = [
    {
        question: "How do you start your day?",
        answers: {
            happy: "With a deep breath, a stretch, and a little excitement for what’s ahead!",
            sad: "Dragging myself out of bed.",
            angry: "Grumbling at my alarm's existence.",
            anxious: "Running through my entire to-do list in my head."
        }
    },
    {
        question: "What’s your ideal way to relax?",
        answers: {
            happy: "Getting fresh air on a peaceful walk outside.",
            sad: "Curling up in my blankets, away from all the chaos.",
            angry: "Letting off steam through workouts or venting.",
            anxious: "Taking a few deep breaths and try to calm my mind."
        }
    },
    {
        question: "What do you do when things don’t go your way?",
        answers: {
            happy: "Find a positive side to it.",
            sad: "Accept my tragic fate",
            angry: "Complain loudly about it.",
            anxious: "Analyze alternative scenarios and spiral into what-ifs."
        }
    },
    {
        question: "Pick an evening activity:",
        answers: {
            happy: "Hanging out with friends, and making memories.",
            sad: "Unwinding with a quiet night to myself.",
            angry: "Channeling my energy into something productive",
            anxious: "Trying to relax but always thinking about what’s next."
        }
    },
    {
        question: "How do you respond to stress?",
        answers: {
            happy: "I relax and tackle things one step at a time.",
            sad: "I withdraw and need some time to process everything.",
            angry: " I get frustrated, but I try to refocus my energy",
            anxious: "I tend to overthink my options and struggle to make a decision."
        }
    },
    {
        question: "What kind of weather would you say best matches your mood?",
        answers: {
            happy: "A warm, breezy day with just the right amount of sunshine.",
            sad: "A quiet, rainy afternoon or snowstorms.",
            angry: "A dark thunderstorm, heavy rain, or hail.",
            anxious: "A fog, or a mix of the above."
        }
    },
    {
        question: "How do you deal with conflict?",
        answers: {
            happy: "I try to understand everything before looking for a peaceful solution.",
            sad: "I avoid confrontation and stay silent.",
            angry: "I tend to express my frustration, sometimes being blunt and direct.",
            anxious: "I try to keep calm, but I worry about how everything will play out"
        }
    },
    {
        question: "How do you feel about your job?",
        answers: {
            happy: "I wake up energized and excited for what’s ahead.",
            sad: "I’m just going through the motions, waiting for the weekend.",
            angry: "It feels like a never-ending cycle.",
            anxious: "I’m always trying to stay ahead of things, just in case a surprise pops up."
        }
    },
    {
        question: "What’s your relationship with social media?",
        answers: {
            happy: "It’s a great way to connect and keep up with everyone.",
            sad: "I scroll mindlessly, It can feel like a warp in time",
            angry: "Everything feels like an argument.",
            anxious: " I’m always wondering if I’m coming across the way I want to."
        }
    },
    {
        question: "What’s your favorite way to spend a day off?",
        answers: {
            happy: "Having fun with friends, trying something new, or just taking the day in stride",
            sad: "Staying in bed, sleeping or hiding away.",
            angry: "Running errands or crossing off tasks I’ve been avoiding.",
            anxious: "Spending the day bouncing between tasks, but feeling like there’s always more to do."
        }
    }
];
//btns for quiz portion
document.addEventListener('DOMContentLoaded', function () 
{
    document.getElementById('startBtn').addEventListener('click', startQuiz);
    document.getElementById('nextBtn').addEventListener('click', nextQuestion);
    document.getElementById('restartBtn').addEventListener('click', restartQuiz);
    showIntro();
});

//the starting introdution pg
function showIntro() 
{
    document.getElementById('intro').style.display = 'block';
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('results').style.display = 'none';
}

//quiz portion & Setting up my arrays
function startQuiz() {
    document.getElementById('intro').style.display = 'none';
    document.getElementById('quiz').style.display = 'block'; 
    currentQuestion = 0;
    answers = { happy: 0, sad: 0, angry: 0, anxious: 0 };
    displayQuestion();
}

//these are the grey italic comments for each emotion choice
const snarkyComments = {
    happy: 
    [
        "Oh look, someone’s happy!",
        "Isn't it just the best thing ever to be this happy?",
        "Wow, happiness! So rare these days...",
        "Exhausting.",
        "You must be a walking ray of sunshine."
    ],

    sad: 
    [
        "Awww, poor you.",
        "We all have our 'cry in the shower' moments.",
        "Poor thing. Want a tissue or a whole box?",
        "Well, isn’t that just heartwarming...",
        "Don’t worry, everything is totally fine..."
    ],

    angry: 
    [
        "Angry much? Someone needs a chill pill.",
        "Take it easy, it'll be okay. Probably...",
        "Oh, you’re angry? What a shocking twist.",
        "Maybe tone it down a little?",
        "Yikes."
    ],

    anxious: 
    [
        "Just breathe... or don't, your call.",
        "You’re overthinking this, aren’t you?",
        "Worry about it later, I mean it’s probably nothing...",
        "If you want to panic, it’s your show.",
        "Everything will fall apart."
    ]
};

// the grey italic comments that show once you've completed the quiz
const resultsComments = 
{
    happy: "Oh, look at you, overflowing with positivity, I'm sure that'll last a long time.",
    sad: "How utterly unexpected. Another sad soul. Truly shocked.",
    angry: "Oh, Someone's on fire. Don't burn the world down while you're at it.",
    anxious: "Congratulations on overthinking every little thing. It's impressive, really."
};


function displayQuestion() {

    if (currentQuestion < questions.length) 
        {
        let questionData = questions[currentQuestion];
        document.getElementById('question').textContent = questionData.question;
        let answersContainer = document.getElementById('answers');
        answersContainer.innerHTML = ''; 
        document.getElementById('snarkyComment').innerHTML = ''; 

        for (let emotion in questionData.answers)    
        {
            let answerOption = document.createElement('label');
            answerOption.innerHTML = ` <input type="radio" name="answer" value="${emotion}">${questionData.answers[emotion]}`;
            answersContainer.appendChild(answerOption);

            let radioButton = answerOption.querySelector('input');
            radioButton.addEventListener('change', function() 
            {
                displaySnarkyComment(emotion);
            });
        }
    } 
    else 
    {
        showResults();
    }
}

function displaySnarkyComment(emotion) //randomising which comment apprears
{
    const comments = snarkyComments[emotion];
    const randomComment = comments[Math.floor(Math.random() * comments.length)];
    document.getElementById('snarkyComment').textContent = randomComment;
}

let gaslight = false; //gaslighting concept

function nextQuestion() 
{
    let selectedAnswer = document.querySelector('input[name="answer"]:checked');
    
    if (!selectedAnswer) {
        alert("You gotta pick something, you can't just click 'next'.");
        return;
    }

    if (currentQuestion === 4 && !gaslight) { // triggers at Q5 and if gaslight false
        alert("Hey, I think you picked the wrong answer!");

        //swapping the choices
        let answerOptions = Array.from(document.querySelectorAll('input[name="answer"]'));
        [answerOptions[0].parentNode.innerHTML, answerOptions[1].parentNode.innerHTML] = [answerOptions[1].parentNode.innerHTML, answerOptions[0].parentNode.innerHTML];

        //resetting choice
        answerOptions.forEach(button =>
        {
        button.checked = false;
        button.addEventListener('change', () => displaySnarkyComment(button.value));
        });

        gaslight = true; //so there aren't infinite alerts
        return;
    }

    answers[selectedAnswer.value]++;
    currentQuestion++;
    displayQuestion();
}

function showResults() 
{
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('results').style.display = 'block';

    //finding highest emotion
    let maxAnswer = Object.keys(answers).reduce((a, b) => answers[a] > answers[b] ? a : b);

    let resultMessage = '';
    if (maxAnswer === 'happy') {
        resultMessage = "You seem pretty positive, that's great!";
    } else if (maxAnswer === 'sad') {
        resultMessage = "You might need some time to recharge, take care of yourself.";
    } else if (maxAnswer === 'angry') {
        resultMessage = "Take a breather every once and a while.";
    } else if(maxAnswer === 'anxious'){
        resultMessage = "Try not to overthink, eat, drink, it’ll be okay.";
    } else {
    resultMessage = "Woah, it's a Tie.";
    }

    document.getElementById('resultMessage').textContent = resultMessage;
    document.getElementById('score').textContent = `You chose ${maxAnswer} options the most.`;
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
    document.getElementById('emotionCounts').innerHTML = countMessage;
}

function restartQuiz() {
    let confirmRestart = confirm("Really? You serious..? Again?");
    if (confirmRestart) 
        {
        currentQuestion = 0;
        answers = { happy: 0, sad: 0, angry: 0, anxious: 0 };
        document.getElementById('results').style.display = 'none';
        document.getElementById('intro').style.display = 'block';
        } 
    else 
        {
        return;
        }
}

document.getElementById('noBtn').addEventListener('click', function () {
    let response = confirm("What are you even doing here then? Just Leave. ");
    if (response) 
    {
        window.location.href = "https://www.google.com";
    }
});
