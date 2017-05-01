ActiveAdmin.register Page do
# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
menu :priority => 1
permit_params :title_de, :title_en, :content_de, :content_en, :slug_de, :slug_en, :draft
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
    column :title_de
    column :slug_de do |page|
      link_to "/" + page.slug_de, page, :locale => "de"
    end
    column :title_en
    column :slug_en do |page|
      link_to "/" + page.slug_en, page, :locale => "en"
    end
    column :draft
    column :updated_at
    actions
end

filter :title_de
filter :title_en
filter :content_de
filter :content_en
filter :draft

show do
    attributes_table do
      row :title_de
      row :content_de
      row :slug_de do |page|
        if page.draft 
          span t(:deactivated), :class => "empty"
        else 
          link_to "/" + page.slug_de, page, :locale => "de"
        end
      end
      row :title_en
      row :content_en
      row :slug_en do |page|
        if page.draft 
          span t(:deactivated), :class => "empty"
        else 
          link_to "/" + page.slug_en, page, :locale => "en"
        end
      end
      row :draft
    end
  end



form do |f|
  f.semantic_errors *f.object.errors.keys
  f.inputs t(:title) do
    f.input :title_de
    f.input :title_en 
  end
  f.inputs t(:content) do
    f.input :content_de, :input_html => { :class => 'ckeditor' }
    f.input :content_en, :input_html => { :class => 'ckeditor' }
  end
  f.inputs t(:slugs) do
    f.input :slug_de
    f.input :slug_en
  end  
  f.inputs t(:special) do
  	f.input :draft
  end

  f.actions
end


end
