class CreateProjectTopics < ActiveRecord::Migration
  def change
    create_table :project_topics do |t|
      t.integer :project_id
      t.integer :topic_id

      t.timestamps null: false
    end
  end
end
