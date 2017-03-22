class CreateAreas < ActiveRecord::Migration
  def change
    create_table :areas do |t|
      t.string :title_de
      t.string :title_en

      t.timestamps null: false
    end
  end
end
