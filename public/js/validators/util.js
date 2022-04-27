const { helper } = window;
const inpName = document.querySelector('input[name="name"]');
if (inpName) {
  inpName.addEventListener('change', function () {
    helper(this, name => {
      if (name.length === 0) {
        return 'empty';
      }
      if (name.length > 25) {
        return 'too long';
      }
      return false;
    });
  });
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
