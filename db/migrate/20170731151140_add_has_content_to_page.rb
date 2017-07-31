class AddHasContentToPage < ActiveRecord::Migration
  def change
    add_column :pages, :has_content, :boolean
  
    reversible do |dir|
      dir.up do
        imprint = Page.where(:seed_id => "imprint").first
        imprint.has_content = true
        imprint.save
      end
    end
  end
end
