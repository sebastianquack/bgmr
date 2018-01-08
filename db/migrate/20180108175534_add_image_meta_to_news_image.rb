class AddImageMetaToNewsImage < ActiveRecord::Migration
  def down
    remove_column :news_images, :image_meta, :text
  end
  def up
    add_column :news_images, :image_meta, :text
    rake_command = 'bundle exec rake paperclip:refresh CLASS=NewsImage'
    puts 'ATTENTION. YOU NEED TO RUN: ' + rake_command
    #system(rake_command)    
  end
end
