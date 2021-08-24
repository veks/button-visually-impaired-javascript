# Button visually impaired

Button visually impaired - is a plugin that automatically changes the visually impaired version of your site. The panel
on the site for the visually impaired allows the color scheme of the site, font sizes, the synthesizer reads aloud
settings changes. Thanks to it, you can use the functions of the site that meet the needs of people with disabilities.

* Change the font size (up to 200%);
* Change the color scheme of the site;
* Change the font of the site (serif or sans serif);
* Change the image (gray scale, hide the image);
* Change letter spacing (kerning);
* Change line spacing;
* Automatically set Alt tag to all site images;
* Speech synthesizer will read aloud changes to display settings;
* Disable embedded elements (videos, maps, etc.);
* Play text to voice;
* Support for browsers Chrome, Firefox, Safari, Microsoft Edge, Opera;

### Demo

view demo version [here](https://bvi.isvek.ru/demo/).

### NPM

```
$ npm install bvi
```

``` javascript
import bvi from "bvi"
```
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
lang | string | 'ru-RU' | (`'ru-RU'`&#124;`'en-US')`| Language |

### Changelog

#### 1.0.0

* new version created JavaScript

### License

[MIT License](https://github.com/veks/button-visually-impaired-javascript/blob/master/LICENSE.md)
