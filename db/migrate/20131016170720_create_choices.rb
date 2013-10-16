class CreateChoices < ActiveRecord::Migration
  def change
    create_table :choices do |t|
      t.references :question
      t.string :choice
      t.boolean :is_correct

      t.timestamps
    end
  end
end
