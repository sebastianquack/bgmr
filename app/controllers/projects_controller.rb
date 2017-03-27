class ProjectsController < ApplicationController
  def show
    @project = Project.friendly.find(params[:id])
    @title = @project.title
  end

  def index
    @projects = Project.all()
  end
end
