const alerts = document.querySelectorAll('.alert');
for (const alert of alerts) {
  alert.querySelector('.btn-close').addEventListener('click', function () {
    this.parentElement.remove();
  });
}
