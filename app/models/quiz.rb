class Quiz < ActiveRecord::Base
  has_many :questions
  attr_accessible :name

  def as_json(options={})
    {
      :id => id,
      :name => name
    }
  end
end
