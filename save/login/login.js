AUTH_ENDPOINT = 'https://save.citybuild.io/auth'

var login = new Vue({
  el: '#login',
  methods: {
    login: function () {
      var username = document.getElementById('username').value
      var password = document.getElementById('password').value
      loginPassword(username, password)
    }
  }
})

function checkUser(){
  user = localStorage.getItem('token')
  if(user){
    var loc = window.location.href.split('/')
    loc.pop()
    window.location.href = loc.join("/")
  }
}
checkUser()

function loginPassword(username, password){
  var http = new XMLHttpRequest();
  http.open("POST", AUTH_ENDPOINT, true);

  //Send the proper header information along with the request
  http.setRequestHeader("Content-type", "application/json");

  http.onreadystatechange = function() {//Call a function when the state changes.
      if(http.readyState == 4 && http.status == 200) {
        var resp = request.responseText
        if(!resp.token) return
        localStorage.setItem( 'token' , data.token)
    };
  }

  http.send(JSON.stringify({username: username, password: password}));
}
