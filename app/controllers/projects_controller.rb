class ProjectsController < ApplicationController
  def index
    @projects = Project.all()
  end

  def show
    @project = Project.friendly.find(params[:id])
    @number_of_slides = @project.slides.length
  end
end
