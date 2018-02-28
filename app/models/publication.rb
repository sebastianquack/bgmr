class Publication < ActiveRecord::Base

  acts_as_list
  default_scope { order(position: :asc) }

  # Ensure user has provided the required fields
  validates :title, presence: true
  validates :file, presence: true
  
  has_attached_file :file,
    styles: {
        :thumb => ["200x200>", :png], 
        :medium => ["500x500>", :png]
      }

  has_attached_file :image, styles: { 
      list2x: "690x690>", 
      list: "345x345>", 
      thumb: "200x200>",
      medium: "500x500>"
    }, 
    default_url: "/missing.png",
    :convert_options => {
      :medium => "-quality 90",
    }

  # Validate that we accept the type of file the user is uploading
  # by explicitly listing the mimetypes we are willing to accept
  validates_attachment_content_type :file,
    :content_type => ["application/pdf"],
    :message => "Bitte nur PDFs hochladen!"

  validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/

  def preview_image(size)
    self.image.exists? ? self.image(size) : self.file(size)
  end

  before_save :destroy_image?

  def image_delete
    @image_delete ||= "0"
  end

  def image_delete=(value)
    @image_delete = value
  end

  def destroy_image?
    self.image.clear if @image_delete == "1"
  end

end