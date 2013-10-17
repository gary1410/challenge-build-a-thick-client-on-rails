class Choice < ActiveRecord::Base
  belongs_to :question
  attr_accessible :choice, :is_correct

  def as_json(options={})
    {
      choice_id: id,
      choice: choice
    }
  end
end
