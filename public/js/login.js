/* global helper */
function validateUsername (uname) {
  if (uname.length === 0) {
    return 'empty';
  }
  if (uname.length > 25) {
    return 'too long';
  }
  return /^[a-zA-Z][a-zA-Z\-_0-9 ]*$/.test(uname) ? false : 'invalid username';
}

function validatePassword (pswd) {
  if (pswd.length < 8) {
    return 'too short';
  }
  if (pswd.length > 32) {
    return 'too long';
  }
  return /^[a-zA-Z0-9*!@#$%& \-_]*$/.test(pswd) ? false : 'invalid password';
}

const toggleForm = () => {
  const login = document.querySelector('#login').classList;
  const forgot = document.querySelector('#forgot').classList;
  login.toggle('hidden');
  forgot.toggle('hidden');
};

const ipassword = document.querySelector('i.password');
if (ipassword) {
  ipassword.addEventListener('click', function () {
    const attr = this.matches('.eye') ? 'text' : 'password';
    this.classList.toggle('eye');
    this.classList.toggle('eye-slash');
    this.parentElement.querySelector('input').setAttribute('type', attr);
  });
}
const inpUsername = document.querySelector('input[name="username"]');
if (inpUsername) {
  inpUsername.addEventListener('change', function () {
    helper(this, validateUsername);
  });
}
const inpPassword = document.querySelector('input[name="password"]');
if (inpPassword) {
  inpPassword.addEventListener(
    'change',
    function () {
      helper(this, validatePassword);
    }
  );
}

const toggleLinks = document.querySelectorAll('a.toggleForm');
for (const link of toggleLinks) {
  link.addEventListener('click', toggleForm);
}
if (window.location.hash === '#forgot') {
  toggleForm();
}
