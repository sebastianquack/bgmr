class AddPositionToStaff < ActiveRecord::Migration
  def change
    add_column :staffs, :position, :integer
  end
end
