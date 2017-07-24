class Staff < ActiveRecord::Base

    acts_as_list

    translates :text

    default_scope { order(position: :asc) }

    has_attached_file :primary_image, styles: { medium: "600x600>", large: "600x600>", thumb: "100x100>" }, default_url: "/images/:style/missing.png"
    has_attached_file :secondary_image, styles: { medium: "600x600>", large: "600x600>", thumb: "100x100>" }, default_url: "/images/:style/missing.png"

    validates_attachment_content_type :primary_image, content_type: /\Aimage\/.*\z/
    validates_attachment_content_type :secondary_image, content_type: /\Aimage\/.*\z/

    validates :name, presence: true

end
