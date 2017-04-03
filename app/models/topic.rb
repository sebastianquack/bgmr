class Topic < ActiveRecord::Base
  extend FriendlyId

	translates :title, :slug

  friendly_id :title, :use => [:slugged, :simple_i18n]

	has_many :project_topics
  	accepts_nested_attributes_for :project_topics, :allow_destroy => true
  	has_many :projects, :through => :project_topics

  validates :title, presence: true
  validates :slug,  presence: true
  
  validates_format_of :slug, :with => /\A[a-z0-9_]+\z/i

end
