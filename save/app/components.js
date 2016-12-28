Vue.component('rooter', {
  props: ['text', 'routeTo'],
  template: '<div v-on:click="roote">{{ text }}<div>',
  methods: {
    roote: function () {
      main.show = false
    }
  }
})
