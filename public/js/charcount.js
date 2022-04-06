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
