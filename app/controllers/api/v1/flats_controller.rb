class Api::V1::FlatsController < ActionController::Base
  def index
    # @ not required because we don't have a views ....html.erb
    @flats = Flat.order(updated_at: :desc)
    render json: @flats
  end

  def show
    @flat = Flat.find(params[:id])
    render json: @flat
  end

  def update
    @flat = Flat.find(params[:id])
    @flat.update(flat_params)
    render json: @flat
  end

  def create
    @flat = Flat.new(flat_params)
    
    if @flat.save
      render json: @flat
    else
      render json: { errors: @flat.errors }
    end
  end

  def destroy
    @flat = Flat.find(params[:id])
    @flat.destroy

    render json: @flat
  end

  private

  def flat_params
    params.require(:flat).permit(:name, :price, :lat, :lng, :image_url)
  end
end
