class RenamePublishedToDraftInStaffs < ActiveRecord::Migration
  def change
    rename_column :staffs, :published, :draft
  end
end
