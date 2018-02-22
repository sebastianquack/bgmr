class AddPositionToProject < ActiveRecord::Migration
  def down
    remove_column :projects, :position, :integer
  end
  def up
  	add_column :projects, :position, :integer
  	Project.all.order(:created_at).each.with_index(1) do |p,i|
  		puts "position " + i.to_s + " for " + p.id.to_s + ": " + p.title_de
  		p.update_columns(position: i)
  		#p.save
  	end
  end
end
