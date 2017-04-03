class PagesController < ApplicationController
  def show
    @page = Page.friendly.find(params[:id])
    @title = @page.title
    @content = @page.content.html_safe if @page.content
  end
end
