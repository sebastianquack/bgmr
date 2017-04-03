class Page < ActiveRecord::Base
  extend FriendlyId
  friendly_id :title, :use => [:slugged, :simple_i18n]

	translates :title, :content, :slug

  before_destroy :check_if_seed

  def check_if_seed
    if self.seed_id
      self.errors[:base] << "Cannot delete seed page."
      return false
    end
  end 

end
