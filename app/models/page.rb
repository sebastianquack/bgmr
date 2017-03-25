class Page < ActiveRecord::Base
	translates :title, :content, :slug
end
