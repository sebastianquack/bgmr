class AddSeedIdToPages < ActiveRecord::Migration
  def change
    add_column :pages, :seed_id, :string
  end
end
