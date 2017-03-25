class TranslateSlugs < ActiveRecord::Migration
  def change
    
    rename_column :pages, :slug, :slug_en
    add_column :pages, :slug_de, :string

    rename_column :projects, :slug, :slug_en
    add_column :projects, :slug_de, :string

  end  
end
