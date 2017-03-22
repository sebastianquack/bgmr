class CreateSlides < ActiveRecord::Migration
  def change
    create_table :slides do |t|
      t.boolean :draft
      t.integer :project_id
      t.integer :order
      t.string :caption_de
      t.string :caption_en

      t.timestamps null: false
    end
  end
end
