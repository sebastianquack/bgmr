class NewsImage < ActiveRecord::Base

	has_attached_file :image, styles: { large: "1000x1000>", medium: "600x600>", thumb: "100x100>" }, default_url: "/images/:style/missing.png"
  	validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/

  	belongs_to :news_item

end
