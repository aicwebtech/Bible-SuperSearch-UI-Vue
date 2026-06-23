# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

The Bible SuperSearch web client, being rebuilt with Vue 3 (Composition API, `<script setup>`) + Vuetify 3. It is an **embeddable widget**, not a standalone SPA: the built bundle is dropped into a host page (WordPress/Joomla) that talks to the Bible SuperSearch REST API. Still an early work-in-progress stub — many views/skins are placeholders.

## Commands

```sh
npm install
npm run dev          # Vite dev server (vite --host, exposed on LAN)
npm run build        # Build, then COPY dist/* into ../ui-wordpress/com_test/js/vue-app (see note)
npm run test:unit    # Vitest (jsdom). Add `run` for one-shot: npx vitest run
npm run lint         # eslint . --fix
npm run format       # prettier --write src/
npm run test:e2e     # Playwright e2e. CI runs this on push/PR.
```

- Single unit test: `npx vitest run src/components/__tests__/HelloWorld.spec.js` or filter by name `npx vitest -t "renders properly"`.
- **`npm run build` has a side effect outside this repo**: it copies the output into the sibling WordPress plugin directory. Use `vite build` directly if you only want the bundle.

## Architecture

### Bootstrap & embedding (the key thing to understand)

- The real entry point is **`src/BibleSuperSearch.js`**, not `main.js`. `main.js` just imports it, and most of `main.js`/`create_app.js` is commented-out scratch.
- On load, `BibleSuperSearch.js` reads two **globals off `window`** (set by the host page; locally by `config.js`, loaded via `<script>` in `index.html`):
    - `biblesupersearch_config_options` — merged over `src/config-default.js` (`apiUrl`, `interface`, `target`).
    - `biblesupersearch_statics` — optional pre-loaded API metadata. If absent, it's fetched from `${apiUrl}/api/statics` via axios before the app mounts.
- `createBibleSuperSearchApp(target, config)` creates the Vue app, installs Vuetify + Pinia, **`provide()`s `config` and `statics`**, and mounts to `#${target}` (default `#biblesupersearch_container`).
- Components consume config/statics with `inject('config')` / `inject('statics')` — not props, not a store.

### Interface selection

- `src/App.vue` renders a single dynamic "interface" component chosen by **name** from `config.interface`, resolved against the registry in `src/views/index.js`.
- Interfaces come in two flavors, both re-exported through `views/index.js`:
    - **skins** (`src/views/skins/`) — full app UIs (`AppView`, `StudyView`, `FormSelect`).
    - **widgets** (`src/views/widgets/`) — small embeddable pieces (e.g. `RandomVerse`).
- If statics failed to load, `App.vue` falls back to `views/errors/` components. To add an interface, create the `.vue` file and export it from the relevant `index.js`.

### Data & state

- API calls are made with **axios directly inside components** (see `RandomVerse.vue`), using `inject('config').apiUrl`. There is no central API client yet.
- Pinia is installed; `src/stores/counter.js` is the scaffold example, not real state.
- `vue-i18n` is a dependency but **not yet wired up** — no `createI18n` call, no locale files, no `useI18n()` usage in `src/`. Adding it means installing the plugin in `BibleSuperSearch.js` (alongside Vuetify/Pinia) and creating locale messages.

### Routing (planned)

There is **no router yet** — `App.vue` swaps a single interface component by name (see above), with no URL involvement. The intended approach is **hash-based routing** (e.g. `vue-router` with `createWebHashHistory`), mirroring the legacy Enyo.js version of this app. Hash mode is the right fit here because the app is embedded in a host page where it doesn't control server-side paths.

### Conventions

- Path alias `@` → `src/` (configured in `vite.config.js` and `jsconfig.json`).
- Vuetify uses the MDI icon set (`mdi-*`); custom theme is set up in `BibleSuperSearch.js` (`light` default).
- Unit tests live in `src/**/__tests__/`; e2e specs in `e2e/` (excluded from Vitest). The current `e2e/example.spec.js` is the Playwright placeholder pointing at playwright.dev — replace before relying on it.

### Library mode (planned, currently disabled)

`vite.config.js` contains a `build.__lib` block (intentionally prefixed with `__` to disable it) for eventually publishing this as an importable `BibleSuperSearch` library. Stable asset filenames (no hashes) are already configured to suit the host-page embedding.
