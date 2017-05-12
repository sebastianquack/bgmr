class AddZoomableToSlide < ActiveRecord::Migration
  def change
    add_column :slides, :zoomable, :boolean
  end
end
