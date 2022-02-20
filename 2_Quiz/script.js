const quizData = [
    {
        queston:"How old is Donald Trump?",
        a:"76",
        b:"75",
        c:"74",
        d:"79",
        correct:"c",
    },
    {
        queston:"President of the United States (2022)?",
        a:"Donald Trump",
        b:"Joe Biden",
        c:"Kamla Harris",
        d:"Barack Obama",
        correct:"b",
    },
    {
        queston:"What does HTML stand for?",
        a:"Cascading Style Sheets",
        b:"Hypertext Markup Language",
        c:"Application Program Interface",
        d:"None of these",
        correct:"b",
    },
    {
        queston:"What is the most popular programming language in 2022?",
        a:"Java",
        b:"Phython",
        c:"Javascript",
        d:"R",
        correct:"c",
    },
    {
        queston:"What is the best game in mobile?",
        a:"PUBG",
        b:"Mobile Legends",
        c:"Call Of Duty",
        d:"Clash of Clans",
        correct:"c",
    }
];
const questionEl = document.getElementById('question');
    const a = document.getElementById('a_text');
    const b = document.getElementById('b_text');
    const c = document.getElementById('c_text');
    const d = document.getElementById('d_text');

    const button = document.getElementById('submit');
    const answerEls = document.querySelectorAll('.answer');
    const quiz = document.getElementById('quiz');


let currentQuiz = 0;
let score = 0;

loadQuiz();


function loadQuiz(){
    deSelected();
    const currentQuizData = quizData[currentQuiz];

    questionEl.innerText = currentQuizData.queston; 
    a.innerText = currentQuizData.a;
    b.innerText = currentQuizData.b;
    c.innerText = currentQuizData.c;
    d.innerText = currentQuizData.d;
}

function getSelected(){
    let answer = undefined;
    answerEls.forEach(answerEl => {
        if(answerEl.checked){
            answer = answerEl.id;
            // console.log(answerEl.id);
        }
    })
    return answer;
}

function deSelected(){
    answerEls.forEach(answerEl => {
        answerEl.checked = false;
    })
}

button.addEventListener('click', () => {
    const answer = getSelected();
console.log(answer);

    if(answer){
        if(answer === quizData[currentQuiz].correct){
            score++;
        }
    currentQuiz++;
        if(currentQuiz < quizData.length){
            loadQuiz();
        }
        else{
            // alert('finished');
            quiz.innerHTML =    `
            <div class="result">
                <h2> You answered correcty at ${score} / ${quizData.length}</h2>
                <button onclick="location.reload()">Refresh</button>
            </div>
            `
        }
    }
});
