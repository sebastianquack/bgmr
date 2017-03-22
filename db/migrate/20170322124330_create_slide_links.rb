class CreateSlideLinks < ActiveRecord::Migration
  def change
    create_table :slide_links do |t|
      t.integer :from_slide_id
      t.integer :to_slide_id
      t.float :pos_x
      t.float :pos_y

      t.timestamps null: false
    end
  end
end
