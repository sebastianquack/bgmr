class SlideLink < ActiveRecord::Base
	belongs_to :from_slide, :class_name => "Slide"
	belongs_to :to_slide, :class_name => "Slide"

	after_initialize :init

    def init
      self.pos_x  ||= 50           #will set the default value only if it's nil
      self.pos_y  ||= 50
    end
end
