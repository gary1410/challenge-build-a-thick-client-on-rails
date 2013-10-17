var BaseView = {
  init: function(object) {
    for (var attr in object) {
      this[attr] = object[attr];
    }
  },

  render: function() {
    return this.$element;
  },
};


var QuizListView = function(quizzes) {
  this.quizzes = quizzes;
  this.$element = $("#views .quiz-list").clone();
  for (var i in this.quizzes) {
    var quizView = new QuizView(this.quizzes[i]);
    this.$element.append(quizView.render());
  }
}
QuizListView.prototype = BaseView;

var QuizView = function(quiz) {
  this.init(quiz);
  this.$element = $("#views .quiz").clone();
  this.$element = $("#views .quiz").clone();
  this.$element.find('a.quiz-link').data('id', this.id).text(this.name);
};
QuizView.prototype = BaseView;


var QuestionView = function(question, quizId) {
  this.init(question);
  this.$element = $("#views .question").clone();
  this.$element.find('h1').text(this.question);
  for (var i in this.choices) {
    var choiceView = new ChoiceView(this.choices[i], this.id, quizId);
    this.$element.find('.choice-list').append(choiceView.render());
  }
};
QuestionView.prototype = BaseView;


var ChoiceView = function(choice, questionId, quizId) {
  this.init(choice);
  this.$element = $("#views .choice").clone();
  var $choiceLink = this.$element.find("a.choice-link");
  $choiceLink.data('id', this.id);
  $choiceLink.data('question-id', questionId);
  $choiceLink.data('quiz-id', quizId);
  $choiceLink.text(this.choice);
};
ChoiceView.prototype = BaseView;


var ScoreView = function(data) {
  this.init(data);
  this.$element = $("#views .score").clone();
  this.$element.find('.correct').text(data.num_correct);
  this.$element.find('.incorrect').text(data.num_incorrect);
};
ScoreView.prototype = BaseView;
