class AddSlugsToTopics < ActiveRecord::Migration
  def change

    add_column :topics, :slug_en, :string
    add_column :topics, :slug_de, :string

  end
end
