class Project < ActiveRecord::Base

	translates :title, :description

	has_many :project_areas
  	accepts_nested_attributes_for :project_areas, :allow_destroy => true
  	has_many :areas, :through => :project_areas
  
end
