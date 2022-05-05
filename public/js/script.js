document.querySelectorAll(`a[href="${window.location.pathname}"]`)
  .forEach(link => {
    link.classList.add('active');
  });
