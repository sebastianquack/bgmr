ActiveAdmin.register Project do
# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
menu :priority => 2
controller do
  def find_resource
    scoped_collection.friendly.find(params[:id])
  end
end

permit_params :main_image, :title_de, :title_en, :description_de, :description_en, :slug_de, :slug_en, :draft, area_ids:[], tag_ids:[], topic_ids:[],
    :slides_attributes => [:id, :order, :caption_de, :caption_en, :image, :zoomable, :_destroy, :slide_links_attributes => [:id, :to_slide_id, :pos_x, :pos_y, :_destroy]]

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
    column :main_image do |project|
      image_tag project.main_image(:thumb)
    end
    
    column :title_de
    column :slug_de do |project|
      link_to "/" + project.slug_de, project, :locale => "de"
    end
    column :title_en
    column :slug_en do |project|
      link_to "/" + project.slug_en, project, :locale => "en"
    end
    column :draft
    column :updated_at
    actions
end

filter :title_de
filter :title_en
filter :description_de
filter :description_en
filter :draft

show do
    attributes_table do
      row :main_image do |project|
        image_tag project.main_image(:thumb)
      end
      row :title_de
      row :title_en      
      row :description_de do |project|
        span project.description_de.html_safe
      end
      row :description_en do |project|
        span project.description_en.html_safe
      end
      row :slug_de do |project|
        if project.draft 
          span t(:deactivated), :class => "empty"
        else 
          link_to "/" + project.slug_de, project, :locale => "de"
        end
      end
      row :slug_en do |project|
        if project.draft 
          span t(:deactivated), :class => "empty"
        else 
          link_to "/" + project.slug_en, project, :locale => "en"
        end
      end
      row t(:topics) do |project| 
        project.topics.map { |a| (link_to a.title, admin_topic_path(a)) }.join(', ').html_safe
      end
      row t(:areas) do |project| 
        project.areas.map { |a| (link_to a.title, admin_area_path(a)) }.join(', ').html_safe
      end
      row t(:tags) do |project| 
        project.tags.map { |a| (link_to a.title, admin_tag_path(a)) }.join(', ').html_safe
      end
      row t(:slideshow) do |project|
        span :class => "show_slideshow_images" do
          project.slides.map { |s| image_tag s.image(:thumb) }.join('').html_safe
        end
      end
      row :draft

    end
  end


form :html => { :enctype => "multipart/form-data" } do |f|

  
  f.semantic_errors *f.object.errors.keys


  f.inputs t(:title) do
    f.input :title_de
    f.input :title_en 
  end
  f.inputs t(:description) do
    f.input :description_de, :input_html => { :class => 'ckeditor' }
    f.input :description_en, :input_html => { :class => 'ckeditor' }
  end

  f.inputs t(:image), :class => "inputs main_image" do         
    f.input :main_image, :input_html => { :class => "js-upload" }, hint: f.object.main_image? ? image_tag(f.object.main_image.url(:medium)) : content_tag(:span, t(:image_upload_info))
  end    

  logger.debug "slideshow form"
  f.inputs t(:slideshow), :class=>"inputs slides_inputs" do
    #logger.debug f.object.inspect
    f.has_many :slides, heading: false, class: "slide", :new_record => true, :allow_destroy => true do |f_s|
      #logger.debug f_s.object.inspect
      f_s.input :image, :input_html => { :class => "js-upload" }, :wrapper_html => { :class => "slide_image" }, :as => :file, :required => false, 
        :hint => f_s.object.image? ? image_tag(f_s.object.image.url(:large)) : image_tag("data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==")
      unless f_s.object.new_record? #allow slide link management only after save
        f_s.has_many :slide_links, class: "slide_link", :new_record => true, :allow_destroy => true do |f_sl|
          #logger.debug f_sl.object.inspect
          f_sl.input :to_slide, :include_blank => false, :collection => f.object.slides.collect {|slide| [slide.order, slide.id] }, :hint => "•", :wrapper_html => { :class =>  "to_slide" }
          f_sl.input :pos_x, :wrapper_html => { :class =>  "hidden" }, :input_html => { :class =>  "pos_x" }
          f_sl.input :pos_y, :wrapper_html => { :class =>  "hidden" }, :input_html => { :class =>  "pos_y" }
        end
      end
      f_s.input :zoomable, :wrapper_html => { class: 'indent'}
      f_s.input :caption_de
      f_s.input :caption_en
      
      f_s.input :order,  :wrapper_html => { :class =>  "order" }, :input_html => { :class =>  "order_input", readonly: true } #, :as => :hidden
      # hack to add custom html elements in form
      f_s.template.concat(Arbre::Context.new do
                                    li do
                                      button I18n.t(:move_up), :class => "slide-move-button up" 
                                      button I18n.t(:move_down), :class => "slide-move-button down"
                                    end
                                  end.to_s)  

    end
  end

  f.inputs t(:topics) do
    f.input :topics, :label => false, :as => :check_boxes
  end
    
  f.inputs t(:areas) do
    f.input :areas, :label => false, :as => :check_boxes
  end

  f.inputs t(:tags) do
    f.input :tags, :label => false, :as => :check_boxes
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
