class CreateProjectAreas < ActiveRecord::Migration
  def change
    create_table :project_areas do |t|
      t.integer :project_id
      t.integer :area_id

      t.timestamps null: false
    end
  end
end
