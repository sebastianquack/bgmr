ActiveAdmin.register Page do
# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
permit_params :title_de, :title_en, :content_de, :content_en, :slug_de, :slug_en, :draft
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
  f.inputs "Content" do
    f.input :content_de, :input_html => { :class => 'ckeditor' }
    f.input :content_en, :input_html => { :class => 'ckeditor' }
  end
  f.inputs "Slug" do
    f.input :slug_de
    f.input :slug_en 
  end  
  f.inputs "Spezial" do
  	f.input :draft
  end

  f.actions
end


end
