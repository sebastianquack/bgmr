class AddHasImagesToPage < ActiveRecord::Migration
  def change
    add_column :pages, :has_images, :boolean, :default => false
  
    reversible do |dir|
      dir.up do
        about_query = Page.where(:seed_id => "about")
        if about_query.count() > 0
          about = about_query.first
          about.has_images = true
          about.save
        end
      end
    end
  end
end
