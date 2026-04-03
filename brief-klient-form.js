/**
 * Stránka podkladů: podmíněné pole formuláře, doplňkové služby, FormSubmit (bez CAPTCHA / honeypotu).
 */
(function () {
  var form = document.getElementById("briefKlientForm");
  var statusEl = document.getElementById("briefKlientFormStatus");
  var detailRow = document.getElementById("briefFormularDetailRow");
  var detailTa = document.getElementById("briefFormularDetail");
  var REDIRECT_URL = "/thank-you/";

  var DOPLNKY_LABELS = {
    qr_kod: "QR kód na web (zdarma)",
    nfc_karta: "NFC karta (100–200 Kč)",
    nfc_stojanek: "NFC stojánek (250 Kč)",
    vizitky: "Klasické vizitky",
    reklamni_predmety: "Reklamní předměty",
    jine_it: "Jiné IT / software (po domluvě)",
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

  function syncFormularDetail() {
    var checked = form.querySelector('input[name="formular_chci"]:checked');
    var show = checked && checked.value === "ano";
    if (detailRow) {
      detailRow.hidden = !show;
      detailRow.setAttribute("aria-hidden", show ? "false" : "true");
    }
    if (!show && detailTa) detailTa.value = "";
  }

  form.querySelectorAll('input[name="formular_chci"]').forEach(function (r) {
    r.addEventListener("change", syncFormularDetail);
  });
  syncFormularDetail();

  var doplnkyNone = document.getElementById("briefDoplnkyNone");
  var doplnkyOpts = form.querySelectorAll(".brief-doplnky-opt");

  function setDoplnkyOthersDisabled(disabled) {
    doplnkyOpts.forEach(function (cb) {
      cb.disabled = !!disabled;
    });
  }

  function syncDoplnkyNone() {
    if (!doplnkyNone) return;
    if (doplnkyNone.checked) {
      doplnkyOpts.forEach(function (cb) {
        cb.checked = false;
      });
      setDoplnkyOthersDisabled(true);
    } else {
      setDoplnkyOthersDisabled(false);
    }
  }

  function onDoplnkyOptChange() {
    if (!doplnkyNone) return;
    var any = false;
    doplnkyOpts.forEach(function (cb) {
      if (cb.checked) any = true;
    });
    if (any) {
      doplnkyNone.checked = false;
      setDoplnkyOthersDisabled(false);
    }
  }

  if (doplnkyNone) {
    doplnkyNone.addEventListener("change", syncDoplnkyNone);
  }
  doplnkyOpts.forEach(function (cb) {
    cb.addEventListener("change", onDoplnkyOptChange);
  });
  syncDoplnkyNone();

  function validateEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trim(v));
  }

  function collectDoplnkyText() {
    if (doplnkyNone && doplnkyNone.checked) {
      return "Zatím nemám zájem";
    }
    var parts = [];
    doplnkyOpts.forEach(function (cb) {
      if (cb.checked) {
        parts.push(DOPLNKY_LABELS[cb.value] || cb.value);
      }
    });
    return parts.join("; ");
  }

  function doplnkyValid() {
    if (doplnkyNone && doplnkyNone.checked) return true;
    for (var i = 0; i < doplnkyOpts.length; i++) {
      if (doplnkyOpts[i].checked) return true;
    }
    return false;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    setStatus("");

    var prijmeni = trim(form.querySelector('[name="prijmeni"]').value);
    var email = trim(form.querySelector('[name="email"]').value);

    if (prijmeni.length < 2) {
      setStatus("Vyplňte prosím příjmení.");
      form.querySelector('[name="prijmeni"]').focus();
      return;
    }
    if (!validateEmail(email)) {
      setStatus("Zadejte platný e-mail.");
      form.querySelector('[name="email"]').focus();
      return;
    }

    var formularChci = (form.querySelector('input[name="formular_chci"]:checked') || {}).value || "";
    if (!formularChci) {
      setStatus("Vyberte prosím, zda chcete na webu formulář (Ano / Ne).");
      return;
    }

    var fotky = (form.querySelector('input[name="fotky_zpusob"]:checked') || {}).value || "";
    if (!fotky) {
      setStatus("Vyberte prosím způsob dodání fotek.");
      return;
    }

    if (!doplnkyValid()) {
      setStatus("Vyberte prosím doplňkové služby, nebo zaškrtněte „Zatím nemám zájem“.");
      if (doplnkyNone) doplnkyNone.focus();
      return;
    }

    setStatus("Odesílám…", true);

    var payload = {
      _subject: "Podklady pro web – vyplněno klientem",
      _template: "table",
      _captcha: "false",
      prijmeni: prijmeni,
      email: email,
      barvy: trim(form.querySelector('[name="barvy"]').value),
      logo: trim(form.querySelector('[name="logo"]').value),
      o_nas: trim(form.querySelector('[name="o_nas"]').value),
      produkty_sluzby: trim(form.querySelector('[name="produkty_sluzby"]').value),
      formular_ano_ne: formularChci === "ano" ? "Ano, chci" : "Ne, nechci",
      formular_jaky: formularChci === "ano" ? trim(form.querySelector('[name="formular_jaky"]').value) : "",
      socialni_site: trim(form.querySelector('[name="socialni_site"]').value),
      online_katalogy: trim(form.querySelector('[name="online_katalogy"]').value),
      domena: trim(form.querySelector('[name="domena"]').value),
      fotky_zpusob: fotky,
      vlastni_prani: trim((form.querySelector('[name="vlastni_prani"]') || {}).value || ""),
      doplnkove_sluzby: collectDoplnkyText(),
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
