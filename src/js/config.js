import { LANGUAGES } from './i18n/locales'

/**
 * Значения параметров Bvi, применяемые при отсутствии пользовательских настроек.
 * @type {Record<string, string|number|boolean>}
 */
const Default = {
  target: '.bvi-open',
  fontSize: 16,
  theme: 'white',
  images: 'grayscale',
  letterSpacing: 'normal',
  lineHeight: 'normal',
  speech: true,
  speechVoice: '',
  fontFamily: 'arial',
  builtElements: false,
  panelFixed: true,
  panelHide: false,
  reload: false,
  lang: 'ru-RU',
  copyright: true,
}

/**
 * Допустимые JavaScript-типы для проверки конфигурации.
 * @type {Record<string, string>}
 */
const DefaultType = {
  target: 'string',
  fontSize: 'number',
  theme: 'string',
  images: '(string|boolean)',
  letterSpacing: 'string',
  lineHeight: 'string',
  speech: 'boolean',
  speechVoice: 'string',
  fontFamily: 'string',
  builtElements: 'boolean',
  panelFixed: 'boolean',
  panelHide: 'boolean',
  reload: 'boolean',
  lang: 'string',
  copyright: 'boolean',
}

/**
 * Регулярные выражения допустимых значений конфигурации.
 * @type {Record<string, string>}
 */
const DefaultOptions = {
  target: '',
  fontSize: '(^[1-9]$|^[1-3][0-9]?$|^39$)',
  theme: '(white|black|blue|brown|green)',
  images: '(true|false|grayscale)',
  letterSpacing: '(normal|average|big)',
  lineHeight: '(normal|average|big)',
  speech: '(true|false)',
  speechVoice: '',
  fontFamily: '(arial|times)',
  builtElements: '(true|false)',
  panelFixed: '(true|false)',
  panelHide: '(true|false)',
  reload: '(true|false)',
  lang: `(${LANGUAGES.join('|')})`,
  copyright: '(true|false)',
}

export {
  Default,
  DefaultOptions,
  DefaultType,
}
