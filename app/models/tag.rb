class Tag < ActiveRecord::Base

	translates :title

	has_many :project_tags
  	accepts_nested_attributes_for :project_tags, :allow_destroy => true
  	has_many :projects, :through => :project_tags

  	validates :title, presence: true

end
