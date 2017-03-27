class Page < ActiveRecord::Base
  extend FriendlyId
  friendly_id :title, :use => [:slugged, :simple_i18n]

	translates :title, :content, :slug
end
