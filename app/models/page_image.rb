class PageImage < ActiveRecord::Base
	belongs_to :page

	acts_as_list

	default_scope { order(:position) }

	has_attached_file :image, styles: { 
	 	w2000: "2000x2000>", 
	 	w1000: "1000x1000>", 
	 	w500: "500x500>", 
	 	large: "1200x1200>", 
		medium: "600x600>", 
		thumb: "100x100>" 
	  }, default_url: "/assets/:style/missing.png"
	  
  	validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/

end
