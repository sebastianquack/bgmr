class ProjectsController < ApplicationController
  def index
    @tags = Tag.all
    @areas = Area.all
    @projects = Project.published.includes(:areas, :tags).order(:position)
    respond_to do |format|
      format.js
      format.html
    end
  end

  def show
    @project = Project.friendly.find(params[:id])
    @number_of_slides = @project.slides.length
  end
end
