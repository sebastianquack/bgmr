class CreateTopics < ActiveRecord::Migration
  def change
    create_table :topics do |t|
      t.string :title_de
      t.string :title_en

      t.timestamps null: false
    end
  end
end
