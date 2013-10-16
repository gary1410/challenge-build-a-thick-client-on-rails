class Quiz < ActiveRecord::Base
  has_many :questions
  attr_accessible :name
end
