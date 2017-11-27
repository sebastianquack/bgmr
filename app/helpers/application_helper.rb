require 'htmlentities'

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
      I18n.with_locale(locale) do
        out = url_for(params.merge(:locale => locale, :id => resource.slug))
      end
    else
      out = url_for(params.merge(:locale => locale))
    end
    out
  end

  def current_locale(locale)
    I18n.locale == locale
  end

  def current_section
    return nil if current_page?(root_path)
    return t("topics") if current_page?(topics_path)
    return t("projects") if current_page?(projects_path)
    return link_to t("topics"), topics_path if current_page?(topic_path)
    return link_to t("projects"), projects_path if current_page?(project_path)
    return link_to get_seed_page("news").title, page_path("news") if current_page?(news_item_path)
    return Page.friendly.find(params[:id]).title if current_page?(page_path)
  end

  def current_section_key
    return "welcome" if current_page?(root_path)
    return "topics" if current_page?(topics_path)
    return "projects" if current_page?(projects_path)
    return "topic" if current_page?(topic_path)
    return "project" if current_page?(project_path)
  end

  def strip_all x
    coder = HTMLEntities.new
    x = strip_tags(x.to_s.html_safe).gsub("\n","")
    x = coder.decode(x)
    x = x.gsub(/[\"<>&]/,"").gsub(/ +/,' ')
  end

  def tel_to(text)
    groups = text.to_s.scan(/(?:^\+)?\d+/)
    if groups[0][0] == "0"
      groups[0] = "+49" + groups[0][1..100]
    end
    link_to text, "tel:#{groups.join ''}"
  end

end
