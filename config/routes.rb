Rails.application.routes.draw do

  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  get '', to: redirect('/de')

  scope ":locale", locale: /en|de/ do
    localized do
      resources :projects, :only => [:show, :index]
      resources :topics, :only => [:show, :index]
      resources :staff, :only => [:index, :insert_at, :reorder] #, :only => [:insert_at, :reorder]
      resources :news_items, :only => [:show]
    end
    get '/:id', to: "pages#show", as: "page"
    root :to => 'welcome#index'
  end

end
