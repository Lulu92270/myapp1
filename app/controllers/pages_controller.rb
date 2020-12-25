class PagesController < ApplicationController
  def home
    @flats = Flat.order(name: :desc)
  end
end
