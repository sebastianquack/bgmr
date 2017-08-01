# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
AdminUser.create!(id: 1, email: 'admin@example.com', password: 'password', password_confirmation: 'password') if AdminUser.where(id: 1).empty?

# just do once, remember with seed_id
# these pages are hard coded into the menu and should not be able to delete
Page.create!(seed_id: 'about', title_de: "Über uns", title_en: "About Us", slug_de: "ueber_uns", slug_en: "about_us") if Page.where(seed_id: 'about').empty?
Page.create!(seed_id: 'imprint', title_de: "Impressum", title_en: "Imprint", slug_de: "impressum", slug_en: "imprint")    if Page.where(seed_id: 'imprint').empty?
Page.create!(seed_id: 'news', title_de: "Neuigkeiten", title_en: "News", slug_de: "neuigkeiten", slug_en: "news")    if Page.where(seed_id: 'news').empty?
Page.create!(seed_id: 'publications', title_de: "Publikationen", title_en: "Publications", slug_de: "publikationen", slug_en: "publications")    if Page.where(seed_id: 'publications').empty?

# add initial entry
Staff.create!(name: "bgmr Landschaftsarchitekten", position: 1, contact: "Tel (030) 214 59 59-23\nFax (030) 214 59 59-59\ninfo@bgmr.de") if Staff.all.empty?

# just do once, remember with seed_id
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

# just do once, but remember by dedicated id range

tags = [
  'Region',
  'Stadt',
  'Quartier',
  'Parks / Gärten / Friedhöfe',
  'Plätze / Wege',
  'Wasseranlagen',
  'Spiel / Sport / Schule',
  'Landschaft / Natur',
  'Infrastrukturgewerbe',
  'Wohnen',
  'Tourismus'
]

tags.each_with_index do |title,index|
  id = 1000+index
  Tag.create!(id: id, title_de: title, title_en: title+" (en)") if Tag.where(id: id).empty?
end

areas = [
  'Strategie Region / Stadt',
  'Teilräumliche Konzepte',
  'Objekte / Freianlagen',
  'Landschafts‐ und Umweltplanung',
  'Management / Pflege',
  'Steuerung / Moderation',
  'Forschung',
]

areas.each_with_index do |title,index|
  id = 1000+index
  Area.create!(id: id, title_de: title, title_en: title+" (en)") if Area.where(id: id).empty?
end

# populate db with example projects, run with "rake db:seed fakeprojects=true", always overwrite existing ones
# remove with "rake db:seed fakeprojects=remove"

logger = Logger.new(STDOUT)

if ENV["fakeprojects"]
  index = 0
  
  while index < 80 do
    slug = "dummy" + index.to_s

    destroyed = Project.where(slug_de: slug).destroy_all
    logger.info destroyed.to_a.length.to_s + " removed" if destroyed.to_a.length > 0
    
    if ENV["fakeprojects"]!="remove"
      name = Faker::Book.title
      desc = Faker::Lorem.paragraph(2, false, 8)

      random_tags = Tag.find(Tag.ids.sample(rand(6)))
      random_topics = Topic.find(Topic.ids.sample(rand(2)+1))
      random_areas = Area.find(Area.ids.sample(rand(6)))
      
      Project.create!(title_en: name, title_de: name, slug_de: slug, slug_en: slug, description_de: desc, description_en: desc, main_image: File.open('../dummy-images/' + index.to_s + '.jpg', 'rb'), tags: random_tags, areas: random_areas, topics: random_topics)

      logger.info "Add Fake Project ”" + name + "”"
    end
    index += 1
  end
end

# populate db with example staffs, run with "rake db:seed fakestaffs=true", always overwrite existing ones
# remove with "rake db:seed fakestaffs=remove"

logger = Logger.new(STDOUT)

if ENV["fakestaffs"]

  destroyed = Staff.where("text_de LIKE ?",'%Example%').destroy_all
  logger.info destroyed.to_a.length.to_s + " removed" if destroyed.to_a.length > 0

  index = 0  

  while index < 20 do
    
    if ENV["fakestaffs"]!="remove"
      name = Faker::Name.name
      text = Faker::Lorem.paragraph(2, false, 3) + ' [Example]'
      text_cont = Faker::Lorem.paragraph(2, false, 8) + ' [Example]'

      contact = "Tel. (030) 214 59 59-23\ninfo@bgmr.de"
      
      Staff.create!(name: name, text_de: text, text_en: text, text_cont_de: text, text_cont_en: text, primary_image: URI.parse("http://www.fillmurray.com/300/#{200+index}"), secondary_image: URI.parse("http://www.fillmurray.com/300/#{180+index}"), contact: contact)

      logger.info "Add Fake Staff ”" + name + "”"
    end
    index += 1
  end
end

# populate db with example news, run with "rake db:seed fakenews=true", always overwrite existing ones
# remove with "rake db:seed fakenews=remove"

logger = Logger.new(STDOUT)

if ENV["fakenews"]

  index = 0  

  while index < 3 do
    slug = "dummy" + index.to_s

    destroyed = NewsItem.where(slug_de: slug).destroy_all
    logger.info destroyed.to_a.length.to_s + " removed" if destroyed.to_a.length > 0
    
    if ENV["fakenewss"]!="remove"
      title = Faker::Overwatch.quote
      preview = Faker::Lorem.paragraph(1, false, 1)
      content = Faker::Lorem.paragraph(2, false, 20)
      
      item = NewsItem.create!(slug_de: slug, slug_en: slug, title_de: title, title_en: title, preview_de: preview, preview_en: preview, content_de: content, content_en: content)

      logger.info "Add Fake news ”" + title + "”"
    end
    index += 1
  end
end