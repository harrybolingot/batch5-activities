var myquiz, options, message = "";
var optionNumbers, questionNumbers, toCheck = [];
var score = 0;
var numCorrectAnswer = 0;
var currentIndex, userAnswer, currentQuestion, finishQuiz, questionNumber, streak, streakCount, userAnswerIsNumber, userAnswerWithinRange;

myquiz = {
    "code" : "html-basics-quiz_1",
    "title": "An HTML Basics Quiz",
    "set" : [
      {
        "question" : "What does HTML stand for?",
        "answers" : [
          "1Hyper Text Markup Language",
          "0HoT MaiL",
          "0How To Make Lasagna"
        ]
      },
      {
        "question" : "How many tags are in a regular element?",
        "answers" : [
          "12",
          "01",
          "03"
        ]
      },
      {
        "question" : "What is the difference in an opening tag and a closing tag?",
        "answers" : [
          "0Opening tag has a `/` in front",
          "1Closing tag has a `/` in front",
          "0There is no difference"
        ]
      },
      {
        "question" : "`\<br/\>` What type of tag is this?",
        "answers" : [
          "1Break tag",
          "0A broken one",
          "0An opening tag"
        ]
      },
      {
          "question" : "`\<body\>` Is this an opening tag or a closing tag?",
          "answers" : [
            "1Opening",
            "0Closing"
          ]
      },
      {
          "question" : "`\</body\>` Is this an opening tag or a closing tag?",
          "answers" : [
            "0Opening",
            "1Closing"
          ]
      },
      {
          "question" : "Where is the `meta` tag only found?",
          "answers" : [
            "0The last page",
            "1The home page",
            "0The second page"
          ]
      },
      {
          "question" : "Which is the correct way to tag an image?",
          "answers" : [
            "0`\<img\> src=\"image.jpg/gif\" alt=\"type some text\"`",
            "0`Src=\"image.jpg/gif\" alt=\"type some text\" \<img\>`",
            "1`\<img src=\"image.jpg/gif\" alt=\"type some text\"\>`"
          ]
      },
      {
          "question" : "What is an element that does not have a closing tag called?",
          "answers" : [
            "0Tag",
            "1Empty element",
            "0Closed element"
          ]
      },
      {
          "question" : "Which of the following is an example of an empty element?",
          "answers" : [
            "1`\<img/\>`",
            "0`\<img\> \</img\>`",
            "0`\</img\>`"
          ]
      },
      {
          "question" : "What should values always be enclosed in?",
          "answers" : [
            "1Quotation marks",
            "0Commas",
            "0Parenthesis"
          ]
      },
      {
          "question" : "Where do all items for the same website need to be saved?",
          "answers" : [
            "1In the same folder",
            "0Where ever is fine",
            "0In different folders"
          ]
      },
      {
          "question" : "What does `\<a href=\"http://www.google.com\" title=\"Link to Google\" target=\"_blank\"\>Google\</a\>` do?",
          "answers" : [
            "1Adds a link to `Google` on the page",
            "0Adds a search engine to the page",
            "0Nothing"
          ]
      },
      {
          "question" : "What is always a 'welcome' page, and explains the purpose or topic of the website?",
          "answers" : [
            "0Page 4",
            "1Homepage",
            "0Table of contents"
          ]
      },
      {
          "question" : "What does \"View Source\" do?",
          "answers" : [
            "0Nothing",
            "1Brings up a note pad with the HTML code already used for the site",
            "0Opens a new website"
          ]
      }    
    ]
};

// Get random number
function randomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function checkUserAnswerValidity(input) {
  if (input == "exit" || input == "Exit") {
    endQuiz();
  }

  else {
    userAnswerIsNumber = parseInt(input) ? true : false;
    userAnswerWithinRange = (parseInt(input) >= 1 && parseInt(userAnswer) <= optionNumbers.length) ? true : false;
  }
}

// Generate array of random order
function randomizeOrder(array){
	var randomOrder = [];
	for(let i = 0; i < array.length; i++) {
  	randomOrder[i] = i;
  }
  for (i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * i);
    k = randomOrder[i];
    randomOrder[i] = randomOrder[j];
    randomOrder[j] = k;
	}
  return randomOrder;
}

function startQuiz(quiz){
  streak = 0;
  streakCount = 0;
  questionNumber = 0;
  currentIndex = 0;
  finishQuiz = false;
  questionNumbers = randomizeOrder(quiz.set);
  console.log("Welcome! Let's the start the quiz entitled " + quiz.title + "!" + "\nAre you ready?" + "\n\nStarting in 3...2...1...");
  setTimeout(function(){
		askNextQuestion(quiz, questionNumbers);
  }, 3000);
}

function endQuiz() {
  // Current quiz is over
  finishQuiz = true;
  toCheck = [];
  console.log((streakCount > 0) ? "Quiz is over! Your total score is " + score + "/" + questionNumber + "!\nYou also got " + streakCount + " streak" + ((streakCount > 1) ? "s" : "") + "!" : "Quiz is over! Your total score is " + score + "/" + questionNumber + "!");
  score = 0;
}

function checkAnswer(quiz, questionNumbers, input, correctAnswer) {
  // Include userAnswer and numCorrectAnswer in toCheck array
  toCheck.push([input, correctAnswer]);

  // Check answer now
  submitAnswer(quiz, questionNumbers);
}

function submitAnswer(quiz, questionNumbers) {
	var checked = "";
	if((toCheck[currentIndex][0])==((toCheck[currentIndex][1])+1)) {
    score++;
    streak++;
    if(streak % 5 == 0) {
      streakCount++;
      checked = "On a roll! " + streak + "points in a row!"
    }
    else checked = "You got it right!"
	}
	else {
    streak = 0;
		checked = "Your answer is wrong!";
	}
	console.log("Your answer: " + toCheck[currentIndex][0] + "\n" + checked);
	currentIndex++;
  setTimeout(function(){
		askNextQuestion(quiz, questionNumbers);
  }, 1000);
}

function askNextQuestion(quiz, questionNumbers){
  options = "";
  questionNumber++;

  currentQuestion = quiz.set[questionNumbers[currentIndex]].question;
  optionNumbers = randomizeOrder(quiz.set[questionNumbers[currentIndex]].answers);
  
  // Establish options string
  for(i = 0; i < optionNumbers.length; i++){
    options += (i+1) + ") " + quiz.set[questionNumbers[currentIndex]].answers[optionNumbers[i]].substr(1) + "\n";
    
    // Determine correct answer from current options
    if(quiz.set[questionNumbers[currentIndex]].answers[optionNumbers[i]][0] == "1")  numCorrectAnswer = i;
  }

  // Print questions and options
  console.log("Question #" + questionNumber + ": " + currentQuestion + "\n" + "Options: \n" + options);
  options = "";

  // Show prompt for user answer
  setTimeout(function(){
    userAnswer = prompt("Answer by typing the number beside the option of your choice: ");

    checkUserAnswerValidity(userAnswer);

    if (finishQuiz == false) {
      if (userAnswerIsNumber == false || userAnswerWithinRange == false){
        while(userAnswerIsNumber == false || userAnswerWithinRange == false) {
          userAnswer = prompt("Invalid answer! Type one number from 1 to " + optionNumbers.length + " only: ");
          checkUserAnswerValidity(userAnswer);
          if(finishQuiz == true)  break;
          if(userAnswerIsNumber == true && userAnswerWithinRange == true){
            checkAnswer(quiz, questionNumbers, userAnswer, numCorrectAnswer);
            break;
          } 
        } 
      }
      else checkAnswer(quiz, questionNumbers, userAnswer, numCorrectAnswer);
    }
  }, 1800);
  
  if (currentIndex == quiz.set.length-1) {
    // Repeat questions
    currentIndex = 0;
    questionNumbers = randomizeOrder(quiz.set);
    toCheck = [];
  } 
}

// startQuiz(myquiz);