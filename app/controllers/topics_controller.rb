class TopicsController < ApplicationController
  def index
  	@random_seed = Time.now.to_i
    @topics = Topic.order(weight: :asc).shuffle(random: Random.new(@random_seed))
  end

  def show
    @topic = Topic.friendly.find(params[:id])
    @projects = @topic.projects.published
  end
end
