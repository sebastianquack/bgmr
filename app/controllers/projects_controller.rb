class ProjectsController < ApplicationController
  def index
    @tags = Tag.all
    @areas = Area.all
    @projects = Project.all.includes(:areas, :tags)
  end

  def show
    @project = Project.friendly.find(params[:id])
    @number_of_slides = @project.slides.length
  end
end
