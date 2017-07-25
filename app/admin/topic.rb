ActiveAdmin.register Topic do
# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
menu :priority => 2

permit_params :title_de, :title_en, :slug_de, :slug_en, :color, :image, :description_de, :description_en

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
    column :image do |topic|
      image_tag topic.image(:thumb)
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
    	row :title_de do |topic|
    		topic.title_de
    	end 
     	row :title_en do |topic|
     		topic.title_en
     	end
      row :title_en do |topic|
        topic.title_en
      end   
      row :description_de do |topic|
       span topic.description_de.html_safe
      end
      row :description_en do |topic|
       span topic.description_en.html_safe
      end
     	row t(:asociated_projects) do |topic|
    		topic.projects.map { |p| (link_to p.title, admin_project_path(p)) }.join(', ').html_safe
    	end
      row :image do |topic|
        image_tag topic.image(:thumb)
      end
      row :color do |topic|
        div :style => "background-color:" + topic.color, :class => "topic_dot" do 
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
  f.inputs t(:description) do
    f.input :description_de, as: :text
    f.input :description_en, as: :text
  end
  f.inputs t(:image), :class => "inputs image" do         
    f.input :image, :input_html => { :class => "js-upload" }, hint: f.object.image? ? image_tag(f.object.image.url(:medium)) : content_tag(:span, t(:image_upload_info))
  end      
  f.inputs t(:special) do
    f.input :color, as: :color
  end      
  f.actions
end



end
