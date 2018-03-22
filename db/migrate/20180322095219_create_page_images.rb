class CreatePageImages < ActiveRecord::Migration
  def change
    create_table :page_images do |t|
      t.timestamps null: false
      t.integer :page_id
    end
    reversible do |change|
      change.up do
        add_attachment :page_images, :image
      end
    end
  end
end
