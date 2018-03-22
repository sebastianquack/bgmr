class AddPositionToPageImage < ActiveRecord::Migration
  def down
    remove_column :page_images, :position, :integer
  end
  def up
  	add_column :page_images, :position, :integer
  	PageImage.all.order(:created_at).each.with_index(1) do |p,i|
  		p.update_columns(position: i)
  		#p.save
  	end
  end
end
