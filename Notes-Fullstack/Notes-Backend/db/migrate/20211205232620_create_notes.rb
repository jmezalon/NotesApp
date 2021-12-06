class CreateNotes < ActiveRecord::Migration[6.1]
  def change
    create_table :notes do |t|
      t.integer :notebook_id
      t.string :title 
      t.text :content
      t.boolean :favorite
    end
  end
end
