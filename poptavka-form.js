/**
 * Poptávka z úvodní stránky — stejný kanál jako podklady: FormSubmit → info@ulovklienty.cz
 */
(function () {
  var form = document.getElementById("poptavkaForm");
  var statusEl = document.getElementById("poptavkaFormStatus");
  var REDIRECT_URL = "/thank-you/";

  var TYP_SALONU = {
    kadernictvi: "Kadeřnictví",
    kosmetika: "Kosmetika",
    nehty: "Nehtové studio",
    masaz: "Masáže / wellness",
    jine: "Jiný beauty provoz",
  };

  if (!form) return;

  function setStatus(text, ok) {
    if (!statusEl) return;
    statusEl.textContent = text || "";
    statusEl.style.color = ok ? "var(--accent)" : "tomato";
  }

  function trim(s) {
    return (s || "").toString().trim();
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    setStatus("");

    var jmeno = trim(form.querySelector('[name="jmeno"]').value);
    var telefon = trim(form.querySelector('[name="telefon"]').value);
    var typVal = (form.querySelector('[name="typ_salonu"]') || {}).value || "";

    if (jmeno.length < 2) {
      setStatus("Vyplňte prosím jméno.");
      form.querySelector('[name="jmeno"]').focus();
      return;
    }
    if (telefon.length < 9) {
      setStatus("Vyplňte prosím platné telefonní číslo.");
      form.querySelector('[name="telefon"]').focus();
      return;
    }
    if (!typVal) {
      setStatus("Vyberte typ salonu.");
      form.querySelector('[name="typ_salonu"]').focus();
      return;
    }

    setStatus("Odesílám…", true);

    var payload = {
      _subject: "WEB pro Salony – poptávka z úvodní stránky",
      _template: "table",
      _captcha: "false",
      jmeno: jmeno,
      telefon: telefon,
      typ_salonu: TYP_SALONU[typVal] || typVal,
    };

    fetch("https://formsubmit.co/ajax/info@ulovklienty.cz", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    })
      .then(function (res) {
        if (!res.ok) throw new Error("fail");
        return res.json();
      })
      .then(function () {
        window.location.href = REDIRECT_URL;
      })
      .catch(function () {
        setStatus(
          "Odeslání se nezdařilo. Napište prosím na info@ulovklienty.cz nebo zavolejte +420 719 756 746."
        );
      });
  });
})();
