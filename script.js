/**
 * Plynulé scrollování ke kotvám. Poptávkový formulář odesílá poptavka-form.js (FormSubmit).
 */
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    var id = this.getAttribute('href');
    if (id.length > 1) {
      var el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        el.focus({ preventScroll: true });
      }
    }
  });
});
