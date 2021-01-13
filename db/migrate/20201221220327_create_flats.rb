class CreateFlats < ActiveRecord::Migration[6.0]
  def change
    create_table :flats do |t|
      t.string :name, null:false
      t.string :image_url
      t.string :price, null:false, default: 0
      t.string :lat
      t.string :lng

      t.timestamps
    end
  end
end
