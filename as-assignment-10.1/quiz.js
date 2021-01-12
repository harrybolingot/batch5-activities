var myquiz, options = "";
var optionNumbers, questionNumbers, toCheck = [];
var score = 0;
var currentIndex, userAnswer, currentQuestion;

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
	currentIndex = 0;
  questionNumbers = randomizeOrder(quiz.set);
  console.log("Welcome! Let's the start the quiz entitled " + quiz.title + "!" + "\nThis quiz has " + quiz.set.length + " questions. Are you ready?" + "\n\nStarting in 3...2...1...");
  setTimeout(function(){
		askNextQuestion(quiz, questionNumbers);
  }, 3000);
}

function submitAnswer(quiz, questionNumbers) {
	var checked = "";
	if((toCheck[currentIndex][0])==((toCheck[currentIndex][1])+1)) {
		checked = "You got it right!";
		score++;
	}
	else {
		checked = "Your answer is wrong!";
	}
	console.log("Your answer: " + toCheck[currentIndex][0] + "\n" + checked);
	currentIndex++;
  setTimeout(function(){
		askNextQuestion(quiz, questionNumbers);
  }, 1000);
}

function askNextQuestion(quiz, questionNumbers){
		var numCorrectAnswer = 0;
    if(currentIndex < quiz.set.length){
        currentQuestion = quiz.set[questionNumbers[currentIndex]].question;
        optionNumbers = randomizeOrder(quiz.set[questionNumbers[currentIndex]].answers);
        // Establish options string
        for(i = 0; i < optionNumbers.length; i++){
      		options += (i+1) + ") " + quiz.set[questionNumbers[currentIndex]].answers[optionNumbers[i]].substr(1) + "\n";
        // Determine correct answer from current options
	      if(quiz.set[questionNumbers[currentIndex]].answers[optionNumbers[i]][0] == "1")  numCorrectAnswer = i;
    }
    		// Print questions and options
        console.log("Question #" + (currentIndex+1) + " of " + quiz.set.length +": " + currentQuestion + "\n" + "Options: " + "\n" + options);
        options = "";
        
        // Show prompt for user answer
        setTimeout(function(){
        	userAnswer = prompt("Answer by typing the number beside the option of your choice: ");
          
          // Include userAnswer and numCorrectAnswer in toCheck array
        	toCheck.push([userAnswer, numCorrectAnswer]);
        
      		// Check answer now
        	submitAnswer(quiz, questionNumbers);
        }, 1800);
    }
    
    else {
        // Current quiz is over
        toCheck = [];
				console.log("Quiz is over! Your total score is " + score + "/" + currentIndex + "!");
        score = 0;
    }
}

// startQuiz(myquiz);