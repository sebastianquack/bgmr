class Slide < ActiveRecord::Base

	has_attached_file :image, 
		 styles: { w2000: "2000x2000>", w1000: "1000x1000>", w500: "500x500>", medium: "600x600>", thumb: "100x100>" }, default_url: "/images/:style/missing.png",
		 :convert_options => {
			:w2000 => "-quality 90",
			:w1000 => "-quality 90",
			:w5000 => "-quality 90"
		}

    validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/

	translates :caption

	has_many :slide_links, :foreign_key => :from_slide_id
  	accepts_nested_attributes_for :slide_links, :allow_destroy => true

	default_scope { order(order: :asc) }
	
	def large_enough_for_zoom
		min_width = Rails.application.config.zoomable_min_width
		min_height = Rails.application.config.zoomable_min_height
		self.image.width > min_width && self.image.height > min_height
	end
  	
end
