// EVENTS
// A- page load
//    - ajax to server to get the quiz list
//    - display quiz list to the user
//    - listen for click events (B) on the quiz name
// B- user chooses a quiz to take
//    - ajax to server to get the next question for a quiz
//    - display question to the user
//    - display choices
//    - listen for click events (C) on choice
// C- user chooses answer
//    - submit answer to server via ajax
//    - record if it was correct/incorrect
//    - ajax to server to get the next question
//    - display question and choices to the user

var Controller = {
  getAndDisplayQuizzes: function () {
    var req = $.ajax({url: '/quizzes.json', type: 'GET'});
    req.done(function(data){
      // create a link for each quiz, and append it to our starting page
      for( var i = 0; i < data.quizzes.length; i++ ){
        var quizViewer = new QuizViewer(data.quizzes[i])
        $('.start').append(quizViewer.renderQuizLink());
      }
    })
  },

  getAndDisplayQuestionsAndAnswers: function(quiz_id) {
    console.log("You clicked on quiz: "+quiz_id)
    $(event.target).closest('.start').addClass('hidden')
    var req = $.ajax({url: "/quizzes/"+quiz_id+"/questions/next.json", type: 'GET', data: {session_key: 'a124f87dec55da23'} });
    // got the next question, now display it
    req.done(function(data){
      var questionView = new QuestionViewer(data.question)
      $('.container').append(questionView.renderQuestion());
    })
  },



  listenForClickOnQuiz: function () {
   $(".start").on("click", ".quiz-name", function(e){
    e.preventDefault();
    var quiz_id = e.target.id
    Controller.getAndDisplayQuestionsAndAnswers(quiz_id);
  })
 },

 listenForClickOnAnswer: function () {
  $(".container").on('click', ".choice", function(e){
    e.preventDefault();
    var question_id = $(event.target).closest('.question')[0].id
    var answer_id = $(event.target).closest('li')[0].id
    Controller.sendAnswer(question_id, answer_id);
  })
 },

 sendAnswer: function(question_id, answer_id){
  $.ajax({url: "/questions/"+question_id+"/answers.json", type: 'POST', data:{session_key: 'a124f87dec55da23', choice_id: answer_id } }).done(function(e){
    console.log("SENT YOUR ANSWER", e);
    debugger

  })
 }
}

var QuestionViewer = function(questionObj) {
  this.question = questionObj
}

QuestionViewer.prototype.renderQuestion = function() {
  var $questionElem = $(".question").clone();
  // puts question into h1 and give it the question id
  $questionElem.find('h1').html(this.question.question)
  $questionElem.attr("id", this.question.question_id)
  // put all the answers into the list in our template
  var answers = this.question.choices
  for (var i=0;i<answers.length;i++){ $questionElem.find('.answers ul').append(
    "<li class='choice' id='"+ answers[i].choice_id +"' ><a href='#'>"+ answers[i].choice +"</a></li>")}

    return $questionElem
}

var QuizViewer = function(quizObj) {
  // Handles render of quiz stuff
  //assigns a quiz attribute from the passed in quiz object
  this.quiz = quizObj;
}

QuizViewer.prototype.renderQuizLink = function() {
  // Grab a quizlink template, fill it in with our quiz's name
  // Return the filled out template to our controller
  var $quizLinkElem = $('.quiz-link').clone();
  $quizLinkElem.find('.quiz-name').html(this.quiz.name)
  $quizLinkElem.find('.quiz-name').attr("id", this.quiz.quiz_id)
  return $quizLinkElem;
}


$(document).ready(function() {

  Controller.getAndDisplayQuizzes();

  Controller.listenForClickOnQuiz();

  Controller.listenForClickOnAnswer();

})
