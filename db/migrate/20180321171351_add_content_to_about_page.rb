class AddContentToAboutPage < ActiveRecord::Migration
  def up
  	p = Page.where(:seed_id => "about").first
  	p.has_content = true
  	p.save!
  end
end
