# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
AdminUser.create!(id: 1, email: 'admin@example.com', password: 'password', password_confirmation: 'password') if AdminUser.where(id: 1).empty?

Page.create!(seed_id: 'about', title_de: "Über uns", title_en: "About Us", slug_de: "ueber_uns", slug_en: "about_us") if Page.where(seed_id: 'about').empty?
Page.create!(seed_id: 'contact', title_de: "Kontakt", title_en: "Contact", slug_de: "kontakt", slug_en: "contact")    if Page.where(seed_id: 'contact').empty?