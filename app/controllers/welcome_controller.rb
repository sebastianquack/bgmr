class WelcomeController < ApplicationController
  def index
    @projects = Project.featured.shuffle
   	@news = NewsItem.all.limit(3)
  end
end
