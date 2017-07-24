class CreateNewsImages < ActiveRecord::Migration
  def change
    create_table :news_images do |t|
      t.integer :news_item_id
      t.attachment :image

      t.timestamps null: false
    end
  end
end
