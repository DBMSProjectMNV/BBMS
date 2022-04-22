const toggleAccordion = function () {
  const classes = this.parentElement.classList;
  const body = this.parentElement.querySelector('.accordion-body');
  if (classes.contains('collapse')) {
    // expand it
    const evtListener = () => {
      body.removeEventListener('transitionend', evtListener);
      body.style.height = null;
      classes.remove('collapse');
    };
    const { scrollHeight } = body;
    body.style.height = `${scrollHeight}px`;
    body.addEventListener('transitionend', evtListener);
  } else {
    // collapse it
    const { scrollHeight } = body;
    const { transition } = body.style;
    body.style.transition = '';
    requestAnimationFrame(() => {
      body.style.height = `${scrollHeight}px`;
      body.style.transition = transition;

      requestAnimationFrame(() => {
        body.style.height = `${0}px`;
        classes.add('collapse');
        body.style.height = null;
      });
    });
  }
};

document.querySelectorAll('.accordion-header').forEach(toggler => {
  toggler.addEventListener('click', toggleAccordion);
});
const alerts = document.querySelectorAll('.alert');
for (const alert of alerts) {
  alert.querySelector('.btn-close').addEventListener('click', function () {
    this.parentElement.remove();
  });
}
