function toggle(){
  main.toggle()
  noteboard.toggle()
}

function checkUser(){
  user = localStorage.getItem('token')
  if(user) toggle()
}



var main = new Vue({
  el: '#main',
  data: {
    message: 'helloss',
    show: true
  },
  methods: {
    toggle: function (self) {
      this.show = !this.show
    }
  }
})

// logged in user's view
var noteboard = new Vue({
  el: '#noteboard',
  data: {
    message: 'hello user!!',
    show: false
  },
  methods: {
    toggle: function (self) {
      this.show = !this.show
    }
  }
})

checkUser()
