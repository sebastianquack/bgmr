class AddContactDetailsToStaffs < ActiveRecord::Migration
  def change
    add_column :staffs, :phone, :string
    add_column :staffs, :fax, :string
    add_column :staffs, :email, :string
    remove_column :staffs, :contact
  end
end
