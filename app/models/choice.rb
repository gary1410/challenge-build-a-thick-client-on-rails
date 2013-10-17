class Choice < ActiveRecord::Base
  belongs_to :question
  attr_accessible :choice, :is_correct

  def as_json(options={})
    {
      quiz_id: question.quiz.id,
      question_id: question.id,
      choice_id: id,
      choice: choice
    }
  end
end
