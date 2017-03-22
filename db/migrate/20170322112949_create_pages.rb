class CreatePages < ActiveRecord::Migration
  def change
    create_table :pages do |t|
      t.boolean :draft
      t.string :title_de
      t.string :title_en
      t.text :content_de
      t.text :content_en
      t.string :slug

      t.timestamps null: false
    end
  end
end
