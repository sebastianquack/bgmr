ActiveAdmin.register Project do
# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
permit_params :title_de, :title_en, :description_de, :description_en, :slug, :draft, area_ids:[], tag_ids:[], topic_ids:[]
#
# or
#
# permit_params do
#   permitted = [:permitted, :attributes]
#   permitted << :other if params[:action] == 'create' && current_user.admin?
#   permitted
# end

form do |f|
  f.inputs "Title" do
    f.input :title_de
    f.input :title_en 
  end
  f.inputs "Description" do
    f.input :description_de, :input_html => { :class => 'ckeditor' }
    f.input :description_en, :input_html => { :class => 'ckeditor' }
  end

  f.inputs "Arbeitsgebiete" do
    f.input :areas, :label => false, :as => :check_boxes
  end

  f.inputs "Tags" do
    f.input :tags, :label => false, :as => :check_boxes
  end

  f.inputs "Themen" do
    f.input :topics, :label => false, :as => :check_boxes
  end
  
  f.inputs "Spezial" do
  	f.input :slug
  	f.input :draft
  end

  f.actions
end

end
