class PagesController < ApplicationController
  def show
    @page = Page.friendly.find(params[:id])
    @title = @page.title
    @content = @page.content.html_safe if @page.content

    if @page.seed_id && @page.seed_id == "about"
      @staffs = Staff.all
      render "staffs/index"
    end

    if @page.seed_id && @page.seed_id == "publications"
      @publications = Publication.all
      render "publications/index"
    end

  end
end
