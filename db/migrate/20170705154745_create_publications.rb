class CreatePublications < ActiveRecord::Migration
  def change
    create_table :publications do |t|
      t.string :title
      t.boolean :draft
      t.attachment :file
      t.integer :position

      t.timestamps null: false
    end
  end
end
