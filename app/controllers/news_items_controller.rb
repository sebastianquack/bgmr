class NewsItemsController < ApplicationController
  def index
    @news_items = NewsItem.all
    respond_to do |format|
      format.js
      format.html
    end
  end

  def show
    @news_item = NewsItem.friendly.find(params[:id])
  end
end
