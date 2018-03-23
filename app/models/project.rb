class Project < ActiveRecord::Base
  extend FriendlyId

  friendly_id :title, :use => [:slugged, :simple_i18n]

  acts_as_list

  has_attached_file :pdf,
    styles: {
        :thumb => ["200x200>", :png], 
        :medium => ["500x500>", :png]
      }

 	has_attached_file :main_image, styles: { 
      medium: "800x800>", 
      frontw2500: "2500x2500>", 
      frontw2000: "2000x2000>", 
      frontw1500: "1500x1500>", 
      frontw1000: "1000x1000>", 
      frontw500: "500x500>", 
      list2x: "690x690>", 
      list: "345x345>", 
      thumb: "100x100>" 
    }, default_url: "/missing.png",
		:convert_options => {
      :medium => "-quality 90",
      :frontw2500 => "-quality 85 -interlace Plane",
      :frontw2000 => "-quality 90 -interlace Plane",
      :frontw1500 => "-quality 90 -interlace Plane",
			:frontw1000 => "-quality 90 -interlace Plane",
			:frontw500  => "-quality 95 -interlace Plane",
      :list2x => "-quality 85 -strip",
      :list => "-quality 85 -strip",
		}

  validates_attachment_content_type :pdf,
    :content_type => ["application/pdf"],
    :message => "Bitte nur PDFs hochladen!"
     
  validates_attachment_content_type :main_image, content_type: /\Aimage\/.*\z/

	translates :title, :description, :slug

	has_many :project_areas
	accepts_nested_attributes_for :project_areas, :allow_destroy => true
	has_many :areas, :through => :project_areas

	has_many :project_tags
	accepts_nested_attributes_for :project_tags, :allow_destroy => true
	has_many :tags, :through => :project_tags

	has_many :project_topics
	accepts_nested_attributes_for :project_topics, :allow_destroy => true
	has_many :topics, :through => :project_topics

  has_many :slides, -> { order(order: :asc) }
  accepts_nested_attributes_for :slides, :allow_destroy => true

  validates :title, presence: true
  validates :slug,  presence: true
  
  validates_format_of :slug, :with => /\A[a-z0-9_]+\z/i  

  scope :published, -> { where(draft: false) }

  scope :featured, -> { where(featured: true) }


  after_save :fix_order

  def fix_order
    self.slides.all.order(:order).each_with_index do |slide, index|
      if (index+1 != slide.order)
        slide.order = index+1
        slide.save
      end
    end
  end

  before_update :reorder_without_updated_at

  def reorder_without_updated_at
    if self.position_changed?
      self.updated_at = self.updated_at_was
    end
  end  

  before_save :destroy_pdf?

  def pdf_delete
    @pdf_delete ||= "0"
  end

  def pdf_delete=(value)
    @pdf_delete = value
  end

  def destroy_pdf?
    self.pdf.clear if @pdf_delete == "1"
  end  
  
end