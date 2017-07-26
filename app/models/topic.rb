class Topic < ActiveRecord::Base
  extend FriendlyId

	translates :title, :slug, :description

  friendly_id :title, :use => [:slugged, :simple_i18n]

  has_attached_file :image, styles: { medium: "600x600>", thumb: "100x100>" }, default_url: "/images/:style/missing.png"
  
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/

	has_many :project_topics
  	accepts_nested_attributes_for :project_topics, :allow_destroy => true
  	has_many :projects, :through => :project_topics

  validates :title, presence: true
  validates :slug,  presence: true
  
  validates_format_of :slug, :with => /\A[a-z0-9_]+\z/i

  default_scope { order(Area.current_locale_column(:title)) }

  after_save :calculate_weights

  def calculate_weights
    total = Project.published.count
    Topic.all.each do |topic|
      weight = topic.projects.count.to_f / total.to_f
      topic.update_column(:weight, weight)
    end
  end

  def weight_category(amount=3)
    total = Topic.count
    index = Topic.reorder(weight: :asc).index(self)
    ( index.to_f / total.to_f * amount.to_f ).ceil
  end

end
