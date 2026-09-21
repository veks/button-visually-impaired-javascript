import { locales } from './locales'

const DEFAULT_LANG = 'ru-RU'

/**
 * Предоставляет локализованные тексты и голосовые сообщения интерфейса.
 * @class
 * @classdesc Выбирает словарь по языку и безопасно возвращает сообщения.
 */
class I18n {
  /**
   * Создаёт локализатор.
   * @param {{lang?: string}} options - Параметры локализации; `lang` — код языка из `locales`, иначе русский.
   */
  constructor (options) {
    this._config = options
  }

  /**
   * Возвращает сообщение из выбранного словаря. Неизвестный язык или пропущенный ключ не роняют плагин:
   * берётся русский текст.
   * @private
   * @param {'text'|'voice'} type - Раздел словаря.
   * @param {string} key - Ключ сообщения.
   * @returns {string} Локализованное сообщение.
   */
  _get (type, key) {
    const messages = (this._config.lang && locales[this._config.lang]) || locales[DEFAULT_LANG]

    return key in messages[type] ? messages[type][key] : locales[DEFAULT_LANG][type][key]
  }

  /**
   * Возвращает текстовую подпись интерфейса.
   * @param {string} key - Ключ подписи.
   * @returns {string} Локализованный текст.
   */
  text (key) {
    return this._get('text', key)
  }

  /**
   * Возвращает голосовую подсказку.
   * @param {string} key - Ключ подсказки.
   * @returns {string} Локализованный текст подсказки.
   */
  voice (key) {
    return this._get('voice', key)
  }
}

export default I18n
