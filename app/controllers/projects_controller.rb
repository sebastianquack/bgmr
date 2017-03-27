class ProjectsController < ApplicationController
  def show
    @project = Project.friendly.find(:slug => params[:id]).first 
  end

  def index
  end
end
