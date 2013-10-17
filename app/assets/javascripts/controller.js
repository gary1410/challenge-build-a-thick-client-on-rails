var Data = {
  reset: function() {
    this.session_key = (new Date()).toString();
  },
  merge: function(object) {
    var merged = { session_key: this.session_key };
    for (var attr in object) {
      merged[attr] = object[attr];
    }
    return merged;
  }
}

var Controller = {
  start: function() {
    Data.reset();
    Controller.showQuizzes();
  },

  bind: function() {
    $('.container').on('click', 'a.quiz-link', Controller.showQuiz);
    $('.container').on('click', 'a.choice-link', Controller.submitAnswer);
    $('.container').on('click', '.score button', Controller.start);
  },

  showQuizzes: function() {
    $.get('/quizzes.json').done(function(data) {
      var quizListView = new QuizListView(data.quizzes);
      $('.container').html(quizListView.render());
    });
  },

  showQuiz: function() {
    var quizId = $(this).data('id');
    Controller.showQuestion(quizId);
  },

  showQuestion: function(quizId) {
    var $request = $.get('/quizzes/' + quizId + '/questions/next.json', Data);
    $request.done(function(data) {
      var questionView = new QuestionView(data, quizId);
      $('.container').html(questionView.render());
    });
    $request.fail(Controller.handleError);
  },

  submitAnswer: function() {
    var questionId = $(this).data('question-id');
    var quizId = $(this).data('quiz-id');
    var choiceId = $(this).data('id');
    var data = Data.merge({ choice_id: choiceId });
    var $request = $.post('/questions/' + questionId + '/answers.json', data);
    $request.done(function(data) {
      Controller.nextQuestionOrSummary(data, quizId);
    });
    $request.fail(Controller.handleError);
  },

  nextQuestionOrSummary: function(data, quizId) {
    if (data.correct) {
    } else {
    }

    if (data.more_questions) {
      Controller.showQuestion(quizId);
    } else {
      Controller.showScore(data);
    }
  },

  showScore: function(data) {
    var scoreView = new ScoreView(data);
    $('.container').html(scoreView.render());
  },

  handleError: function(xhr) {
    console.log(xhr);
  }
};

$(function() {
  Controller.bind();
  Controller.start();
});
