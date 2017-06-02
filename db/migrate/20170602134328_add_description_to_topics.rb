class AddDescriptionToTopics < ActiveRecord::Migration
  def change
    add_column :topics, :description_en, :string
    add_column :topics, :description_de, :string
  end
end
