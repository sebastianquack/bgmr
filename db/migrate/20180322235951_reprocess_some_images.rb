class ReprocessSomeImages < ActiveRecord::Migration
  def up
  	 Slide.all.each do |s| 
  	 	puts "processing " + s.image.url(:w2000)
  	 	s.image.reprocess! :w2000
  	 end
  	 Project.all.each do |p| 
  	 	puts "processing " + p.main_image.url
  	 	p.main_image.reprocess! 
  	 end  	 
  	 Staff.all.each do |s| 
  	 	puts "processing " + s.primary_image.url
  	 	s.primary_image.reprocess! 
  	 	puts "processing " + s.secondary_image.url
  	 	s.secondary_image.reprocess!  	
   	 end  	  	 
  end
end
