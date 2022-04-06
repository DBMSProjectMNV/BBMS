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
const inpName = document.querySelector('input[name="name"]');
if (inpName) {
  inpName.addEventListener('change', function () {
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
const hintq = document.querySelector('textarea[name="hintq"]');
if (hintq) {
  hintq.addEventListener('change', function () {
    helper(this, () => {
      const len = this.value.length;
      if (len === 0) {
        return 'empty';
      }
      if (len > this.getAttribute('maxlength')) {
        return 'too long';
      }
      return false;
    });
  });
  document.querySelector('textarea[name="answer"]').addEventListener(
    'change',
    function () {
      helper(this, () => {
        const len = this.value.length;
        if (len === 0) {
          return 'empty';
        }
        if (len > this.getAttribute('maxlength')) {
          return 'too long';
        }
        return false;
      });
    }
  );
}
const inpContact = document.querySelector('input[name="contact"]');
if (inpContact) {
  inpContact.addEventListener('change', function () {
    helper(this, () => {
      const contactno = this.value;
      const len = contactno.length;
      if (len === 0) {
        return 'empty';
      }
      if (len !== 10) {
        return '10 digits';
      }
      if (/[^0-9]/.test(contactno)) {
        return 'only numbers allowed';
      }
      return false;
    });
  });
}
const inpAddress = document.querySelector('textarea[name="address"]');
if (inpAddress) {
  inpAddress.addEventListener('change', function () {
    helper(this, () => {
      const address = this.value;
      const len = address.length;
      if (len === 0) {
        return 'empty';
      }
      if (len > this.getAttribute('maxlength')) {
        return 'too long';
      }
      return false;
    });
  });
}
const inpEmail = document.querySelector('input[name="email"]');
if (inpEmail) {
  inpEmail.addEventListener('change', function () {
    helper(this, () => {
      const email = this.value;
      const len = email.length;
      if (len === 0) {
        return 'empty';
      }
      if (len > this.getAttribute('maxlength')) {
        return 'too long';
      }
      if (!/.+@.+\..+/.test(email)) {
        return 'invalid email id';
      }
      return false;
    });
  });
}

const alerts = document.querySelectorAll('.alert');
for (const alert of alerts) {
  alert.querySelector('.btn-close').addEventListener('click', function () {
    this.parentElement.remove();
  });
}

const toggleLinks = document.querySelectorAll('a.toggleForm');
for (const link of toggleLinks) {
  link.addEventListener('click', toggleForm);
}
if (window.location.hash === '#forgot') {
  toggleForm();
}
