var Controller = {
  getQuizzes: function() {
    // get the quiz list from the server and render them
    $.ajax().done(function(data) {
      for (var i in data.quizzes) {
        var qv = new QuizView(data.quizzes.name)
        $('.quizzes').append(qv.render());
      }
    })
  },

  displayQuestion: function() {
    // get the next question from the server and
  }
}


var QuizView = function(quiz) {
  this.quiz = quiz;
}

QuizView.prototype.render = function() {
  var $quizDiv = $("#quiz-templates #new-quiz").clone();
  $quizDiv.find('.quiz-name').html(this.quiz.name);
  return $quizDiv;
}


var QuestionView = function(question) {
  this.question = question;
}

QuestionView.prototype.render = function() {
  var $questionDiv = $().clone();
  $questionDiv.find('.question-text').html(this.question.text);
  for (var i in this.question.choices) {
    var cv = new ChoiceView(this.question.choices[i]);
    $questionDiv.find('.choices').append(cv.render());
  }
  return $questionDiv;
}

var ChoiceView = function(choice) {
  this.choice = choice
}

ChoiceView.prototype.render = function() {
  var $choiceDiv = $().clone()
  $choiceDiv.find('.choice-text').html(this.question.choices[i].text);
  return $choiceDiv;
}

// testing some shit
// var quiz = {
//   name: "My Quiz"
// }

// var qv = new QuizView(quiz);
// console.log(qv.render().html())

// on page load
$(document).ready(Controller.getQuizzes);
