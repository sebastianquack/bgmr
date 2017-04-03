class Slide < ActiveRecord::Base

 	has_attached_file :image, styles: { medium: "600x600>", thumb: "100x100>" }, default_url: "/images/:style/missing.png"
  	validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/

	translates :caption

	has_many :slide_links, :foreign_key => :from_slide_id
  	accepts_nested_attributes_for :slide_links, :allow_destroy => true
  	
end