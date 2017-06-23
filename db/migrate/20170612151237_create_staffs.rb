class CreateStaffs < ActiveRecord::Migration
  def change
    create_table :staffs do |t|
      t.boolean :published
      t.string :name
      t.text :text_de
      t.text :text_en
      t.text :contact
    end
  end
end
