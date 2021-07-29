/**
 * --------------------------------------------------------------------------
 * Button visually impaired (v1.0.0): i18n.js
 * Licensed under MIT (https://github.com/veks/button-visually-impaired-javascript/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

const lang = {
  'ru-RU': {
    'text': {
      'fontSize': 'Размер шрифта',
      'sitColors': 'Цвета сайта',
      'images': 'Изображения',
      'sound': 'Звук',
      'settings': 'Настройки',
      'regularVersionOfTheSite': 'Обычная версия сайта',
      'lineSpacing': 'Межстрочный интервал',
      'standard': 'Стандартный',
      'middle': 'Средний',
      'large': 'Большой',
      'spacingBetweenLetters': 'Интервал между буквами',
      'font': 'Шрифт',
      'sansSerif': 'Без засечек',
      'serif': 'С засечками',
      'built-inElements': 'Встроенные элементы (Видео, карты и тд.)',
      'on': 'Включить',
      'off': 'Выключить',
      'resetSettings': 'Сбросить настройки',
      'plural_0': 'пиксель',
      'plural_1': 'пекселя',
      'plural_2': 'пикселей',
    },
    'voice': {
      'panelOn': 'Версия сайта для слабови́дящий',
      'panelOff': 'Обычная версия сайта',
      'fontSizePlus': 'Размер шрифта увели́чен',
      'fontSizeMinus': 'Размер шрифта уме́ньшен',
      'siteColorBlackOnWhite': 'Цвет сайта черным по белому',
      'siteColorWhiteOnBlack': 'Цвет сайта белым по черному',
      'siteColorDarkBlueOnBlue': 'Цвет сайта тёмно-синим по голубому',
      'siteColorBeigeBrown': 'Цвет сайта кори́чневым по бе́жевому',
      'siteColorGreenOnDarkBrown': 'Цвет сайта зеленым по тёмно-коричневому',
      'imagesOn': 'Изображения включены',
      'imagesOF': 'Изображения выключены',
      'imagesGrayscale': 'Изображения чёрно-белые',
      'speechOn': 'Синтез речи включён',
      'speechOff': 'Синтез речи вы́ключен',
      'lineHeightStandard': 'Межстрочный интервал стандартный',
      'lineHeightMiddle': 'Межстрочный интервал средний',
      'lineHeightLarge': 'Межстрочный интервал большой',
      'LetterSpacingStandard': 'Интервал между буквами стандартный',
      'LetterSpacingMiddle': 'Интервал между буквами средний',
      'LetterSpacingLarge': 'Интервал между буквами большой',
      'fontSansSerif': 'Шрифт без засечек',
      'fontSerif': 'Шрифт с засечками',
      'built-inElementsOn': 'Встроенные элементы включены',
      'built-inElementsOFF': 'Встроенные элементы выключены',
      'resetSettings': 'Установлены настройки по умолча́нию',
      'panelShow': 'Панель открыта',
      'panelHide': 'Панель скрыта',
    }
  },
  'en-US': {
    'text': {
      'panelOn': 'Site version for visually impaired',
      'panelOff': 'Regular version of the site',
      'fontSize': 'Font size',
      'sitColors': 'Site colors',
      'images': 'Images',
      'sound': 'Sound',
      'settings': 'Settings',
      'regularVersionOfTheSite': 'Regular version of the site',
      'lineSpacing': 'Line spacing',
      'standard': 'Standard',
      'middle': 'Middle',
      'large': 'Large',
      'spacingBetweenLetters': 'Spacing between letters',
      'font': 'Font',
      'sansSerif': 'Sans serif',
      'serif': 'Serif',
      'built-inElements': 'Built-in elements (Videos, maps, etc.)',
      'on': 'On',
      'off': 'Off',
      'resetSettings': 'Reset settings',
      'plural_0': 'pixel',
      'plural_1': 'pixel',
      'plural_2': 'pixel',
    },
    'voice': {
      'fontSizePlus': 'Font size increased',
      'fontSizeMinus': 'Minus font size',
      'siteColorBlackOnWhite': 'Site color black on white',
      'siteColorWhiteOnBlack': 'Site color white on black',
      'siteColorDarkBlueOnBlue': 'Site color dark blue on cyan',
      'siteColorBeigeBrown': 'SiteColorBeigeBrown',
      'siteColorGreenOnDarkBrown': 'Site color green on dark brown',
      'imagesOn': 'Images enabled',
      'imagesOF': 'Images disabled',
      'imagesGrayscale': 'Images are black and white',
      'speechOn': 'Synthesis of speech enabled',
      'speechOff': 'Synthesis of speech is disabled',
      'lineHeightStandard': 'Line spacing standard',
      'lineHeightMiddle': 'Line spacing is average',
      'lineHeightLarge': 'Line spacing is large',
      'LetterSpacingStandard': 'Standard letter spacing',
      'LetterSpacingMiddle': 'Letter spacing is average',
      'LetterSpacingLarge': 'Large letter spacing',
      'fontSansSerif': 'Sans serif font',
      'fontSerif': 'Serif font',
      'built-inElementsOn': 'Built-in elements are enabled',
      'built-inElementsOFF': 'Built-in elements are disabled',
      'resetSettings': 'Default settings have been set',
      'panelShow': 'Panel show',
      'panelHide': 'Panel hide',
    }
  }
}

class I18n {
  constructor(options) {
    this._config = options
  }

  t(key) {
    return lang[this._config.lang]['text'][key]
  }

  v(key) {
    return lang[this._config.lang]['voice'][key]
  }

  /*_readFile(url) {
    const request = new Request(url, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      cache: 'default'
    })
    return fetch(request).then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw Error('Error')
      }
    }).then(data => {
      return data
    }).catch(error => {
      console.log(error)
    });
  }*/
}

export default I18n
