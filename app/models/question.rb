class Question < ActiveRecord::Base
  belongs_to :quiz
  has_many :choices
  attr_accessible :question
end
