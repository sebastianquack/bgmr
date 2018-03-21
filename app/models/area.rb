class Area < ActiveRecord::Base

	translates :title

	has_many :project_areas

	accepts_nested_attributes_for :project_areas, :allow_destroy => true
	has_many :projects, :through => :project_areas

	validates :title, presence: true

	acts_as_list

  default_scope { order(:position) }

  before_update :reorder_without_updated_at

  def reorder_without_updated_at
    if self.position_changed?
      self.updated_at = self.updated_at_was
    end
  end  

end
