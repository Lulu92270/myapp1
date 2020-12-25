require 'faker'

puts "removing all flats..."
Flat.destroy_all

puts "Creating 4 flats..."
4.times do
  Flat.create!(
    name: Faker::Coffee.notes,
    image_url: "https://source.unsplash.com/featured/1600x900/?{#{Faker::Creature::Animal.name}",
    price: (1..15).to_a.sample * 100,
    lat: Faker::Address.latitude,
    lng: Faker::Address.longitude
  )
end

puts "DONE!"
