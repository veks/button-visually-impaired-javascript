/** @typedef {import('../i18n').I18n} I18n */

/**
 * Создаёт HTML-контролы воспроизведения речи.
 * @param {I18n} i18n - Локализатор подписей кнопок.
 * @returns {string} HTML-разметка контролов речи.
 */
const getSpeechControlsTemplate = i18n => {
  /**
   * Кнопка управления озвучкой.
   * @param {string} name - Суффикс класса `bvi-speech-*` (`play`, `pause`, `resume`, `stop`).
   * @param {string} key - Ключ подписи в словаре.
   * @param {boolean} [disabled=false] - Кнопка недоступна до начала воспроизведения.
   * @returns {string} HTML кнопки.
   */
  const control = (name, key, disabled = false) => {
    const label = i18n.text(key)
    const state = disabled ? ' disabled' : ''
    const attribute = disabled ? ' disabled' : ''

    return `<button type="button" class="bvi-link bvi-speech-${name}${state}"${attribute} title="${label}">${label}</button>`
  }

  return `
  <div class="bvi-speech-link">
    ${control('play', 'speechPlay')}
    ${control('pause', 'speechPause', true)}
    ${control('resume', 'speechResume', true)}
    ${control('stop', 'speechStop', true)}
  </div>`
}

export { getSpeechControlsTemplate }
