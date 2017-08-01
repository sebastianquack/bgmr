class AddTextContToStaff < ActiveRecord::Migration
  def change
    add_column :staffs, :text_cont_en, :text
    add_column :staffs, :text_cont_de, :text
  end
end
