ActiveAdmin.register Page do
# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
menu :priority => 11
permit_params :title_de, :title_en, :content_de, :content_en, :slug_de, :slug_en, :draft, :page_images_attributes => [:id, :image, :_destroy]

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
    column :has_content
    column :has_images
    actions
end


config.filters = false
#filter :title_de
#filter :title_en
#filter :content_de
#filter :content_en
#filter :draft

show do |page|
  attributes_table do
    row :title_de
    if resource.has_content
      row :content_de do |page|
        page.content_de.html_safe if page.content_de
      end
    end
    row t(:images) do
      reorderable_table_for page.page_images, :class => "reorderable-subtable reorderable-subtable-2col" do
        column t(:image) do |i|
          image_tag i.image(:thumb)
        end
      end
    end
    row :slug_de do |page|
      if page.draft 
        span t(:deactivated), :class => "empty"
      else 
        link_to "/" + page.slug_de, page, :locale => "de"
      end
    end
    row :title_en
    if resource.has_content
      row :content_en do |page|
        page.content_en.html_safe if page.content_en
      end
    end
    row :slug_en do |page|
      if page.draft 
        span t(:deactivated), :class => "empty"
      else 
        link_to "/" + page.slug_en, page, :locale => "en"
      end
    end
    if resource.has_content
      row :draft
    end
  end
end



form do |f|
  f.semantic_errors *f.object.errors.keys
  f.inputs t(:title) do
    f.input :title_de
    f.input :title_en 
  end
  if resource.has_content
    f.inputs t(:content) do
      f.input :content_de, :input_html => { :class => 'ckeditor' }
      f.input :content_en, :input_html => { :class => 'ckeditor' }
    end
  end

  if f.object.has_images
    f.inputs t(:images), :class=>"inputs slides_inputs" do
      #logger.debug f.object.inspect
      f.has_many :page_images, heading: false, class: "slide page_image", :new_record => true, :allow_destroy => true do |p_i|
        p_i.input :image, :label => t(:image), :input_html => { :class => "js-upload"}, :wrapper_html => { :class => "slide_image" }, :as => :file, :required => false, 
          :hint => p_i.object.image.exists? ? image_tag(p_i.object.image.url(:large)) : image_tag("data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==")
      end
    end 
  end

  f.inputs t(:slugs) do
    f.input :slug_de
    f.input :slug_en
  end  
  if resource.has_content
    f.inputs t(:special) do
      f.input :draft
    end
  end
  
  f.actions
end


end
