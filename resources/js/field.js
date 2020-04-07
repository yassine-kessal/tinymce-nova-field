Nova.booting((Vue, router, store) => {
  Vue.component('index-tinymce-field', require('./components/IndexField'))
  Vue.component('detail-tinymce-field', require('./components/DetailField'))
  Vue.component('form-tinymce-field', require('./components/FormField'))
})
