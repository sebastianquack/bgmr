module ApplicationHelper

  def get_seed_page(seed_id)
    # get static page
    Page.where(seed_id: seed_id).first
  end

  def translated_url_for_current_request(locale) # locale :en or :de
    # get links to other languege of this page
    out = ""
    if (params[:action] == "show") # assuming that all show actions have translated models
      controller = params[:controller]
      model = controller.classify.constantize
      resource = model.friendly.find(params[:id])
      logger.debug resource
      logger.debug locale
      I18n.with_locale(locale) do
        out = url_for(params.merge(:locale => locale, :id => resource.slug))
        logger.debug out
      end
    else
      out = url_for(params.merge(:locale => locale))
    end
    out
  end


end
