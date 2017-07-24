class NewsItem < ActiveRecord::Base
	extend FriendlyId
	friendly_id :title, :use => [:slugged, :simple_i18n]

	acts_as_list
	default_scope { order(position: :asc) }

	translates :title, :preview, :content, :slug

	# Ensure user has provided the required fields
	validates :title_de, presence: true
  	validates :title_en, presence: true  	
	validates :slug, presence: true  
  	validates_format_of :slug, :with => /\A[a-z0-9_]+\z/i  

  	has_many :news_images
 	accepts_nested_attributes_for :news_images, :allow_destroy => true

end
