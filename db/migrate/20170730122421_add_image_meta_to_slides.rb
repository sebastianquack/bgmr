class AddImageMetaToSlides < ActiveRecord::Migration
  def down
    remove_column :slides, :image_meta, :text
  end
  def up
    add_column :slides, :image_meta, :text
    rake_command = 'bundle exec rake paperclip:refresh CLASS=Slide'
    puts 'ATTENTION. YOU NEED TO RUN: ' + rake_command
    #system(rake_command)    
  end
end
