// const startBtn = document.querySelector('.start-btn')
const popupInfo = document.querySelector('.popup-info'),
  main = document.querySelector('.main'),
  quizSection = document.querySelector('.quiz-section'),
  quizBox = document.querySelector('.quiz-box'),
  optionList = document.querySelector('.option-list'),
  nextBtn = document.querySelector('.next-btn'),
  resultBox = document.querySelector('.result-box'),
  tryAgainBtn = document.querySelector('.tryAgain-btn'),
  goHomeBtn = document.querySelector('.goHome-btn'),
  sections = document.querySelectorAll('.section'),
  navLinks = document.querySelectorAll('header nav a')

let questionCount = 0,
  questionNumb = 1,
  userScore = 0

window.onscroll = () => {
  sections.forEach(sec => {
    let top = window.scrollY
    let offset = sec.offsetTop - 150
    let height = sec.offsetHeight
    let id = sec.getAttribute('id')

    if (top >= offset && top < offset + height) {
      navLinks.forEach(links => {
        links.classList.remove('active');
        document.querySelector('header nav a[href*=' + id + ']').classList.add('active')
      })
    }
  })
}

// getting questions and options from array
const showQuestions = (index) => {
  const questionText = document.querySelector('.question-text')
  questionText.textContent = `${questions[index].numb}. ${questions[index].question}`

  let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
                   <div class="option"><span>${questions[index].options[1]}</span></div>
                   <div class="option"><span>${questions[index].options[2]}</span></div>
                   <div class="option"><span>${questions[index].options[3]}</span></div>
                  `
  optionList.innerHTML = optionTag

  const option = document.querySelectorAll('.option')
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute('onclick', 'optionSelected(this)')
  }
}

const showGuide = () => {
  popupInfo.classList.add('active')
  main.classList.add('active')
}

const exitGuide = () => {
  popupInfo.classList.remove('active')
  main.classList.remove('active')
}

const showQuiz = () => {
  quizSection.classList.add('active')
  popupInfo.classList.remove('active')
  main.classList.remove('active')
  quizBox.classList.add('active')

  showQuestions(0)
  questionCounter(1)
  scoreCounter()
}

const nextQuestion = () => {
  if (questionCount < questions.length - 1) {
    questionCount++
    showQuestions(questionCount)

    questionNumb++
    questionCounter(questionNumb)

    nextBtn.classList.remove('active')
  } else {
    // console.log('Question Completed')
    showResultBox()
  }
}

const optionSelected = (answer) => {
  let userAnswer = answer.textContent,
    correctAnswer = questions[questionCount].answer,
    allOptions = optionList.children.length

  if (userAnswer == correctAnswer) {
    answer.classList.add('correct')

    userScore += 1
    scoreCounter()
  } else {
    answer.classList.add('incorrect')

    // if answer incorrect, auto selected correct answer
    for (let i = 0; i < allOptions; i++) {
      if (optionList.children[i].textContent == correctAnswer) {
        optionList.children[i].setAttribute('class', 'option correct')
      }
    }
  }

  // if user has selected, disabled all options
  for (let i = 0; i < allOptions; i++) {
    optionList.children[i].classList.add('disabled')
  }

  nextBtn.classList.add('active')
}

const questionCounter = (index) => {
  const questionTotal = document.querySelector('.question-total')
  questionTotal.textContent = `${index} of ${questions.length} Questions`
}

const scoreCounter = () => {
  const scoreText = document.querySelector('.header-score')
  scoreText.textContent = `Score: ${userScore} / ${questions.length}`
}

const showResultBox = () => {
  const scoreText = document.querySelector('.score-text'),
    circularProgress = document.querySelector('.circular-progress'),
    progressValue = document.querySelector('.progress-value')

  let progressStartValue = -1,
    progressEndValue = (userScore / questions.length) * 100,
    speed = 0,
    progress = setInterval(() => {
      progressStartValue++
      progressValue.textContent = `${progressStartValue}%`
      circularProgress.style.background = `conic-gradient(var(--textbtn-color) ${progressStartValue * 3.6
        }deg, var(--disabled) 0deg)`

      if (progressStartValue == progressEndValue) {
        clearInterval(progress)
      }
    }, speed)

  quizBox.classList.remove('active')
  resultBox.classList.add('active')

  scoreText.textContent = `Your Score ${userScore} out of ${questions.length}`
}

const tryAgain = () => {
  questionCount = 0
  questionNumb = 1
  userScore = 0
  quizBox.classList.add('active')
  resultBox.classList.remove('active')
  nextBtn.classList.remove('active')
  scoreCounter()
  showQuestions(questionCount)
  questionCounter(questionNumb)
}

const goHome = () => {
  questionCount = 0
  questionNumb = 1
  userScore = 0
  quizSection.classList.remove('active')
  nextBtn.classList.remove('active')
  resultBox.classList.remove('active')
  showQuestions(questionCount)
  questionCounter(questionNumb)
}
