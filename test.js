class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  get name() {
    return this.username;
  }

  get pass() {
    throw "you are not allowed to get password";
  }

  authenticate_user(callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://examples.com/api/user/authenticate?username=${this.username}&password=${this.password}`, true);
    xhr.responseType = 'json';

    xhr.onload = function() {
      if (xhr.status === 200) {
        callback(xhr.response);
      } else {
        callback({ error: 'Authentication failed' });
      }
    };

    xhr.onerror = function() {
      callback({ error: 'Network error' });
    };

    xhr.send();
  }
}

$('form #login').click(function (event) {
  event.preventDefault();

  const username = $('#username').val();
  const password = $('#password').val();

  const user = new User(username, password);
  user.authenticate_user(function(res) {
    if(res === true) {
      document.location.href = '/home';
    } else {
      alert(res.error);
    }
  });
});
