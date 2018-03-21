class Tag < ActiveRecord::Base

	translates :title

	has_many :project_tags

	accepts_nested_attributes_for :project_tags, :allow_destroy => true
	has_many :projects, :through => :project_tags

	validates :title, presence: true

	acts_as_list

  default_scope { order(:position) }  

  def reorder_without_updated_at
    if self.position_changed?
      self.updated_at = self.updated_at_was
    end
  end    

end
