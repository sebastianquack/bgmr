class Staff < ActiveRecord::Base

    acts_as_list

    translates :text, :text_cont

    default_scope { order(position: :asc) }

    has_attached_file :primary_image, styles: { 
    	list2x: "690x690>", 
    	list: "345x345>", 
    	medium: "600x600>", 
    	large: "600x600>", 
    	thumb: "100x100>" 
      }, default_url: "/assets/:style/missing.png",
	  :convert_options => {
      	:medium => "-quality 90",
      	:large => "-quality 90",
      	:thumb => "-quality 90",
		:frontw500  => "-quality 95 -interlace Plane",
      	:list2x => "-quality 85 -strip",
      	:list => "-quality 85 -strip",
	  }      
    has_attached_file :secondary_image, styles: { 
    	list2x: "690x690>", 
    	list: "345x345>", 
    	medium: "600x600>", 
    	large: "600x600>", 
    	thumb: "100x100>" 
      }, default_url: "/assets/:style/missing.png",
	  :convert_options => {
      	:medium => "-quality 90",
      	:large => "-quality 90",
      	:thumb => "-quality 90",
		:frontw500  => "-quality 95 -interlace Plane",
      	:list2x => "-quality 85 -strip",
      	:list => "-quality 85 -strip",
	  }      

    validates_attachment_content_type :primary_image, content_type: /\Aimage\/.*\z/
    validates_attachment_content_type :secondary_image, content_type: /\Aimage\/.*\z/

    validates :name, presence: true

end
