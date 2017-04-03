class AddSeedIdToPages < ActiveRecord::Migration
  def change
    add_column :pages, :seed_id, :string
    add_index :pages, :seed_id
  end
end
