class CreateNewsItems < ActiveRecord::Migration
  def change
    create_table :news_items do |t|
      t.string :title_de
      t.string :title_en
      t.text :preview_de
      t.text :preview_en
      t.text :content_de
      t.text :content_en
      t.integer :position
      t.boolean :draft
      t.string :slug_de
      t.string :slug_en

      t.timestamps null: false
    end
  end
end
