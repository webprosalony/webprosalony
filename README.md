# WEB pro Salony — landing page

Statický one-page web (HTML, CSS, vanilla JS) optimalizovaný pro nasazení na [Netlify](https://www.netlify.com/).

## Nasazení

1. Nahrajte složku do Netlify (drag & drop nebo Git).
2. V Netlify zapněte **Form detection** — formulář `poptavka` se zaregistruje automaticky díky `data-netlify="true"`.
3. V **Site settings → Forms** můžete zapnout e-mailová upozornění na nové odeslání.

## PageSpeed

- Malý JS, žádný framework.
- Hero obrázek má `srcset` a rozumnou kompresi; pro ještě vyšší skóre nahraďte obrázek vlastním WebP a hostujte ho lokálně nebo přes CDN s cachingem.
- Fonty: Google Fonts s `display=swap` (případně později self-host subset pro +několik bodů).

## Soubory

- `index.html` — obsah a SEO meta tagy
- `styles.css` — styly, mobile first
- `script.js` — plynulé scrollování ke kotvám
- `thank-you.html` — stránka po odeslání formuláře
- `ukazka-kadernictvi.html` + `ukazka-kadernictvi.css` — ukázková podstránka fiktivního kadeřnictví
