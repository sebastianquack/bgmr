ActiveAdmin.register NewsItem do

# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
permit_params :slug_de, :slug_en, :title_de, :title_en, :preview_de, :preview_en, :content_de, :content_en, :draft, :position, :news_images_attributes => [:id, :image, :_destroy]
menu :priority => 10
#
# or
#
# permit_params do
#   permitted = [:permitted, :attributes]
#   permitted << :other if params[:action] == 'create' && current_user.admin?
#   permitted
# end

config.sort_order = 'position_asc'
config.paginate   = false
reorderable

  index as: :reorderable_table do
    column :title
    column :draft
    column t(:image) do |n|
      image_tag n.news_images.first.image(:thumb) if n.news_images.length > 0
    end
    actions
  end

  filter :title_de
  filter :title_en
  filter :preview_de
  filter :preview_en
  filter :content_de
  filter :content_en
  filter :draft

  form do |f|
    #f.semantic_errors *f.object.errors.keys
    f.inputs t(:title) do
      f.input :title_de, as: :string
      f.input :title_en, as: :string
    end
    f.inputs t(:images) do
      f.has_many :news_images, heading: false, class: "NewsImage", :new_record => true, :allow_destroy => true do |f_i|
        f_i.input :image, :label => t(:image), :input_html => { :class => "js-upload"}, :as => :file, :required => false, 
        :hint => f_i.object.image? ? image_tag(f_i.object.image.url(:large)) : image_tag("data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==")
      end
    end
    f.inputs t(:preview) do
      f.input :preview_de, :input_html => { :class => 'ckeditor' }
      f.input :preview_en, :input_html => { :class => 'ckeditor' }
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

  show do
    attributes_table do
      row :title_de
      row :title_en
      row t(:images) do |n|
        n.news_images.map { |i| image_tag i.image(:thumb) }.join('').html_safe
      end
      row :preview_de do |n|
        span n.preview_de.html_safe
      end
      row :preview_en do |n|
        span n.preview_en.html_safe
      end
      row :content_de do |n|
        span n.content_de.html_safe
      end
      row :content_en do |n|
        span n.content_en.html_safe
      end
      row :draft

    end
  end


end
