class AddPdfFileToProjects < ActiveRecord::Migration
  def self.up
    change_table :projects do |t|
      t.attachment :pdf
    end
  end

  def self.down
    remove_attachment :projects, :pdf
  end
end
