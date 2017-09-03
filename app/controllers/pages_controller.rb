class PagesController < ApplicationController
  def show
    @page = Page.friendly.find(params[:id])
    @title = @page.title
    @content = @page.content.html_safe if @page.content

    if @page.seed_id && @page.seed_id == "about"
      @staffs = Staff.all.to_a
      @company = @staffs[0]
      render "staffs/index"
    end

    if @page.seed_id && @page.seed_id == "publications"
      @publications = Publication.all
      render "publications/index"
    end

    if @page.seed_id && @page.seed_id == "news"
      @news_items = NewsItem.all
      render "news_items/index"
    end

  end
end
