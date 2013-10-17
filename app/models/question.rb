class Question < ActiveRecord::Base
  belongs_to :quiz
  has_many :choices
  attr_accessible :question

  def as_json(options={})
    {
      question_id: id,
      question: question,
      choices: choices
    }
  end
end
