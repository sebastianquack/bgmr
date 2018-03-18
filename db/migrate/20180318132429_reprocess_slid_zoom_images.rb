class ReprocessSlidZoomImages < ActiveRecord::Migration
  def change
  	 Slide.all.each do |s| 
  	 	puts "processing " + s.image.url(:zoom)
  	 	s.image.reprocess! :zoom
  	 end
  end
end
