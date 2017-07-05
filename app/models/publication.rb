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

  # Validate that we accept the type of file the user is uploading
  # by explicitly listing the mimetypes we are willing to accept
  validates_attachment_content_type :file,
    :content_type => ["application/pdf"],
    :message => "Bitte nur PDFs hochladen!"

end