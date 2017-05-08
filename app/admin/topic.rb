ActiveAdmin.register Topic do
# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
menu :priority => 4

permit_params :title_de, :title_en, :slug_de, :slug_en, :color

#
# or
#
# permit_params do
#   permitted = [:permitted, :attributes]
#   permitted << :other if params[:action] == 'create' && current_user.admin?
#   permitted
# end

index do
    selectable_column
    column :color do |topic|
      div :style => "background-color:" + topic.color, :class => "topic_dot"
    end
    column :title_de
    column :title_en
    column t(:asociated_projects) do |topic|
    	topic.projects.map { |p| (link_to p.title, admin_project_path(p)) }.join(', ').html_safe
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
     	row t(:asociated_projects) do |topic|
    		topic.projects.map { |p| (link_to p.title, admin_project_path(p)) }.join(', ').html_safe
    	end
      row :color do |area|
        div :style => "background-color:" + area.color, :class => "topic_dot" do 
        end
      end      
    end
end

form do |f|
  f.semantic_errors *f.object.errors.keys
  f.inputs t(:title) do
    f.input :title_de
    f.input :title_en 
  end
  f.inputs t(:slugs) do
    f.input :slug_de
    f.input :slug_en
  end  
  f.inputs t(:special) do
    f.input :color, as: :color
  end      
  f.actions
end



end
