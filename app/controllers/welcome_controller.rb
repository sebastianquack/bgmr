class WelcomeController < ApplicationController
  def index
    @project = Project.featured.sample
  end
end
