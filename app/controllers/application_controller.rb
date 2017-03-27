class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception



  before_action :set_locale
  before_action :menu
   
  def set_locale
    I18n.locale = params[:locale] || I18n.default_locale
  end
  
  def default_url_options
    { locale: I18n.locale }
  end

  def menu
    if (params[:controller] == "projects" && params[:action] == "show") 
      project = Project.friendly.find(params[:id])
      #I18n.with_locale(:en) do
        @url_en = project_path(:id => project.slug_en, :locale => "en")
      #end
      #I18n.with_locale(:de) do
        @url_de = project_path(:id => project.slug_de, :locale => "de")
      #end
    else
      @url_en = url_for(params.merge(:locale => "en"))
      @url_de = url_for(params.merge(:locale => "de"))
    end
  end

end
