# Button visually impaired

English | [Русский](README.ru.md)

Button visually impaired is a plugin that adds a version of your site for people with low vision. A panel on the site
changes the color scheme, font size and spacing, hides images or turns them gray, and the speech synthesizer reads aloud
every change and any text you mark.

* Font size (up to 39 px), font family (serif or sans serif), letter spacing and line spacing;
* Five high-contrast color schemes; the panel and the settings window follow the selected scheme;
* Images: gray scale or hidden, with a caption from the `alt` text in place of a hidden image;
* Disable embedded elements (videos, maps, etc.);
* Speech synthesizer: reads aloud the changes and any text in a `.bvi-speech` block, highlights the words and lets you choose a voice;
* Interface and speech in 11 languages;
* Works on any screen: on phones and tablets the panel collapses into a menu;
* Accessible: keyboard navigation, a visible focus ring, controls of at least 44×44 px, markup for screen readers;
* Settings are remembered for a day (cookies);
* No dependencies; ES modules, CommonJS and `<script>`, TypeScript types, easy to use with React, Vue and Next.js (`destroy()`, SSR-safe import);
* Modern browsers: Chrome, Edge, Opera, Firefox, Safari (Internet Explorer is not supported).

### Demo

view demo version [here](https://bvi.isvek.ru/demo/).

### NPM

```
$ npm install bvi
```

``` javascript
import Bvi from "bvi"
import "bvi/style" // styles (bvi/dist/css/bvi.min.css)

new Bvi({ target: ".bvi-open" })
```

The package ships ES modules (`import`), CommonJS (`require`) and TypeScript types. `import * as isvek from "bvi"` and
`isvek.Bvi` still work.

The plugin works with the DOM, so create it only in the browser. Server-side rendering is safe: importing the package
does not touch `window` or `document`.

The global variable `isvek` exists only in the `<script>` build (`bvi.min.js`, see [Browser Usage](#browser-usage)). With
`import` or `require` (React, Vue, Next.js, Nuxt, Node) there is no global: use the imports shown here. Do not import files
from `dist/js/` directly, `import "bvi"` picks the right build.

#### React

``` jsx
import { useEffect } from "react"
import Bvi from "bvi"
import "bvi/style"

export function AccessibilityButton() {
  useEffect(() => {
    const bvi = new Bvi({ target: ".bvi-open", lang: "en-US" })

    return () => bvi.destroy() // removes the panel and all listeners, saved settings are kept
  }, [])

  return <button type="button" className="bvi-open">Version for the visually impaired</button>
}
```

Create the instance in `useEffect`, after the trigger button is in the DOM, and call `destroy()` in the cleanup. This is
also safe in React `StrictMode`, where effects run twice in development: the saved settings are kept, so the second
instance restores the state. In Next.js put the component in a client component (`"use client"`).

A reusable hook with TypeScript types:

``` tsx
import { useEffect } from "react"
import Bvi, { type BviOptions } from "bvi"
import "bvi/style"

export function useBvi(options: BviOptions = { target: ".bvi-open" }) {
  const key = JSON.stringify(options) // recreate the plugin only when the options change

  useEffect(() => {
    const bvi = new Bvi(JSON.parse(key))

    return () => bvi.destroy()
  }, [key])
}
```

#### Vue

Vue 3 (`<script setup>`):

``` vue
<script setup lang="ts">
import { onBeforeUnmount, onMounted } from "vue"
import Bvi from "bvi"
import "bvi/style"

let bvi: Bvi | undefined

onMounted(() => {
  bvi = new Bvi({ target: ".bvi-open", lang: "en-US" })
})

onBeforeUnmount(() => bvi?.destroy()) // removes the panel and all listeners, saved settings are kept
</script>

<template>
  <button type="button" class="bvi-open">Version for the visually impaired</button>
</template>
```

`onMounted` does not run on the server, so this is safe with server-side rendering. In Nuxt 3 add the styles once in
`nuxt.config.ts` (`css: ["bvi/style"]`) and create the instance in `onMounted` of a component (or wrap the component in
`<ClientOnly>`).

Vue 2 (Options API):

``` javascript
import Bvi from "bvi"
import "bvi/style"

export default {
  mounted() {
    this.bvi = new Bvi({ target: ".bvi-open" })
  },
  beforeDestroy() {
    this.bvi.destroy()
  },
}
```

The examples above are checked with React 19 and Vue 3.5 in Chromium, Firefox and WebKit: client rendering, `StrictMode`,
unmounting and remounting, and server rendering.

While the plugin is on, it wraps the page content in a `.bvi-body` element; `destroy()` puts everything back. The `target`
selector must match an element that already exists when the instance is created.

#### Sass

Build the styles yourself and change the colors (Sass with `--load-path=node_modules`, or `sass-loader` in webpack):

``` scss
@use "bvi/src/scss/variables" with ($theme-bg-blue: #cfe8ff, $link-border-color: #444);
@use "bvi/src/scss/bvi";
```

The variables are in `src/scss/variables/` (`_panel`, `_themes`, `_buttons`). By default the panel colors follow the
selected color scheme; a value you pass replaces it for every scheme.

#### Runtime CSS variables

The stylesheet also exposes `--bvi-*` properties on `:root`. Theme selection in JavaScript already sets
`data-bvi-theme` on `.bvi-body`, so no JavaScript customization is required: `--bvi-site-bg` and
`--bvi-site-color` automatically resolve to the active theme. Override a theme before or after loading the stylesheet:

```css
:root {
  --bvi-theme-blue-bg: #d7ecff;
  --bvi-theme-blue-color: #073763;
}
```

Panel, link and settings-window tokens are available with the `--bvi-panel-*`, `--bvi-link-*` and
`--bvi-modal-*` prefixes. They default to the colors of the active scheme (`--bvi-site-bg`, `--bvi-site-color`), so the
panel and the settings window change together with the site. Set a token, for example `--bvi-link-border-color`, to fix
its color for every scheme.

### Browser Usage

Download the [latest package](https://github.com/veks/button-visually-impaired-javascript/archive/master.zip). unpack
and inspect the contents. You need to copy the `bvi.min.js` and `bvi.min.css` or their minified variations to your app `dist`
folders as follows. Link the required CSS in your document `<head>` tag

```html

<link href="dist/css/bvi.min.css" rel="stylesheet">
```

Link the required JS in your document at the end of the pages, right before the closing `</body>` tag

```html

<script src="dist/js/bvi.min.js"></script>
```

Run function with default settings

```html

<script>
  new isvek.Bvi();
</script>
```

Run function with your settings

```html

<script>
  new isvek.Bvi({
    target: '.className',
    fontSize: 24,
    theme: 'black'
    //...etc
  });
</script>
```

### Html class

Arbitrary links

```html
<a href="#" class="className">version for visually impaired</a>
```

Speech synthesis

```html

<div class="bvi-speech">
  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
  type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining
  essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
  passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
</div>
```

Hide element

```html

<div class="bvi-hide">The text will be hidden when the plugin is enabled.</div>
```

Show element

```html

<div class="bvi-show">The text will be shown when the plugin is enabled.</div>
```

Disable styles div block

```html

<div class="bvi-no-styles">Plugin styles will not be applied in this block.</div>
```

### Settings

Option | Type | Default value| Value options | Description
------ | ---- | ------- | -------------- | -----------
target | string |  '.bvi-open' | '.className' | Plugin initialization class |
fontSize | number |  16 | 1-39 | Font size  |
theme | string |  'white' |  (`white`&#124;`black`&#124;`blue`&#124;`brown`&#124;`green`) | Color spectrum |
images |(string&#124;boolean) | 'grayscale' |  (`true`&#124;`false`&#124;`grayscale`) | Adapting images |
letterSpacing | string | 'normal' | (`normal`&#124;`average`&#124;`big`) | Letter spacing |
lineHeight | string | 'normal' | (`normal`&#124;`average`&#124;`big`) | Line spacing |
speech | boolean | true | (`true`&#124;`false`) | Speech synthesis |
fontFamily | string | 'arial' |  (`arial`&#124;`times`) | Fonts |
builtElements | boolean | false | (`true`&#124;`false`) | Inline elements are a component of an HTML element that allows you to embed documents, videos, maps, and interactive media into a page.|
panelFixed | boolean | true | (`true`&#124;`false`) | Fixing the panel for the visually impaired at the top of the page. |
panelHide | boolean | false | (`true`&#124;`false`) | Hides the panel for the visually impaired and shows the panel icon. |
reload | boolean | false | (`true`&#124;`false`) | Enable / Disable page reload when switching to the regular version of the site. |
lang | string | 'ru-RU' | (`ru-RU`&#124;`en-US`&#124;`es-ES`&#124;`de-DE`&#124;`fr-FR`&#124;`pt-BR`&#124;`it-IT`&#124;`tr-TR`&#124;`pl-PL`&#124;`zh-CN`&#124;`ja-JP`) | Interface and speech language: Russian, English, Spanish, German, French, Brazilian Portuguese, Italian, Turkish, Polish, Simplified Chinese, Japanese. |
copyright | boolean | true | (`true`&#124;`false`) | Shows the link to bvi.isvek.ru in the settings window. Set `false` to hide it. |

### Methods

Method | Description
------ | -----------
`destroy()` | Removes the panel, the wrapper and all listeners from the page. Saved settings (cookies) are kept, so a new instance restores the previous state. Call it when a component unmounts (React, Vue, ...).

### Keyboard

* `Tab` / `Shift+Tab` — move between the controls (all of them are native `<button>` elements).
* `←` `→` `↑` `↓` — move between the buttons of the panel, of the settings window or of the speech controls (wraps around). `Home` / `End` — first / last button.
* `Space` / `Enter` — press the button. `Esc` — close the settings window (focus returns to the button that opened it).

### Changelog

#### 2.0.0

**Breaking changes**

* Internet Explorer and other legacy browsers are no longer supported. Babel targets `defaults and supports es6-module, not dead`; polyfills, `core-js` and `regenerator-runtime` are gone. `bvi.min.js` is about 62 KB (16.6 KB gzipped) including all 11 languages.
* The panel controls are native `<button type="button">` elements instead of `<a href="#" role="button">`. Custom CSS that targets `a.bvi-link` must target `.bvi-link`.
* The icons are Font Awesome Free 7.3.1 (Solid), inlined into the CSS (data URI) and drawn with a CSS `mask`, so they take the button text color in every color scheme. The `dist/img` folder is no longer published.
* The font size buttons are renamed to follow the other class names: `.bvi-fontSize-minus` / `.bvi-fontSize-plus` are now `.bvi-font-size-minus` / `.bvi-font-size-plus`. Update custom CSS or scripts that target them.
* The panel has white buttons with a border in the text color and a filled active button instead of neutral gray fills. Button text is 16px instead of 14px and the gap between buttons is at least 8px. The panel and the settings window follow the selected color scheme ("Site colors"), so a dark scheme no longer leaves a bright white panel on the page. Their colors default to `--bvi-site-bg` and `--bvi-site-color`; the Sass variables (`$panel-*`, `$link-*`, the new `$panel-accent`, `$panel-accent-strong` and `$link-active-border-color`) still override them.
* The `$breakpoint-*` Sass variables now mean the minimum viewport width (mobile-first) instead of the maximum. Below `$breakpoint-desktop` (78rem) the groups are collapsed behind a "Menu" button.
* All sizes are in `rem` instead of `px`. The font size of the page is set relative to the root font size (`html.bvi-active { font-size: 100% }`), so it follows the browser's font size setting.

**Added**

* `destroy()` method, ES module (`import`) and CommonJS (`require`) builds, the `exports` map, TypeScript types, `import "bvi/style"`, SSR-safe import. Usage docs for React, Next.js, Vue and Sass.
* Captions instead of hidden images: the `alt` text (`Image: ...`) or "Image without description". Decorative images (`alt=""`) get no caption.
* Accessibility: `role="region"`, `role="group"`, `aria-label`, `aria-pressed` and `role="dialog"` markup; a visible focus ring; controls of at least 44×44 px; a 3:1 border contrast; readable disabled speech buttons; a clearly visible selected state (filled with the text color, a light inner ring, inverted icon) that differs from hover; a fixed panel never covers the target of an anchor (`scroll-padding-top`); focus trap, `Esc` and focus return in the settings window; arrow keys, `Home` and `End` navigation.
* Interface and speech languages: Russian, English, Spanish, German, French, Brazilian Portuguese, Italian, Turkish, Polish, Simplified Chinese and Japanese (`lang` option). The translations are JSON files in `src/js/i18n/locales/`.
* The `copyright` option: `false` hides the link to bvi.isvek.ru in the settings window. The link now announces that it opens in a new tab.
* On phones and tablets (below `$breakpoint-desktop`) the groups are collapsed behind a "Menu" button that opens smoothly and respects `prefers-reduced-motion`.
* Sass variables are split into `variables/`, `mixins/` and `functions/` and can be overridden with `@use ... with (...)`.
* A test page with ready-made scenarios and every kind of form control and page element (`test/index.html`), plus browser E2E tests in Chromium, Firefox and WebKit (`e2e/`); an ESLint flat config.

**Fixed**

* Speech: `Play → Pause → Continue` no longer resets the state and stops working (the status timer, `cancel()` after `pause()` and events of cancelled phrases).
* The plugin CSS changed `html { font-size }` and `box-sizing` on every page, even when the plugin was turned off.
* Line spacing, letter spacing and the font now reach elements that set their own values (headings and others).
* Elements with a background image were hidden completely; now only the image is removed.
* The panel jumped when it became fixed on scroll (the content below shifted up); it now keeps its place and slides in smoothly (no animation with `prefers-reduced-motion`).
* The panel fell back to a serif font; the settings window title was too small; text selection colors did not apply in the color schemes; broken and dead CSS rules were removed.
* `bvi.min.css` was built from the previous `bvi.css`; `package.json` `files` skipped nested folders.
* The panel failed to open in browsers where `speechSynthesis` has no `addEventListener` (older Safari); repeated initialization no longer duplicates handlers.
* Typos and untranslated strings in the English texts.

#### 1.0.0

* new version created JavaScript

### License

[MIT License](https://github.com/veks/button-visually-impaired-javascript/blob/master/LICENSE.md)
