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
   permitted = [:draft, :title, :file]
#   permitted << :other if params[:action] == 'create' && current_user.admin?
#   permitted
 end
reorderable

index as: :reorderable_table do
    column :draft
    column :title
    column t(:image) do |p|
      image_tag p.file(:thumb)
    end
    actions
  end

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
    f.inputs t(:special) do
      f.input :draft
    end      
    f.actions
  end

end
