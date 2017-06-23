class PagesController < ApplicationController
  def show
    @page = Page.friendly.find(params[:id])
    @title = @page.title
    @content = @page.content.html_safe if @page.content

    if @page.seed_id && @page.seed_id == "about"
      @staffs = Staff.all
      render "staffs/index"
    end
  end
end
