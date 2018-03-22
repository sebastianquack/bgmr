class Page < ActiveRecord::Base
  extend FriendlyId

  has_many :page_images
  accepts_nested_attributes_for :page_images, :allow_destroy => true

  friendly_id :title, :use => [:slugged, :simple_i18n]

	translates :title, :content, :slug

  validates :title, presence: true
  validates :slug,  presence: true
  
  validates_format_of :slug, :with => /\A[a-z0-9_]+\z/i

  before_destroy :check_if_seed

  def check_if_seed
    if self.seed_id
      self.errors[:base] << "Cannot delete seed page."
      return false
    end
  end 

end
