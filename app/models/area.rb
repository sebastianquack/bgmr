class Area < ActiveRecord::Base

	translates :title

	has_many :project_areas
  	accepts_nested_attributes_for :project_areas, :allow_destroy => true
  	has_many :projects, :through => :project_areas
   
end
