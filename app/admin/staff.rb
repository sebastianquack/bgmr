ActiveAdmin.register Staff do

# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#

config.sort_order = 'position_asc'
config.paginate   = false

menu :priority => 10
permit_params :draft, :name, :text_de, :text_en, :text_cont_de, :text_cont_en, :phone, :fax, :email, :primary_image, :secondary_image
reorderable

#
# or
#
# permit_params do
#   permitted = [:permitted, :attributes]
#   permitted << :other if params[:action] == 'create' && current_user.admin?
#   permitted
# end

  index as: :reorderable_table do
    column :draft
    column :name
    column :image do |staff|
      ol class: "image_swapper" do
        li image_tag staff.primary_image(:thumb)
        li image_tag staff.secondary_image(:thumb)
      end
    end
    actions
  end

  filter :name
  filter :text_de_or_text_de_cont
  filter :text_en_or_text_en_cont
  filter :email
  filter :draft

  show do
      attributes_table do
        row :name do |staff|
          staff.name
        end 
        row :text_de do |staff|
          staff.text_de
        end
        row :text_cont_de do |staff|
          staff.text_cont_de
        end        
        row :text_en do |staff|
          staff.text_en
        end   
        row :text_cont_en do |staff|
          staff.text_cont_en
        end                
        row :contact do |staff|
         div staff.phone
         div staff.fax
         div staff.email
        end
        row :images do |staff|
          span image_tag staff.primary_image(:thumb)
          span image_tag staff.secondary_image(:thumb)
        end
        row :draft  
      end
  end

  form do |f|
    f.semantic_errors *f.object.errors.keys
    f.inputs t(:name) do
      f.input :name
    end
    f.inputs t(:text_de) do
      f.input :text_de, as: :text, :input_html => { :class => 'autogrow', :rows => 2 }
      f.input :text_cont_de, as: :text, :input_html => { :class => 'autogrow', :rows => 4 }
    end
    f.inputs t(:text_en) do
      f.input :text_en, as: :text, :input_html => { :class => 'autogrow', :rows => 2 }
      f.input :text_cont_en, as: :text, :input_html => { :class => 'autogrow', :rows => 4 }
    end
    f.inputs t(:contact) do
      f.input :phone
      f.input :fax
      f.input :email
    end
    f.inputs t(:images), :class => "inputs image" do         
      f.input :primary_image, :input_html => { :class => "js-upload" }, hint: f.object.primary_image? ? image_tag(f.object.primary_image.url(:medium)) : content_tag(:span, t(:image_upload_info))
      f.input :secondary_image, :input_html => { :class => "js-upload" }, hint: f.object.secondary_image? ? image_tag(f.object.secondary_image.url(:medium)) : content_tag(:span, t(:image_upload_info))
    end      
    f.inputs t(:special) do
      f.input :draft
    end      
    f.actions
  end

end
