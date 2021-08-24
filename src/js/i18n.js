/**
 * --------------------------------------------------------------------------
 * Button visually impaired (v1.0.0): i18n.js
 * Licensed under MIT (https://github.com/veks/button-visually-impaired-javascript/blob/master/LICENSE.md)
 * --------------------------------------------------------------------------
 */

const lang = {
  'ru-RU': {
    'text': {
      'fontSize': 'Размер шрифта',
      'siteColors': 'Цвета сайта',
      'images': 'Изображения',
      'speech': 'Синтез речи',
      'settings': 'Настройки',
      'regularVersionOfTheSite': 'Обычная версия сайта',
      'letterSpacing': 'Межбуквенное расстояние',
      'normal': 'Стандартный',
      'average': 'Средний',
      'big': 'Большой',
      'lineHeight': 'Межстрочный интервал',
      'font': 'Шрифт',
      'arial': 'Без засечек',
      'times': 'С засечками',
      'builtElements': 'Встроенные элементы (Видео, карты и тд.)',
      'on': 'Включить',
      'off': 'Выключить',
      'reset': 'Сбросить настройки',
      'plural_0': 'пиксель',
      'plural_1': 'пекселя',
      'plural_2': 'пикселей',
    },
    'voice': {
      'fontSizePlus': 'Размер шрифта увели́чен',
      'fontSizeMinus': 'Размер шрифта уме́ньшен',
      'siteColorBlackOnWhite': 'Цвет сайта черным по белому',
      'siteColorWhiteOnBlack': 'Цвет сайта белым по черному',
      'siteColorDarkBlueOnBlue': 'Цвет сайта тёмно-синим по голубому',
      'siteColorBeigeBrown': 'Цвет сайта кори́чневым по бе́жевому',
      'siteColorGreenOnDarkBrown': 'Цвет сайта зеленым по тёмно-коричневому',
      'imagesOn': 'Изображения включены',
      'imagesOFF': 'Изображения выключены',
      'imagesGrayscale': 'Изображения чёрно-белые',
      'speechOn': 'Синтез речи включён',
      'speechOff': 'Синтез речи вы́ключен',
      'lineHeightNormal': 'Межстрочный интервал стандартный',
      'lineHeightAverage': 'Межстрочный интервал средний',
      'lineHeightBig': 'Межстрочный интервал большой',
      'LetterSpacingNormal': 'Интервал между буквами стандартный',
      'LetterSpacingAverage': 'Интервал между буквами средний',
      'LetterSpacingBig': 'Интервал между буквами большой',
      'fontArial': 'Шрифт без засечек',
      'fontTimes': 'Шрифт с засечками',
      'builtElementsOn': 'Встроенные элементы включены',
      'builtElementsOFF': 'Встроенные элементы выключены',
      'resetSettings': 'Установлены настройки по умолча́нию',
      'panelShow': 'Панель открыта',
      'panelHide': 'Панель скрыта',
      'panelOn': 'Версия сайта для слабови́дящий',
      'panelOff': 'Обычная версия сайта',
    }
  },
  'en-US': {
    'text': {
      'fontSize': 'Font size',
      'siteColors': 'Site colors',
      'images': 'Images',
      'speech': 'Speech synthesis',
      'settings': 'Settings',
      'regularVersionOfTheSite': 'Regular version Of The site',
      'letterSpacing': 'Letter spacing',
      'normal': 'Single',
      'average': 'One and a half',
      'big': 'Double',
      'lineHeight': 'Line spacing',
      'font':'Font',
      'arial': 'Sans Serif - Arial',
      'times': 'Serif - Times New Roman',
      'builtElements': 'Include inline elements (Videos, maps, etc.)',
      'on': 'Enable',
      'off': 'Disabled',
      'reset': 'Reset settings',
      'plural_0': 'pixel',
      'plural_1': 'pixels',
      'plural_2': 'pixels',
    },
    'voice': {
      'fontSizePlus': 'Font size increased',
      'fontSizeMinus': 'Font size reduced',
      'siteColorBlackOnWhite': 'Site color black on white',
      'siteColorWhiteOnBlack': 'Site color white on black',
      'siteColorDarkBlueOnBlue': 'Site color dark blue on cyan',
      'siteColorBeigeBrown': 'SiteColorBeigeBrown',
      'siteColorGreenOnDarkBrown': 'Site color green on dark brown',
      'imagesOn': 'Images enable',
      'imagesOFF': 'Images disabled',
      'imagesGrayscale': 'Images gray scale',
      'speechOn': 'Synthesis speech enable',
      'speechOff': 'Synthesis speech disabled',
      'lineHeightNormal': 'Line spacing single',
      'lineHeightAverage': 'Line spacing one and a half',
      'lineHeightBig': 'Line spacing double',
      'LetterSpacingNormal': 'Letter spacing single',
      'LetterSpacingAverage': 'Letter spacing one and a half',
      'LetterSpacingBig': 'Letter spacing letter double',
      'fontArial': 'Sans Serif - Arial',
      'fontTimes': 'Serif - Times New Roman',
      'builtElementsOn': 'Include inline elements are enabled',
      'builtElementsOFF': 'Include inline elements are disabled',
      'resetSettings': 'Default settings have been set',
      'panelShow': 'Panel show',
      'panelHide': 'Panel hide',
      'panelOn': 'Site version for visually impaired',
      'panelOff': 'Regular version of the site',
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
}

export default I18n
