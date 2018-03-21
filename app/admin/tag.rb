ActiveAdmin.register Tag do
# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
menu :priority => 5
config.sort_order = 'position_asc'
reorderable
permit_params :title_de, :title_en, :position
#
# or
#
# permit_params do
#   permitted = [:permitted, :attributes]
#   permitted << :other if params[:action] == 'create' && current_user.admin?
#   permitted
# end

index as: :reorderable_table do
    selectable_column
    column :title_de
    column :title_en
    column t(:asociated_projects) do |tag|
    	tag.projects.map { |p| (link_to p.title, admin_project_path(p)) }.join(', ').html_safe
    end
    actions
end

config.filters = false

show do
    attributes_table do
    	row :title_de do |area|
    		area.title_de
    	end 
     	row :title_en do |area|
     		area.title_en
     	end
     	row t(:asociated_projects) do |tag|
    		tag.projects.map { |p| (link_to p.title, admin_project_path(p)) }.join(', ').html_safe
    	end
    end
end

form do |f|
  f.semantic_errors *f.object.errors.keys
  f.inputs t(:title) do
    f.input :title_de
    f.input :title_en 
  end
  f.actions
end


end
