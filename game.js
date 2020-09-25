let questionList = [
    {
        question: "6*4-21",
        answer1: '2',
        answer2: '3',

        correct: 2,
        trivia: 'this is a basic math problem'
    },
    {
        question: "The Marina Trench is located in",
        answer1: 'Eastern Pacific Ocean',
        answer2: 'Western Pacific Ocean',

        correct: 2,
        trivia: 'The Marina Trench is the deepest oceanic trench in the whole world'
    },
    {
        question: "Square root of 169",
        answer1: "14",
        answer2: "13",

        correct: 2,
        trivia: 'easy peasy lemon squeezy'
    },
    {
        question: "Which one of this that isn't an element",
        answer1: "Einsteinium",
        answer2: "Baron",

        correct: 2,
        trivia: 'One of them has the atomic number of 99'
    },
    {
        question: "The creator of dynamite",
        answer1: "Alfred Nobel",
        answer2: "Ludwig Nobel",

        correct: 1,
        trivia: 'The Nobel Prize was named afther him'
    },
    {
        question: "Where is Serengeti located",
        answer1: "India",
        answer2: "Africa",

        correct: 2,
        trivia: 'Serengeti means endless plains in Maasai language'
    },
    {
        question: "Where was Confucius from?",
        answer1: "Tibet",
        answer2: "China",

        correct: 2,
        trivia: 'Confucianism is a philosophical doctrine created by him'
    },
    {
        question: "I only have a tail and a head",
        answer1: "Coin",
        answer2: "Clock",

        correct: 1,
        trivia: 'Think very carefully'
    },
    {
        question: "Smallest country in the world",
        answer1: "Hawaii",
        answer2: "Vatican City",

        correct: 2,
        trivia: 'This country only has an area of 49 ha'
    },
    {
        question: "Decode me: 8181",
        answer1: "Haha",
        answer2: "Hehe",

        correct: 1,
        trivia: 'Alphabet.'
    },
]

let question = document.querySelector("#question")
let choices = Array.from(document.getElementsByClassName('btn'))
let nextButton = document.getElementById('Next')
let currentQuestion = {}
let acceptingAnswer = true
let questionCounter = 0
let score = 0
let availableQuestion = []
let maxQuestion = 10
let trivia = document.getElementById('isi')
let points = 100
let scoreText = document.getElementById('score')

function startGame (){
    questionCounter = 0
    score = 0
    availableQuestion = [...questionList]
    getNextQuestion()
}

nextButton.addEventListener('click',()=> {
    getNextQuestion()
})

function getNextQuestion (){
    clearStatusClass(document.body)
    if (availableQuestion.length === 0 || questionCounter >= maxQuestion){
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign("end.html")
    }
    questionCounter ++
    let questionIndex = Math.floor(Math.random()*availableQuestion.length)
    currentQuestion = availableQuestion[questionIndex]
    question.innerText = currentQuestion.question
    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['answer' + number]
    });
    trivia.innerText = currentQuestion['trivia']
    availableQuestion.splice(questionIndex,1)
    acceptingAnswer = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswer) return

        acceptingAnswer = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.correct ? 'correct' : 'incorrect'
        setStatusClass(document.body,classToApply)

        if (classToApply === 'correct'){
            incrementScore(points)
        }
    })
})

function incrementScore (num){
    score += num
    scoreText.innerText = `Score: ${score}`
}

function setStatusClass(element, status) {
    clearStatusClass(element)
    if (status === 'correct') {
      element.classList.add('correct')
    } else {
      element.classList.add('incorrect')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('incorrect')
}

startGame()
console.log(score)