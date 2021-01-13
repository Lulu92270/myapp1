class PagesController < ApplicationController
  def home
    @flats = Flat.order(updated_at: :desc)
  end
end
