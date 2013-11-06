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

var Controller = {
  getAndDisplayQuizzes: function () {
    var req = $.ajax({url: '/quizzes.json', type: 'GET', session_key: 'a124f87dec55da23' });
    req.done(function(data){
      // now i have my list of quizzes
      // create a link for each quiz, and append it to our starting page
      data.quizzes
      $
    })
  }
}

var QuizViewer = function(quizObj) {
  // Handles render of quiz stuff
  //assigns a quiz attribute from the passed in quiz object
  this.quiz = quizObj;
}

QuizViewer.prototype.render = function() {
  // Grab a quizlink template, fill it in with our quiz's name
  // Return the filled out template to our controller
  var $quizlink = $('#quiz-link').clone();
  $quizlink.find('quiz-name').html(this.quiz.name)
  return $quizLink;
}


$(document).ready(function() {

  var req = $.ajax({url: '/quizzes.json', type: 'GET', session_key: 'a124f87dec55da23'});

  req.done(function(data){
    var quizzes = data.quizzes
    for(var i=0;i<quizzes.length;i++) {
       var $quizLink = $('#quiz-link').clone();
       $quizLink.find('.quiz-name').html(quizzes[i].name)
       $(".start").append($quizLink);
     }
  })

})



// function jeffreyWasHere() {
//   var $quizDiv = $("#quiz-templates #new-quiz").clone();
//   $quizDiv.find('.quiz-name').html("woohoo");
//   $('.quizzes').append($quizDiv);
// }
  // req.done(function(data){
  //   var quizzes = data.quizzes
  //   console.log(quizzes);
  //   console.log(quizzes[1].name)
  //   var quizTemp = $($('#new-quiz').clone());
  //   console.log(quizTemp)

  // })


