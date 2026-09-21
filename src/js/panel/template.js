/** @typedef {import('../i18n').I18n} I18n */

/**
 * Создаёт HTML-разметку панели настроек.
 * @param {I18n} i18n - Локализатор подписей панели.
 * @param {boolean} [panelHidden=false] - Скрыть панель при создании.
 * @param {boolean} [copyright=true] - Добавить ссылку на проект.
 * @returns {string} HTML-разметка панели.
 */
const getPanelTemplate = (i18n, panelHidden = false, copyright = true) => {
  const panelHide = panelHidden ? ' bvi-panel-hide' : ''
  /**
   * Атрибуты подписи кнопки без текста: `aria-label` и `title` с одним и тем же переводом.
   * @param {string} key - Ключ подписи в словаре.
   * @returns {string} Строка атрибутов для вставки в тег.
   */
  const label = key => `aria-label="${i18n.text(key)}" title="${i18n.text(key)}"`
  /**
   * Атрибуты кнопки-переключателя: подпись и начальное состояние `aria-pressed="false"`.
   * @param {string} key - Ключ подписи в словаре.
   * @returns {string} Строка атрибутов для вставки в тег.
   */
  const toggle = key => `${label(key)} aria-pressed="false"`

  return `
    <div class="bvi-panel${panelHide}" role="region" aria-label="${i18n.text('panelLabel')}">
      <button type="button" class="bvi-link bvi-menu-toggle" data-bvi="menu" aria-expanded="false" aria-controls="bvi-menu">
        <i class="bvi-images bvi-images-bars" aria-hidden="true"></i>
        <span>${i18n.text('menu')}</span>
      </button>
      <div class="bvi-menu" id="bvi-menu">
      <div class="bvi-blocks bvi-block-center">
        <div class="bvi-block" role="group" aria-labelledby="bvi-title-fontSize">
          <div class="bvi-block-title" id="bvi-title-fontSize">${i18n.text('fontSize')}</div>
          <button type="button" class="bvi-link bvi-font-size-minus" ${label('fontSizeMinus')}>А-</button>
          <button type="button" class="bvi-link bvi-font-size-plus" ${label('fontSizePlus')}>А+</button>
        </div>
        <div class="bvi-block" role="group" aria-labelledby="bvi-title-siteColors">
          <div class="bvi-block-title" id="bvi-title-siteColors">${i18n.text('siteColors')}</div>
          <button type="button" class="bvi-link bvi-theme-white" ${toggle('themeWhite')}>Ц</button>
          <button type="button" class="bvi-link bvi-theme-black" ${toggle('themeBlack')}>Ц</button>
          <button type="button" class="bvi-link bvi-theme-blue" ${toggle('themeBlue')}>Ц</button>
          <button type="button" class="bvi-link bvi-theme-brown" ${toggle('themeBrown')}>Ц</button>
          <button type="button" class="bvi-link bvi-theme-green" ${toggle('themeGreen')}>Ц</button>
        </div>
        <div class="bvi-block" role="group" aria-labelledby="bvi-title-images">
          <div class="bvi-block-title" id="bvi-title-images">${i18n.text('images')}</div>
          <button type="button" class="bvi-link bvi-images-on" ${toggle('imagesOn')}>
            <i class="bvi-images bvi-images-image" aria-hidden="true"></i>
          </button>
          <button type="button" class="bvi-link bvi-images-off" ${toggle('imagesOff')}>
            <i class="bvi-images bvi-images-minus-circle" aria-hidden="true"></i>
          </button>
          <button type="button" class="bvi-link bvi-images-grayscale" ${toggle('imagesGrayscale')}>
            <i class="bvi-images bvi-images-adjust" aria-hidden="true"></i>
          </button>
        </div>
        <div class="bvi-block" role="group" aria-labelledby="bvi-title-speech">
          <div class="bvi-block-title" id="bvi-title-speech">${i18n.text('speech')}</div>
          <button type="button" class="bvi-link bvi-speech-off" ${toggle('speechOff')}>
            <i class="bvi-images bvi-images-volume-off" aria-hidden="true"></i>
          </button>
          <button type="button" class="bvi-link bvi-speech-on" ${toggle('speechOn')}>
            <i class="bvi-images bvi-images-volume-up" aria-hidden="true"></i>
          </button>
        </div>
        <div class="bvi-block" role="group" aria-labelledby="bvi-title-settings">
          <div class="bvi-block-title" id="bvi-title-settings">${i18n.text('settings')}</div>
          <button type="button" class="bvi-link" data-bvi="modal" ${label('openSettings')} aria-haspopup="dialog">
            <i class="bvi-images bvi-images-cog" aria-hidden="true"></i>
          </button>
          <button type="button" class="bvi-link" data-bvi="close">
            ${i18n.text('regularVersionOfTheSite')}
          </button>
          <button type="button" class="bvi-link" data-bvi="panel-hide" ${label('hidePanel')}>
            <i class="bvi-images bvi-images-minus" aria-hidden="true"></i>
          </button>
        </div>
      </div>
      </div>
      <div class="bvi-modal">
        <div class="bvi-modal-dialog">
          <div class="bvi-modal-content" role="dialog" aria-modal="true" aria-labelledby="bvi-modal-title">
            <div class="bvi-modal-header">
              <div class="bvi-modal-title" id="bvi-modal-title">${i18n.text('settings')}</div>
              <button type="button" class="bvi-link bvi-modal-close" data-bvi="modal-close" ${label('closeSettings')}>×</button>
            </div>
            <div class="bvi-modal-body">
              <div class="bvi-blocks bvi-block-center">
                <div class="bvi-block" role="group" aria-labelledby="bvi-title-letterSpacing">
                  <div class="bvi-block-title" id="bvi-title-letterSpacing">${i18n.text('letterSpacing')}</div>
                  <button type="button" class="bvi-link bvi-letter-spacing-normal" aria-pressed="false">${i18n.text('normal')}</button>
                  <button type="button" class="bvi-link bvi-letter-spacing-average" aria-pressed="false">${i18n.text('average')}</button>
                  <button type="button" class="bvi-link bvi-letter-spacing-big" aria-pressed="false">${i18n.text('big')}</button>
                </div>
                <div class="bvi-block" role="group" aria-labelledby="bvi-title-lineHeight">
                  <div class="bvi-block-title" id="bvi-title-lineHeight">${i18n.text('lineHeight')}</div>
                  <button type="button" class="bvi-link bvi-line-height-normal" aria-pressed="false">${i18n.text('normal')}</button>
                  <button type="button" class="bvi-link bvi-line-height-average" aria-pressed="false">${i18n.text('average')}</button>
                  <button type="button" class="bvi-link bvi-line-height-big" aria-pressed="false">${i18n.text('big')}</button>
                </div>
                <div class="bvi-block" role="group" aria-labelledby="bvi-title-font">
                  <div class="bvi-block-title" id="bvi-title-font">${i18n.text('font')}</div>
                  <button type="button" class="bvi-link bvi-font-family-arial" aria-pressed="false">${i18n.text('arial')}</button>
                  <button type="button" class="bvi-link bvi-font-family-times" aria-pressed="false">${i18n.text('times')}</button>
                </div>
                <div class="bvi-block" role="group" aria-labelledby="bvi-title-builtElements">
                  <div class="bvi-block-title" id="bvi-title-builtElements">${i18n.text('builtElements')}</div>
                  <button type="button" class="bvi-link bvi-built-elements-on" aria-pressed="false">${i18n.text('on')}</button>
                  <button type="button" class="bvi-link bvi-built-elements-off" aria-pressed="false">${i18n.text('off')}</button>
                </div>
                <div class="bvi-block bvi-block-wide">
                  <label class="bvi-block-title" for="bvi-speech-voice">${i18n.text('speechVoice')}</label>
                  <select class="bvi-select bvi-speech-voice" id="bvi-speech-voice">
                    <option value="">${i18n.text('speechVoiceDefault')}</option>
                  </select>
                </div>
              </div>
              ${copyright ? `<div class="bvi-blocks bvi-block-center">
                <a href="https://bvi.isvek.ru" class="bvi-copyright" target="_blank" rel="noopener noreferrer" aria-label="bvi.isvek.ru, ${i18n.text('openInNewTab')}">bvi.isvek.ru</a>
              </div>` : ''}
            </div>
            <div class="bvi-modal-footer">
              <button type="button" class="bvi-link bvi-reset">${i18n.text('reset')}</button>
              <button type="button" class="bvi-link bvi-modal-dismiss" data-bvi="modal-close">${i18n.text('close')}</button>
            </div>
          </div>
        </div>
      </div>
    </div>`
}

/**
 * Создаёт кнопку показа скрытой панели.
 * @param {I18n} i18n - Локализатор подписи кнопки.
 * @param {boolean} [panelHidden=false] - Признак скрытого состояния панели.
 * @returns {string} HTML-разметка кнопки.
 */
const getPanelShowLinkTemplate = (i18n, panelHidden = false) => {
  const linkHide = panelHidden ? 'bvi-show' : 'bvi-hide'
  const label = i18n.text('showPanel')

  return `
    <button type="button" class="bvi-link bvi-link-fixed-top bvi-no-styles ${linkHide}" data-bvi="panel-show" aria-label="${label}" title="${label}">
      <i class="bvi-images bvi-images-eye bvi-images-size-32 bvi-no-styles" aria-hidden="true"></i>
    </button>`
}

export {
  getPanelShowLinkTemplate,
  getPanelTemplate,
}
