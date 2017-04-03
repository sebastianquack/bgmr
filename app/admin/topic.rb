ActiveAdmin.register Topic do
# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
permit_params :title_de, :title_en, :slug_de, :slug_en

controller do
  def find_resource
    scoped_collection.friendly.find(params[:id])
  end
end

#
# or
#
# permit_params do
#   permitted = [:permitted, :attributes]
#   permitted << :other if params[:action] == 'create' && current_user.admin?
#   permitted
# end

end
