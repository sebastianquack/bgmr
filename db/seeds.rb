# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
AdminUser.create!(id: 1, email: 'admin@example.com', password: 'password', password_confirmation: 'password') if AdminUser.where(id: 1).empty?

Page.create!(seed_id: 'about', title_de: "Über uns", title_en: "About Us", slug_de: "ueber_uns", slug_en: "about_us") if Page.where(seed_id: 'about').empty?
Page.create!(seed_id: 'imprint', title_de: "Impressum", title_en: "Imprint", slug_de: "impressum", slug_en: "imprint")    if Page.where(seed_id: 'imprint').empty?
Page.create!(seed_id: 'news', title_de: "Neuigkeiten", title_en: "News", slug_de: "neuigkeiten", slug_en: "news")    if Page.where(seed_id: 'news').empty?
Page.create!(seed_id: 'publications', title_de: "Publikationen", title_en: "Publications", slug_de: "publikationen", slug_en: "publications")    if Page.where(seed_id: 'publications').empty?

Topic.create!(seed_id: '1', color: '#C200FB', title_de: "Schöne Orte", title_en: "Nice Places", slug_de: "schoene_orte", slug_en: "nice_places")    if Topic.where(seed_id: '1').empty?
Topic.create!(seed_id: '2', color: '#C200FB', title_de: "Multicodierung", title_en: "Multicodierung", slug_de: "multicodierung", slug_en: "multicodierung")    if Topic.where(seed_id: '2').empty?
Topic.create!(seed_id: '3', color: '#C200FB', title_de: "Dynamische Landschaften", title_en: "Dynamic Landscapes", slug_de: "dynamische_landschaften", slug_en: "dynamic_landscapes")    if Topic.where(seed_id: '3').empty?
Topic.create!(seed_id: '4', color: '#38D909', title_de: "Grün Selbermachen", title_en: "DIY green", slug_de: "gruen_selbermachen", slug_en: "diy_green")    if Topic.where(seed_id: '4').empty?
Topic.create!(seed_id: '5', color: '#38D909', title_de: "Ränder der Städte", title_en: "City Borders", slug_de: "raender_der_staedte", slug_en: "city_borders")    if Topic.where(seed_id: '5').empty?
Topic.create!(seed_id: '6', color: '#38D909', title_de: "Stadt als Ressource", title_en: "City as Ressource", slug_de: "stadt_als_ressource", slug_en: "city_ressource")    if Topic.where(seed_id: '6').empty?
Topic.create!(seed_id: '7', color: '#38D909', title_de: "Transformation", title_en: "Transformation", slug_de: "transformation", slug_en: "transformation")    if Topic.where(seed_id: '7').empty?
Topic.create!(seed_id: '8', color: '#2DBB83', title_de: "Klimaangepasste Stadt", title_en: "Climate Adjusted City", slug_de: "klimaangepasste_stadt", slug_en: "climate_adjusted_city")    if Topic.where(seed_id: '8').empty?
Topic.create!(seed_id: '9', color: '#2DBB83', title_de: "Grau-grüne Infrastruktur", title_en: "Grey-Green-Infrastructure", slug_de: "graugruene_infrastruktur", slug_en: "grey_green_infrastructure")    if Topic.where(seed_id: '9').empty?
Topic.create!(seed_id: '10', color: '#2DBB83', title_de: "Bildungslandschaften", title_en: "Educational Landscapes", slug_de: "bildungslandschaften", slug_en: "educational_landscapes")    if Topic.where(seed_id: '10').empty?

