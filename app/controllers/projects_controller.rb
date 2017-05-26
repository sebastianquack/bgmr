class ProjectsController < ApplicationController
  def index
    @tags = Tag.all
    @areas = Area.all
    @projects = Project.all.includes(:areas, :tags)
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
