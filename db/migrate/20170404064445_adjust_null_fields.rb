class AdjustNullFields < ActiveRecord::Migration
  def change
    
    change_column_null(:pages, :title_de, false)
    change_column_null(:pages, :title_en, false)
    change_column_null(:pages, :slug_de, false)
    change_column_null(:pages, :slug_en, false)

    change_column_null(:topics, :title_de, false)
    change_column_null(:topics, :title_en, false)
    change_column_null(:topics, :slug_de, false)
    change_column_null(:topics, :slug_en, false)

    change_column_null(:projects, :title_de, false)
    change_column_null(:projects, :title_en, false)
    change_column_null(:projects, :slug_de, false)
    change_column_null(:projects, :slug_en, false)

  end
end
