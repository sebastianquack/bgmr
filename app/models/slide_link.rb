class SlideLink < ActiveRecord::Base
	belongs_to :from_slide, :class_name => "Slide"
	belongs_to :to_slide, :class_name => "Slide"
end
