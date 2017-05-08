class AddSeedIdToTopics < ActiveRecord::Migration
  def change
    add_column :topics, :seed_id, :string
  end
end
