class Question < ActiveRecord::Base
  belongs_to :quiz
  has_many :choices
  attr_accessible :question

  def as_json(options={})
    {
      id: id,
      question: question,
      choices: choices
    }
  end
end
