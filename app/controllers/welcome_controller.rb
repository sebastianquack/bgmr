class WelcomeController < ApplicationController
  def index
    @welcome = t("welcome")
  end
end
