class WelcomeController < ApplicationController

  def index
      render and return # this works even if page start is not in db and exists only as template
  end

end
