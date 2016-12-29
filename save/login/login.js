AUTH_ENDPOINT = 'http://0.0.0.0:3000/auth'

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

function loginPassword(username, password){
  var http = new XMLHttpRequest();
  http.open("POST", AUTH_ENDPOINT, true);

  //Send the proper header information along with the request
  http.setRequestHeader("Content-type", "application/json");
  http.setRequestHeader('Access-Control-Allow-Origin', '*')

  http.onreadystatechange = function() {//Call a function when the state changes.
      if(http.readyState == 4 && http.status == 200) {
          alert(http.responseText);
      }
  }
  http.send(JSON.stringify({username: username, password: password}));

};
