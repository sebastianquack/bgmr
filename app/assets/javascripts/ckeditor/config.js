CKEDITOR.editorConfig = function(config) {
  config.language = "en"
  config.width = "79%"
  config.toolbar = [
    { name: 'format', items: ['Bold', 'Italic', 'Link', 'Unlink'] },
    { name: 'insert', items: [ 'Image']},
    { name: 'undo', items: ['Undo', 'Redo'] },
    { name: 'document', items: [ 'Source' ] }
  ]
  config.allowedContent = true
  return true
}
