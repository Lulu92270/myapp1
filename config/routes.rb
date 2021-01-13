Rails.application.routes.draw do
  root to: 'pages#home'

  get "/flats/:id", to: 'pages#home'
  get "/flats/new", to: 'pages#home'
  get "/flats/update/:id", to: 'pages#home'

  namespace :api, default: { format: :json } do
    namespace :v1 do
      resources :flats, only: [ :index, :create, :show, :destroy, :update ]
    end
  end
end
