class AddHasContentToPage < ActiveRecord::Migration
  def change
    add_column :pages, :has_content, :boolean
  
    reversible do |dir|
      dir.up do
        imprint_query = Page.where(:seed_id => "imprint")
        if imprint_query.count() > 0
          imprint = imprint_query.first
          imprint.has_content = true
          imprint.save
        end
      end
    end
  end
end
