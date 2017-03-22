class ProjectArea < ActiveRecord::Base
	belongs_to :project
	belongs_to :area
end
