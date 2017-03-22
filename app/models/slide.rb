class Slide < ActiveRecord::Base

	translates :caption

	has_many :slide_links
  	accepts_nested_attributes_for :slide_links, :allow_destroy => true
  	
end
