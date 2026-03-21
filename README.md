# WEB pro Salony — landing page

Statický one-page web (HTML, CSS, vanilla JS) optimalizovaný pro nasazení na [Netlify](https://www.netlify.com/).

Repozitář: [github.com/webprosalony/webprosalony](https://github.com/webprosalony/webprosalony)

## Git — účet webprosalony (ne jiný)

Tento projekt patří klientovi / účtu **webprosalony**. V repozitáři **není** nic svázaného s jiným GitHub účtem — pokud se při `git push` objevilo jméno jiného uživatele, šlo jen o **uložené heslo/token ve Windows** pro obecnou adresu `github.com`.

V téhle složce je nastaveno:

- `origin` = `https://webprosalony@github.com/webprosalony/webprosalony.git` (Git se má hlásit jako **webprosalony**)
- lokální `user.name` = `webprosalony` (podpis commitů v tomto repu)

### První push (Windows)

1. **Smažte starý přístup k GitHubu**, aby se nepoužil omylem jiný účet:  
   **Ovládací panely** → **Správce přihlašovacích údajů** → **Přihlašovací údaje systému Windows** → vyhledejte **`git:https://github.com`** → **Odstranit**.  
   (Pokud tam máte víc záznamů pro GitHub, smažte ty, které nechcete pro tento projekt používat.)

2. V PowerShellu:

   ```powershell
   cd "C:\Users\Jirka\Projekty\web_DO 4"
   git push -u origin main
   ```

3. Při přihlášení použijte účet **webprosalony**. Heslo na GitHubu už často nefunguje — použijte **[Personal Access Token](https://github.com/settings/tokens)** (účet webprosalony → vygenerovat token s právem na repo) a vložte ho jako „heslo“.

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
