class AddImageMetaToSlides < ActiveRecord::Migration
  def change
    add_column :slides, :image_meta, :text
  end
end
