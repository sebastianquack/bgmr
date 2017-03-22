class Project < ActiveRecord::Base

	translates :title, :description, :slug

	has_many :project_areas
	accepts_nested_attributes_for :project_areas, :allow_destroy => true
	has_many :areas, :through => :project_areas

	has_many :project_tags
	accepts_nested_attributes_for :project_tags, :allow_destroy => true
	has_many :tags, :through => :project_tags

	has_many :project_topics
	accepts_nested_attributes_for :project_topics, :allow_destroy => true
	has_many :topics, :through => :project_topics

  has_many :slides
  accepts_nested_attributes_for :slides, :allow_destroy => true
  
end
