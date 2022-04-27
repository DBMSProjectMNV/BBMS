window.helper = (element, validationfn) => {
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
};
function count (element) {
  const output = element.closest('.field').querySelector('.counter');
  const str = `${element.value.length}/${element.getAttribute('maxlength')}`;
  output.innerHTML = str;
}

const counters = document.querySelectorAll('span.counter');
for (const span of counters) {
  const input = span.closest('.field').querySelector('input') ||
    span.closest('.field').querySelector('textarea');
  input.addEventListener('keyup', function () {
    count(this);
  });
  count(input);
}
const edits = document.querySelectorAll('i.suffix-btn.edit');
for (const edit of edits) {
  edit.addEventListener('click', function () {
    let ele = this.parentElement.querySelector('input');
    if (!ele) {
      ele = this.parentElement.querySelector('textarea');
    }
    const counter = this.closest('.field').querySelector('.counter');
    if (counter) {
      counter.classList.remove('hidden');
    }
    ele.removeAttribute('readonly');
    this.remove();
  });
}
