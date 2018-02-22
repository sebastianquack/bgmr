# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180222200700) do

  create_table "active_admin_comments", force: :cascade do |t|
    t.string   "namespace"
    t.text     "body"
    t.string   "resource_id",   null: false
    t.string   "resource_type", null: false
    t.integer  "author_id"
    t.string   "author_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "active_admin_comments", ["author_type", "author_id"], name: "index_active_admin_comments_on_author_type_and_author_id"
  add_index "active_admin_comments", ["namespace"], name: "index_active_admin_comments_on_namespace"
  add_index "active_admin_comments", ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource_type_and_resource_id"

  create_table "admin_users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
  end

  add_index "admin_users", ["email"], name: "index_admin_users_on_email", unique: true
  add_index "admin_users", ["reset_password_token"], name: "index_admin_users_on_reset_password_token", unique: true

  create_table "areas", force: :cascade do |t|
    t.string   "title_de"
    t.string   "title_en"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "friendly_id_slugs", force: :cascade do |t|
    t.string   "slug",                      null: false
    t.integer  "sluggable_id",              null: false
    t.string   "sluggable_type", limit: 50
    t.string   "scope"
    t.datetime "created_at"
  end

  add_index "friendly_id_slugs", ["slug", "sluggable_type", "scope"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type_and_scope", unique: true
  add_index "friendly_id_slugs", ["slug", "sluggable_type"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type"
  add_index "friendly_id_slugs", ["sluggable_id"], name: "index_friendly_id_slugs_on_sluggable_id"
  add_index "friendly_id_slugs", ["sluggable_type"], name: "index_friendly_id_slugs_on_sluggable_type"

  create_table "news_images", force: :cascade do |t|
    t.integer  "news_item_id"
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.text     "image_meta"
  end

  create_table "news_items", force: :cascade do |t|
    t.string   "title_de"
    t.string   "title_en"
    t.text     "preview_de"
    t.text     "preview_en"
    t.text     "content_de"
    t.text     "content_en"
    t.integer  "position"
    t.boolean  "draft"
    t.string   "slug_de"
    t.string   "slug_en"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "pages", force: :cascade do |t|
    t.boolean  "draft"
    t.string   "title_de",    null: false
    t.string   "title_en",    null: false
    t.text     "content_de"
    t.text     "content_en"
    t.string   "slug_en",     null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "slug_de",     null: false
    t.string   "seed_id"
    t.boolean  "has_content"
  end

  add_index "pages", ["seed_id"], name: "index_pages_on_seed_id"

  create_table "project_areas", force: :cascade do |t|
    t.integer  "project_id"
    t.integer  "area_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "project_tags", force: :cascade do |t|
    t.integer  "project_id"
    t.integer  "tag_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "project_topics", force: :cascade do |t|
    t.integer  "project_id"
    t.integer  "topic_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "projects", force: :cascade do |t|
    t.string   "slug_en",                 null: false
    t.boolean  "draft"
    t.string   "title_de",                null: false
    t.string   "title_en",                null: false
    t.text     "description_de"
    t.text     "description_en"
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.string   "slug_de",                 null: false
    t.string   "main_image_file_name"
    t.string   "main_image_content_type"
    t.integer  "main_image_file_size"
    t.datetime "main_image_updated_at"
    t.boolean  "featured"
    t.integer  "position"
  end

  create_table "publications", force: :cascade do |t|
    t.string   "title"
    t.boolean  "draft"
    t.string   "file_file_name"
    t.string   "file_content_type"
    t.integer  "file_file_size"
    t.datetime "file_updated_at"
    t.integer  "position"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
  end

  create_table "slide_links", force: :cascade do |t|
    t.integer  "from_slide_id"
    t.integer  "to_slide_id"
    t.float    "pos_x"
    t.float    "pos_y"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  create_table "slides", force: :cascade do |t|
    t.boolean  "draft"
    t.integer  "project_id"
    t.integer  "order"
    t.string   "caption_de"
    t.string   "caption_en"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.boolean  "zoomable"
    t.text     "image_meta"
  end

  create_table "staffs", force: :cascade do |t|
    t.boolean  "draft"
    t.string   "name"
    t.text     "text_de"
    t.text     "text_en"
    t.string   "primary_image_file_name"
    t.string   "primary_image_content_type"
    t.integer  "primary_image_file_size"
    t.datetime "primary_image_updated_at"
    t.string   "secondary_image_file_name"
    t.string   "secondary_image_content_type"
    t.integer  "secondary_image_file_size"
    t.datetime "secondary_image_updated_at"
    t.integer  "position"
    t.text     "text_cont_en"
    t.text     "text_cont_de"
    t.string   "phone"
    t.string   "fax"
    t.string   "email"
  end

  create_table "tags", force: :cascade do |t|
    t.string   "title_de"
    t.string   "title_en"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "topics", force: :cascade do |t|
    t.string   "title_de",           null: false
    t.string   "title_en",           null: false
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.string   "slug_en",            null: false
    t.string   "slug_de",            null: false
    t.string   "color"
    t.string   "seed_id"
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.string   "description_en"
    t.string   "description_de"
    t.float    "weight"
  end

end
