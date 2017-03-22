class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.string :slug
      t.boolean :draft
      t.string :title_de
      t.string :title_en
      t.text :description_de
      t.text :description_en

      t.timestamps null: false
    end
  end
end
