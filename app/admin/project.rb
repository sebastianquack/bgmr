ActiveAdmin.register Project do
# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#

controller do
  def find_resource
    scoped_collection.friendly.find(params[:id])
  end
end

permit_params :main_image, :title_de, :title_en, :description_de, :description_en, :slug_de, :slug_en, :draft, area_ids:[], tag_ids:[], topic_ids:[],
    :slides_attributes => [:id, :caption_de, :caption_en, :image, :_destroy, :slide_links_attributes => [:id, :to_slide_id, :pos_x, :pos_y, :_destroy]]

#
# or
#
# permit_params do
#   permitted = [:permitted, :attributes]
#   permitted << :other if params[:action] == 'create' && current_user.admin?
#   permitted
# end

form :html => { :enctype => "multipart/form-data" } do |f|

  f.semantic_errors

  f.inputs "Title" do
    f.input :title_de
    f.input :title_en 
  end
  f.inputs "Description" do
    f.input :description_de, :input_html => { :class => 'ckeditor' }
    f.input :description_en, :input_html => { :class => 'ckeditor' }
  end

  f.inputs "Titelbild", :class => "inputs main_image" do         
    f.input :main_image, :input_html => { :class => "js-upload" }, hint: f.object.main_image? ? image_tag(f.object.main_image.url(:medium)) : content_tag(:span, "Upload JPG/PNG/GIF image")
  end    

  f.inputs "Slideshow" do
    f.has_many :slides, heading: false, class: "slide", :new_record => true, :allow_destroy => true do |f_s|
        f_s.input :image, :input_html => { :class => "js-upload" }, :as => :file, :required => false, :hint => f_s.object.image? ? image_tag(f_s.object.image.url(:large)) : content_tag(:span, "Upload JPG/PNG/GIF image")
        f_s.input :caption_de
        f_s.input :caption_en
        f_s.input :order
        f_s.has_many :slide_links, class: "slide_link", :new_record => true, :allow_destroy => true do |f_sl|
          f_sl.input :to_slide, :collection => f.object.slides.collect {|slide| [slide.caption_de, slide.id] }
          f_sl.input :pos_x
          f_sl.input :pos_y
        end
    end
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
