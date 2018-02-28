ActiveAdmin.register Publication do

# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
# permit_params :list, :of, :attributes, :on, :model
#
# or
#
config.sort_order = 'position_asc'
config.paginate   = false

 permit_params do
   permitted = [:draft, :title, :file, :image, :image_delete]
#   permitted << :other if params[:action] == 'create' && current_user.admin?
#   permitted
 end
reorderable

  index as: :reorderable_table do
    column :draft
    column :title
    column t(:image) do |p|
      image_tag p.preview_image(:thumb)
    end
    actions
  end

  filter :title
  filter :file_name
  filter :draft

  show do
      attributes_table do
        row :title do |p|
          p.title
        end 
        row t(:image) do |p|
			image_tag p.file(:thumb)
		end
	    row :file do |p|
          link_to "Download", p.file.url(:original, false)  
        end
      row :image do |p|
        image_tag p.image(:thumb)
      end        
        row :draft  
      end
  end

  form do |f|
    #f.semantic_errors *f.object.errors.keys
    f.inputs t(:title) do
      f.input :title, as: :string
    end
    f.inputs t(:file), :class => "inputs image" do         
      f.input :file, :input_html => { :class => "js-upload" }, hint: f.object.file.exists? ? image_tag(f.object.file.url(:thumb)) : content_tag(:span, t(:pdf_upload_info))
    end      
    f.inputs t(:image), :class => "inputs image" do         
      f.input :image, 
        :label => t(:image) + " (optional)", 
        :input_html => { :class => "js-upload" }, 
        hint: f.object.image? ? 
            image_tag(f.object.image.url(:medium)) 
          : content_tag(:span, t(:image_upload_info))
      if f.object.image.exists?
        f.input :image_delete, 
          as: :boolean, 
          :wrapper_html => { class: 'indent'}, 
          :label => 'Bild löschen', 
          :checked_value => 1, 
          :unchecked_value=> 0
      end
    end      
    f.inputs t(:special) do
      f.input :draft
    end      
    f.actions
  end

end
