class Topic < ActiveRecord::Base

	translates :title

	has_many :project_topics
  	accepts_nested_attributes_for :project_topics, :allow_destroy => true
  	has_many :projects, :through => :project_topics

end
