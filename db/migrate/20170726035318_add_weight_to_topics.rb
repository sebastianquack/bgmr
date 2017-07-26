class AddWeightToTopics < ActiveRecord::Migration
  def change
    add_column :topics, :weight, :float
  end
end
