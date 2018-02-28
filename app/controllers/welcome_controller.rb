class WelcomeController < ApplicationController
  def index
    @projects = Project.featured.shuffle
  end
end
