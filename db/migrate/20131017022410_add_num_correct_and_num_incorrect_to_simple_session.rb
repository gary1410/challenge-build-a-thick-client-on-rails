class AddNumCorrectAndNumIncorrectToSimpleSession < ActiveRecord::Migration
  def change
    add_column :simple_sessions, :num_correct, :integer
    add_column :simple_sessions, :num_incorrect, :integer
  end
end
