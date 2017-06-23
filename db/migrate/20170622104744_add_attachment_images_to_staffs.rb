class AddAttachmentImagesToStaffs < ActiveRecord::Migration
  def self.up
    change_table :staffs do |t|
      t.attachment :primary_image
      t.attachment :secondary_image
    end
  end

  def self.down
    remove_attachment :staffs, :primary_image
    remove_attachment :staffs, :secondary_image
  end
end
