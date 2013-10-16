class CreateSimpleSessions < ActiveRecord::Migration
  def change
    create_table :simple_sessions do |t|
      t.string :session_key
      t.integer :last_answered_question_id

      t.timestamps
    end
  end
end
