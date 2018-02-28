class AddAttachmentImageToPublications < ActiveRecord::Migration
  def self.up
    change_table :publications do |t|
      t.attachment :image
    end
  end

  def self.down
    remove_attachment :publications, :image
  end
end
