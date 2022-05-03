/* global bootstrap */
const pushAlert = message => {
  const div = document.createElement('div');
  div.innerHTML = `
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
      <p>${message}</p><button type="button" class="btn-close"
      data-bs-dismiss="alert" aria-label="Close"></button></div>`;
  const alert = new bootstrap.Alert(div.children[0]);
  document.querySelector('.alerts-container').appendChild(alert._element);
};
const ajax = async (url, msg) => {
  const result = await fetch(url, { method: 'POST' });
  if (result.ok) {
    window.location.reload();
  } else {
    pushAlert(msg);
  }
};
const completes = document.querySelectorAll('.btn-finish');
for (const btn of completes) {
  btn.addEventListener('click', function () {
    ajax(
      `/orders/finish?id=${this.dataset.oid}`,
      'Error while completing the order'
    ).then(null, error => {
      console.log(error);
      alert('Fetch error!!');
    });
  });
}
const cancels = document.querySelectorAll('.btn-cancel');
for (const btn of cancels) {
  btn.addEventListener('click', function () {
    ajax(
      `/orders/cancel?id=${this.dataset.oid}`,
      'Error while canceling the order'
    ).then(null, error => {
      console.log(error);
      alert('Fetch error!!');
    });
  });
}
