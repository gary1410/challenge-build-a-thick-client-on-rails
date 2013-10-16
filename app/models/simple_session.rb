class SimpleSession < ActiveRecord::Base
  attr_accessible :session_key, :last_answered_question_id
end
