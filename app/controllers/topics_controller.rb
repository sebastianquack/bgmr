class TopicsController < ApplicationController
  def index
    @topics = Topic.order(weight: :asc).all()
  end

  def show
    @topic = Topic.friendly.find(params[:id])
    @projects = @topic.projects.all()
  end
end
