# Eventify-web – Event Management Website

A modern, responsive event management website where users can explore upcoming events, view details and register. Built with **HTML5, CSS3 and vanilla JavaScript** (no frameworks).

- **Live website:** _paste your GitHub Pages / Netlify / Vercel link here_
- **Author:** _your name_
- **GitHub repository:** https://github.com/24051959-blip/Eventify-web

## Features

**Core requirements**
- Hero section introducing the platform
- Featured events row and a full list of upcoming events
- Event cards showing image, name, date, venue and short description
- Search by name, venue or topic, plus category filters (Tech, Workshop, Music, Talks, Competition)
- Event detail pop-up with full description and a registration form
- Registration form fields: name, email, phone and selected event
- JavaScript validation with clear error messages
- Confirmation message after successful registration
- Fully responsive for mobile, tablet and desktop

**Bonus features**
- Dark / light mode (follows system setting, remembers your choice)
- Countdown timers: a live clock for the next event in the hero, and a "time left" label on every card
- Animations and smooth transitions (disabled automatically for users who prefer reduced motion)
- Local Storage: registrations are saved in the browser and shown under "My registrations", where they can be cancelled

## Validation rules
| Field | Rule |
|---|---|
| Name | 2–50 characters, letters, spaces and . ' - only |
| Email | Must be in a valid format, e.g. name@example.com |
| Phone | 10-digit Indian mobile number starting with 6–9 (optional +91) |
| Event | Must be selected |
| Duplicate | The same email cannot register twice for the same event |

## Project structure
```
index.html        Page structure, hero, sections, modal and form
style.css         Design tokens (CSS variables), layout, dark theme, responsive rules
script.js         Event data, rendering, search/filter, validation, timers, storage, theme
images/           One illustration per event (event-1.svg … event-8.svg)
README.md         Project documentation
```

## How it works
1. Events are stored in the `EVENTS` array in `script.js`. Edit it to add or change events (name, category, date, venue, image, descriptions, `feat: true` for featured).
2. `renderFeatured()` and `renderGrid()` build the cards. The grid respects the selected category and the search text.
3. Clicking a card opens a native `<dialog>` with the event details and the registration form.
4. `validate()` checks every field. Errors appear under the field and focus moves to the first error.
5. A valid submission is saved to `localStorage` (key `eventify-regs`) and a confirmation screen is shown.
6. A one-second timer updates the hero countdown and the "time left" labels.
7. The theme is stored in `localStorage` (key `eventify-theme`) and applied through a `data-theme` attribute on the page.

## Run locally
Open `index.html` in a browser. Keep the `images` folder next to it.

## Deploy with GitHub Pages
1. Push the project to a GitHub repository.
2. Go to **Settings → Pages**.
3. Under *Branch*, choose `main` and `/ (root)`, then **Save**.
4. After a minute or two, the site is live at `https://<your-username>.github.io/Eventify-web/`.

Netlify and Vercel also work: import the repository, no build command is needed.

## Git workflow
```
git init
git add .
git commit -m "Add Eventify event management website"
git branch -M main
git remote add origin https://github.com/<your-username>/Eventify-web.git
git push -u origin main
```

## Testing
Checked in Chromium at 375 px (phone), 768 px (tablet) and 1366 px (desktop): no horizontal scrolling, and search, category filters, form validation, confirmation message, Local Storage and dark mode all work.

## Notes
- Event images are placeholder illustrations. Replace them with real photos by saving files with the same names, or by changing the `img` path in `script.js`.
- Registrations stay in the visitor's own browser. There is no backend.
- Event dates are sample data. Update them in `script.js` if they have passed (past events are hidden automatically).

## Technologies
HTML5 · CSS3 (custom properties, grid, flexbox, media queries) · JavaScript (ES6) · Google Fonts (Bricolage Grotesque, Figtree)
