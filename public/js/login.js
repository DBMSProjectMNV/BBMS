function validateUsername (uname) {
  if (uname.length === 0) {
    return 'empty';
  }
  if (uname.length > 25) {
    return 'too long';
  }
  return /^[a-zA-Z][a-zA-Z\-_0-9]*$/.test(uname) ? false : 'invalid username';
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

function helper (element, validationfn) {
  const ans = validationfn(element.value);
  const err = element.closest('.field').querySelector('.error');
  const label = element.parentElement.classList;
  if (ans) {
    err.innerHTML = `${ans}!!`;
    err.classList.remove('good');
    label.add('invalid');
    label.remove('valid');
  } else {
    err.innerHTML = 'good';
    err.classList.add('good');
    label.add('valid');
    label.remove('invalid');
  }
}

document.querySelector('i.password').addEventListener('click', function () {
  const attr = this.matches('.eye') ? 'text' : 'password';
  this.classList.toggle('eye');
  this.classList.toggle('eye-slash');
  this.parentElement.querySelector('input').setAttribute('type', attr);
});

document.querySelector('input[name="username"]').addEventListener(
  'change',
  function () {
    helper(this, validateUsername);
  }
);

document.querySelector('input[name="password"]').addEventListener(
  'change',
  function () {
    helper(this, validatePassword);
  }
);

const hintq = document.querySelector('textarea[name="hintq"]');
if (hintq) {
  hintq.addEventListener('change', function () {
    helper(this, () => {
      const len = this.value.length;
      if (len === 0) {
        return 'empty';
      }
      if (len > 25) {
        return 'too long';
      }
      return false;
    });
  });
  document.querySelector('textarea[name="ans"]').addEventListener(
    'change',
    function () {
      helper(this, () => {
        const len = this.value.length;
        if (len === 0) {
          return 'empty';
        }
        if (len > 15) {
          return 'too long';
        }
        return false;
      });
    }
  );
}

const alerts = document.querySelectorAll('.alert');
for (const alert of alerts) {
  alert.querySelector('.btn-close').addEventListener('click', function () {
    this.parentElement.remove();
  });
}
