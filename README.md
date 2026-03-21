# WEB pro Salony — landing page

Statický one-page web (HTML, CSS, vanilla JS) optimalizovaný pro nasazení na [Netlify](https://www.netlify.com/).

Repozitář: [github.com/webprosalony/webprosalony](https://github.com/webprosalony/webprosalony)

## Git — první push (Windows)

Lokální složka je už Git repozitář s větví **`main`** a prvním commitem. Na GitHub musíte pushnout **účtem, který vlastní `webprosalony/webprosalony`**.

Pokud dostanete chybu *Permission denied* nebo *403* (např. přihlášen jiný účet než `webprosalony`):

1. Otevřete **Správce přihlašovacích údajů Windows** → **Přihlašovací údaje systému Windows** → `git:https://github.com` → **Odstranit** (nebo upravte údaje).
2. Znovu ve složce projektu spusťte: `git push -u origin main`
3. Při výzvě se přihlaste jako **webprosalony** (nebo použijte [Personal Access Token](https://github.com/settings/tokens) místo hesla).

## Hosting — aktualizace přes `git pull`

Na serveru (nebo ve složce, kterou hosting čte jako veřejný kořen webu):

```bash
git clone https://github.com/webprosalony/webprosalony.git
cd webprosalony
```

**Kořen webu** = tato složka (`index.html` leží přímo v kořeni repozitáře).

Další aktualizace:

```bash
cd webprosalony
git pull origin main
```

(Pokud hosting podporuje nasazení z Gitu přímo z GitHubu, stačí propojit repozitář a větev `main` — bez ručního `pull` na serveru.)

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
