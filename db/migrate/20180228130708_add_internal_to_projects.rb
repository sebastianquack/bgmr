class AddInternalToProjects < ActiveRecord::Migration
  def change
  	add_column :projects, :internal, :boolean, :default => false
  end
end
