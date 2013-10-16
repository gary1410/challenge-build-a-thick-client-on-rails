class Choice < ActiveRecord::Base
  belongs_to :question
  attr_accessible :choice, :is_correct
end
