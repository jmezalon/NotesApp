class CreateNotebooks < ActiveRecord::Migration[6.1]
  def change
    create_table :notebooks do |t|
      t.string :title 
      t.string :user_id
    end
  end
end
