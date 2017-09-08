class Topic < ActiveRecord::Base
  extend FriendlyId

	translates :title, :slug, :description

  friendly_id :title, :use => [:slugged, :simple_i18n]

  has_attached_file :image, styles: { medium: "600x600>", thumb: "100x100>" }, default_url: "/assets/:style/missing.png"
  
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
    total = 1 if total == 0
    Topic.all.each do |topic|
      weight = topic.projects.count.to_f / total.to_f
      topic.update_column(:weight, weight) unless weight.nan?
    end
  end

  def weight_category(amount=4)
    total = Topic.count
    index = Topic.reorder(weight: :asc).index(self) + 1
    ( index.to_f / total.to_f * amount.to_f ).ceil # note: floor+1 gives nice results in amount+1 categories
  end


  def nice_weight_category(amount=4) # all are small except the top <amount>
    total = Topic.count
    index = Topic.order(weight: :desc).index(self)
    if index >= amount-1
      return 1 # last category
    else
      return amount - index
    end
  end

  # def nice_weight_category(amount=4) # put only the largest in the top category
  #   cat = self.weight_category(amount)
  #   if cat == amount # in top category
  #     if Topic.reorder(weight: :desc).index(self) != 0 # but not heaviest?
  #       return amount - 1 # reduce by 1
  #     end
  #   end
  #   cat
  # end

end
