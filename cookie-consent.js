(function () {
  var STORAGE_KEY = "wps_cookie_info_v1";

  try {
    if (localStorage.getItem(STORAGE_KEY) === "1") return;
  } catch (e) {
    return;
  }

  var bar = document.createElement("div");
  bar.className = "cookie-bar";
  bar.setAttribute("role", "dialog");
  bar.setAttribute("aria-live", "polite");
  bar.setAttribute("aria-label", "Informace o cookies");

  bar.innerHTML =
    '<div class="cookie-bar__inner">' +
    '<p class="cookie-bar__text"><strong>Cookies.</strong> Na tomto webu nesbíráme žádná data pomocí cookies ani jiných sledovacích nástrojů — nepoužíváme analytiku ani reklamní měření.</p>' +
    '<button type="button" class="cookie-bar__btn">Rozumím</button>' +
    "</div>";

  document.documentElement.classList.add("cookie-bar-open");
  document.body.appendChild(bar);

  bar.querySelector(".cookie-bar__btn").addEventListener("click", function () {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch (e) {}
    document.documentElement.classList.remove("cookie-bar-open");
    bar.remove();
  });
})();
