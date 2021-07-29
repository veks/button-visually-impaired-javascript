/**
 * --------------------------------------------------------------------------
 * Button visually impaired (v1.0.0): bvi.js
 * Licensed under MIT (https://github.com/veks/button-visually-impaired-javascript/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

import {
  plural,
  checkConfig,
  stringToBoolean,
  wrapInner,
  unwrap,
  getKey,
} from './util'

import {
  setCookie,
  getCookie,
  removeCookie,
} from './util/cookie'

import I18n from "./i18n"

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const Default = {
  target: '.bvi-open',
  fontSize: 16,
  theme: 'white',
  images: 'grayscale',
  letterSpacing: 'normal',
  lineHeight: 'normal',
  speech: true,
  fontFamily: 'arial',
  builtElements: false,
  fixedPanel: true,
  panelHide: false,
  reloadPage: false,
  lang: 'ru-RU',
}

const DefaultType = {
  target: 'string',
  fontSize: 'number',
  theme: 'string',
  images: '(string|boolean)',
  letterSpacing: 'string',
  lineHeight: 'string',
  speech: 'boolean',
  fontFamily: 'string',
  builtElements: 'boolean',
  fixedPanel: 'boolean',
  panelHide: 'boolean',
  reloadPage: 'boolean',
  lang: 'string',
}

const DefaultOptions = {
  target: '',
  fontSize: '([1-3][0-9])',
  theme: '(white|black|blue|brown|green)',
  images: '(true|false|grayscale)',
  letterSpacing: '(normal|average|big)',
  lineHeight: '(normal|average|big)',
  speech: '(true|false)',
  fontFamily: '(arial|times)',
  builtElements: '(true|false)',
  fixedPanel: '(true|false)',
  panelHide: '(true|false)',
  reloadPage: '(true|false)',
  lang: '(ru-RU|en-US)',
}

const synth = window.speechSynthesis
const supportSynthBrowser = !(typeof synth === 'undefined')

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */
class Bvi {
  constructor(options = {}) {
    this._config = this._getConfig(options)
    this._target = document.querySelectorAll(this._config.target)
    this._breakpoint = {
      'sm': 576,
      'md': 768,
      'lg': 992,
      'xl': 1200,
      'xxl': 1400,
    }

    this._i18n = new I18n({
      lang: this._config.lang
    });

    if (!this._target) {
      return false
    }

    console.log('Bvi console: ready Button visually impaired v2.1.0')

    this._target.forEach(target => {
      target.addEventListener('click', event => {
        event.preventDefault()

        if (typeof getCookie('panelActive') !== 'undefined') {
          return false
        }

        setCookie('panelActive', true)

        getKey(this._config, key => {
          setCookie(key, this._config[key])
        })

        this._speech(`${this._i18n.v('panelOn')}`)
        this._init()
      }, false)
    })

    this._init()
  }

  // Private

  _init() {
    let selectorBviBody = document.querySelector('.bvi-body')
    const panelActive = stringToBoolean(getCookie('panelActive'))
    this._target.forEach(element => element.style.display = 'none')

    getKey(this._config, key => {
      if (typeof getCookie(key) === 'undefined') {
        removeCookie('panelActive')
      }
    })

    if (panelActive) {
      wrapInner(document.body, 'div', 'bvi-body')
      this._setSettings()
      this._getPanel()
      this._btn()
      this._images()
      this._speechPlayer()

      if (supportSynthBrowser && stringToBoolean(getCookie('speech'))) {
        setInterval(() => {
          if (synth.pending === false) {
            let play = document.querySelectorAll('.bvi-speech-play')
            let pause = document.querySelectorAll('.bvi-speech-pause')
            let resume = document.querySelectorAll('.bvi-speech-resume')
            let stop = document.querySelectorAll('.bvi-speech-stop')
            const el = (elements, callback) => {
              elements.forEach(element => {
                return callback(element)
              })
            }

            el(play, element => element.classList.remove('disabled'))
            el(pause, element => element.classList.add('disabled'))
            el(resume, element => element.classList.add('disabled'))
            el(stop, element => element.classList.add('disabled'))
          }
        }, 1000)
      }

      document.body.classList.add('bvi-active')
      let selectorBviPanel = document.querySelector('.bvi-panel').classList
      const scroll = () => {
        let scroll = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop

        if (this._config.fixedPanel && selectorBviPanel) {
          if (scroll > 200) {
            selectorBviPanel.add('bvi-fixed-top')
          } else {
            selectorBviPanel.remove('bvi-fixed-top')
          }
        }
      }

      window.addEventListener('scroll', scroll)
      scroll()
    } else {
      this._target.forEach(element => element.style.display = 'block')

      this._speech(`${this._i18n.v('panelOff')}`)
      document.querySelectorAll('img').forEach(element => {
        if (element.classList.contains('bvi-img')) {
          element.classList.remove('bvi-img')
        }
      })

      document.querySelectorAll('body *').forEach(element => {
        if (element.classList.contains('bvi-background-image')) {
          element.classList.remove('bvi-background-image')
        }
      })

      removeCookie('panelActive')
      unwrap(selectorBviBody)

      Object.keys(this._config).forEach(key => {
        removeCookie(key)
      })

      this._speechPlayer()

      document.body.classList.remove('bvi-active')

      if (this._config.reloadPage) {
        document.location.reload()
      }
    }
  }

  _setSettings() {
    for (let key in this._config) {
      if ('target' === key || 'reloadPage' === key || 'fixedPanel' === key || 'panelHide' === key) {
        continue
      }

      if (this._config.hasOwnProperty(key)) {
        this._setAttrDataBviBody(key, getCookie(key))
      }
    }
  }

  _setAttrDataBviBody(name = '', value = '') {
    document.querySelector('.bvi-body').setAttribute(`data-bvi-${name}`, value)
  }

  _getPanel() {
    let div = document.createElement('div')
    let btnFixed = document.createElement('div')
    let panelHide = stringToBoolean(getCookie('panelHide')) ? ' bvi-panel-hide' : ''
    let fontSize = plural(getCookie('fontSize'), [`${this._i18n.t('plural_0')}`, `${this._i18n.t('plural_1')}`, `${this._i18n.t('plural_2')}`])

    div.setAttribute('class', `bvi-panel${panelHide}`)
    div.innerHTML = `
    <div class="bvi-block-settings">
        <div class="bvi-blocks bvi-block-center">
            <div class="bvi-block">
               <h1>${this._i18n.t('fontSize')} <span class="bvi-fontSize">${fontSize}</span></h1>
                <a href="#" class="bvi-btn" data-bvi-btn-fontSize="minus">А-</a>
                <a href="#" class="bvi-btn" data-bvi-btn-fontSize="plus">А+</a>
            </div>
            <div class="bvi-block">
                <h1>${this._i18n.t('sitColors')}</h1>
                <a href="#" class="bvi-btn bvi-theme-white" data-bvi-btn-theme="white">Ц</a>
                <a href="#" class="bvi-btn bvi-theme-black" data-bvi-btn-theme="black">Ц</a>
                <a href="#" class="bvi-btn bvi-theme-blue" data-bvi-btn-theme="blue">Ц</a>
                <a href="#" class="bvi-btn bvi-theme-brown" data-bvi-btn-theme="brown">Ц</a>
                <a href="#" class="bvi-btn bvi-theme-green" data-bvi-btn-theme="green">Ц</a>
            </div>
            <div class="bvi-block">
                <h1>${this._i18n.t('images')}</h1>
                <a href="#" class="bvi-btn" data-bvi-btn-images="true"><i class="bvi-images bvi-images-on"></i></a>
                <a href="#" class="bvi-btn" data-bvi-btn-images="false"><i class="bvi-images bvi-images-off"></i></a>
                <a href="#" class="bvi-btn" data-bvi-btn-images="grayscale"><i class="bvi-images bvi-images-adjust"></i></a>
            </div>
            <div class="bvi-block">
                <h1>${this._i18n.t('sound')}</h1>
                <a href="#" class="bvi-btn" data-bvi-btn-speech="false"><i class="bvi-images bvi-images-volume-off"></i></a>
                <a href="#" class="bvi-btn" data-bvi-btn-speech="true"><i class="bvi-images bvi-images-volume-on"></i></a>
            </div>
            <div class="bvi-block">
                <h1>${this._i18n.t('settings')}</h1>
                <a href="#" class="bvi-btn" data-bvi-btn="settings-more"><i class="bvi-images bvi-images-cog"></i></a>
                <a href="#" class="bvi-btn" data-bvi-btn="close">${this._i18n.t('regularVersionOfTheSite')}</a>
                <a href="#" class="bvi-btn" data-bvi-btn="panel-hide"><i class="bvi-images bvi-images-minus-square-o"></i></a>
            </div>
        </div>
    </div>
    <div class="bvi-modal">
        <div class="bvi-modal-dialog">
            <div class="bvi-modal-content">
                <div class="bvi-modal-header">
                    <h3 class="bvi-modal-title">${this._i18n.t('settings')}</h3>
                    <a href="#" class="bvi-btn bvi-modal-close" data-bvi-btn="close-modal">×</a>
                </div>
                <div class="bvi-modal-body">
                    <div class="bvi-block-settings-more">
                         <div class="bvi-blocks bvi-block-center">
                            <div class="bvi-block">
                                <h1>${this._i18n.t('lineSpacing')}</h1>
                                <a href="#" class="bvi-btn" data-bvi-btn-lineHeight="normal">${this._i18n.t('standard')}</a>
                                <a href="#" class="bvi-btn" data-bvi-btn-lineHeight="average">${this._i18n.t('middle')}</a>
                                <a href="#" class="bvi-btn" data-bvi-btn-lineHeight="big">${this._i18n.t('large')}</a>
                            </div>
                            <div class="bvi-block">
                                <h1>${this._i18n.t('spacingBetweenLetters')}</h1>
                                <a href="#" class="bvi-btn" data-bvi-btn-letterSpacing="normal">${this._i18n.t('standard')}</a>
                                <a href="#" class="bvi-btn" data-bvi-btn-letterSpacing="average">${this._i18n.t('middle')}</a>
                                <a href="#" class="bvi-btn" data-bvi-btn-letterSpacing="big">${this._i18n.t('large')}</a>
                            </div>
                            <div class="bvi-block">
                                <h1>${this._i18n.t('font')}</h1>
                                <a href="#" class="bvi-btn" data-bvi-btn-fontFamily="arial">${this._i18n.t('sansSerif')}</a>
                                <a href="#" class="bvi-btn" data-bvi-btn-fontFamily="times">${this._i18n.t('serif')}</a>
                            </div>
                            <div class="bvi-block">
                                <h1>${this._i18n.t('built-inElements')}</h1>
                                <a href="#" class="bvi-btn" data-bvi-btn-builtElements="true">${this._i18n.t('on')}</a>
                                <a href="#" class="bvi-btn" data-bvi-btn-builtElements="false">${this._i18n.t('off')}</a><br>
                            </div>
                        </div>
                        <div class="bvi-blocks bvi-block-end">
                            <div class="bvi-block">
                                <a href="#" class="bvi-btn" data-bvi-btn="reset-settings">${this._i18n.t('resetSettings')}</a>
                            </div>
                        </div>
                        <div class="bvi-blocks bvi-block-center">
                            <a href="https://bvi.isvek.ru" class="bvi-copyright" target="_blank">bvi.isvek.ru</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `

    btnFixed.innerHTML = `<a href="#" class="bvi-btn bvi-no-styles" data-bvi-btn="panel-show"><i class="bvi-images bvi-images-eye bvi-no-styles"></i></a>`

    document.body.prepend(div)
    document.querySelector('.bvi-body').prepend(btnFixed)
    let hide = !stringToBoolean(getCookie('panelHide')) ? ' bvi-btn-hide' : ''
    btnFixed.setAttribute('class', `bvi-btn-fixed-top${hide}`)
  }

  _btn() {
    const btnActive = (element, btnData = '') => {
      if (btnData === 'close' || btnData === 'settings-more' || btnData === 'reset-settings' || btnData === 'close-modal' || btnData === 'panel-hide' || btnData === 'panel-show') {
        return false
      }

      for (let sibling of element.parentNode.children) {
        sibling.classList.remove('active')
      }

      element.classList.add('active')
    }

    let btn = document.querySelectorAll('.bvi-btn')

    getKey(this._config, key => {
      if (key === '') return false

      let active = document.querySelector(`[data-bvi-btn-${key}="${getCookie(key)}"]`)

      if (active) {
        active.classList.add('active')
      }
    })

    btn.forEach(element => {
      element.addEventListener('click', event => {
        event.preventDefault()
        let btnData = event.target.getAttribute('data-bvi-btn')
        let btnDataFontSize = event.target.getAttribute('data-bvi-btn-fontSize')
        let btnDataTheme = event.target.getAttribute('data-bvi-btn-theme')
        let btnDataImages = event.target.getAttribute('data-bvi-btn-images')
        let btnDataSpeech = event.target.getAttribute('data-bvi-btn-speech')
        let btnDataLineHeight = event.target.getAttribute('data-bvi-btn-lineHeight')
        let btnDataLetterSpacing = event.target.getAttribute('data-bvi-btn-letterSpacing')
        let btnDataFontFamily = event.target.getAttribute('data-bvi-btn-fontFamily')
        let btnDataBuiltElements = event.target.getAttribute('data-bvi-btn-builtElements')

        // Fontsize
        if (btnDataFontSize === 'minus') {
          let size = parseFloat(getCookie('fontSize')) - 1
          let fontSize = plural(size, [`${this._i18n.t('plural_0')}`, `${this._i18n.t('plural_1')}`, `${this._i18n.t('plural_2')}`])

          if (size !== 0) {
            document.querySelector('.bvi-fontSize').innerHTML = `${fontSize}`
            this._speech(`${this._i18n.v('fontSizeMinus')}`)
            this._setAttrDataBviBody('fontSize', size)
            setCookie('fontSize', size)
          }
        }

        if (btnDataFontSize === 'plus') {
          let size = parseFloat(getCookie('fontSize')) + 1
          let fontSize = plural(size, [`${this._i18n.t('plural_0')}`, `${this._i18n.t('plural_1')}`, `${this._i18n.t('plural_2')}`])

          if (size !== 40) {
            document.querySelector('.bvi-fontSize').innerHTML = `${fontSize}`
            this._speech(`${this._i18n.v('fontSizePlus')}`)
            this._setAttrDataBviBody('fontSize', size)
            setCookie('fontSize', size)
          }
        }

        // Theme
        if (btnDataTheme === 'white') {
          this._speech(`${this._i18n.v('siteColorBlackOnWhite')}`)
          this._setAttrDataBviBody('theme', 'white')
          setCookie('theme', 'white')
        }

        if (btnDataTheme === 'black') {
          this._speech(`${this._i18n.v('siteColorWhiteOnBlack')}`)
          this._setAttrDataBviBody('theme', 'black')
          setCookie('theme', 'black')
        }

        if (btnDataTheme === 'blue') {
          this._speech(`${this._i18n.v('siteColorDarkBlueOnBlue')}`)
          this._setAttrDataBviBody('theme', 'blue')
          setCookie('theme', 'blue')
        }

        if (btnDataTheme === 'brown') {
          this._speech(`${this._i18n.v('siteColorBeigeBrown')}`)
          this._setAttrDataBviBody('theme', 'brown')
          setCookie('theme', 'brown')
        }

        if (btnDataTheme === 'green') {
          this._speech(`${this._i18n.v('siteColorGreenOnDarkBrown')}`)
          this._setAttrDataBviBody('theme', 'green')
          setCookie('theme', 'green')
        }

        // Images
        if (btnDataImages === 'true') {
          this._speech(`${this._i18n.v('imagesOn')}`)
          this._setAttrDataBviBody('images', 'true')
          setCookie('images', 'true')
        }

        if (btnDataImages === 'false') {
          this._speech(`${this._i18n.v('imagesOF')}`)
          this._setAttrDataBviBody('images', 'false')
          setCookie('images', 'false')
        }

        if (btnDataImages === 'grayscale') {
          this._speech(`${this._i18n.v('imagesGrayscale')}`)
          this._setAttrDataBviBody('images', 'grayscale')
          setCookie('images', 'grayscale')
        }


        if (btnDataSpeech === 'true') {
          this._setAttrDataBviBody('speech', 'true')
          setCookie('speech', 'true')
          this._speech(`${this._i18n.v('speechOn')}`)

          this._speechPlayer()
        }

        if (btnDataSpeech === 'false') {
          this._speech(`${this._i18n.v('speechOff')}`)
          this._setAttrDataBviBody('speech', 'false')
          setCookie('speech', 'false')
          this._speechPlayer()
        }

        // lineHeight
        if (btnDataLineHeight === 'normal') {
          this._speech(`${this._i18n.v('lineHeightStandard')}`)
          this._setAttrDataBviBody('lineHeight', 'normal')
          setCookie('lineHeight', 'normal')
        }

        if (btnDataLineHeight === 'average') {
          this._speech(`${this._i18n.v('lineHeightMiddle')}`)
          this._setAttrDataBviBody('lineHeight', 'average')
          setCookie('lineHeight', 'average')
        }

        if (btnDataLineHeight === 'big') {
          this._speech(`${this._i18n.v('lineHeightLarge')}`)
          this._setAttrDataBviBody('lineHeight', 'big')
          setCookie('lineHeight', 'big')
        }

        // letterSpacing
        if (btnDataLetterSpacing === 'normal') {
          this._speech(`${this._i18n.v('LetterSpacingStandard')}`)
          this._setAttrDataBviBody('letterSpacing', 'normal')
          setCookie('letterSpacing', 'normal')
        }

        if (btnDataLetterSpacing === 'average') {
          this._speech(`${this._i18n.v('LetterSpacingMiddle')}`)
          this._setAttrDataBviBody('letterSpacing', 'average')
          setCookie('letterSpacing', 'average')
        }

        if (btnDataLetterSpacing === 'big') {
          this._speech(`${this._i18n.v('LetterSpacingLarge')}`)
          this._setAttrDataBviBody('letterSpacing', 'big')
          setCookie('letterSpacing', 'big')
        }

        // fontFamily
        if (btnDataFontFamily === 'arial') {
          this._speech(`${this._i18n.v('fontSansSerif')}`)
          this._setAttrDataBviBody('fontFamily', 'arial')
          setCookie('fontFamily', 'arial')
        }

        if (btnDataFontFamily === 'times') {
          this._speech(`${this._i18n.v('fontSerif')}`)
          this._setAttrDataBviBody('fontFamily', 'times')
          setCookie('fontFamily', 'times')
        }

        // builtElements
        if (btnDataBuiltElements === 'true') {
          this._speech(`${this._i18n.v('built-inElementsOn')}`)
          this._setAttrDataBviBody('builtElements', 'true')
          setCookie('builtElements', 'true')
        }

        if (btnDataBuiltElements === 'false') {
          this._speech(`${this._i18n.v('built-inElementsOFF')}`)
          this._setAttrDataBviBody('builtElements', 'false')
          setCookie('builtElements', 'false')
        }

        // Settings more
        if (btnData === 'settings-more') {
          let blockSettingsMore = document.querySelector('.bvi-modal')
          blockSettingsMore.classList.toggle('show')
        }

        if (btnData === 'close') {
          setCookie('panelActive', false)
          document.querySelector('.bvi-panel').remove()
          this._init()
        }

        if (btnData === 'close-modal') {
          document.querySelector('.bvi-modal').classList.remove('show')
        }

        if (btnData === 'panel-hide') {
          this._speech(`${this._i18n.v('panelHide')}`)
          setCookie('panelHide', 'true')
          document.querySelector('.bvi-panel').classList.add('bvi-panel-hide')
          document.querySelector('.bvi-btn-fixed-top').classList.remove('bvi-btn-hide')
        }

        if (btnData === 'panel-show') {
          this._speech(`${this._i18n.v('panelShow')}`)
          setCookie('panelHide', 'false')
          document.querySelector('.bvi-panel').classList.remove('bvi-panel-hide')
          document.querySelector('.bvi-btn-fixed-top').classList.add('bvi-btn-hide')
        }

        if (btnData === 'reset-settings') {
          getKey(this._config, key => {
            this._setAttrDataBviBody(key, this._config[key])
            setCookie(key, this._config[key])
            let active = document.querySelector(`[data-bvi-btn-${key}="${getCookie(key)}"]`)
            let btnAll = document.querySelectorAll(`[data-bvi-btn-${key}`)

            btnAll.forEach(element => {
              if (btnAll && element.classList.contains('active')) {
                element.classList.remove('active')
              }
            })

            if (active) {
              active.classList.add('active')
            }
          })

          this._speech(`${this._i18n.v('resetSettings')}`)
        }

        btnActive(event.target, btnData)
      }, true)
    })

    let closeModal = document.querySelector('.bvi-modal')

    window.onclick = event => {
      if (event.target === closeModal) {
        closeModal.classList.remove('show')
      }
    }
  }

  _images() {
    document.querySelectorAll('img').forEach(element => {
      if (!element.classList.contains('bvi-no-style')) {
        element.classList.add('bvi-img')

        if (element.classList.contains('')) {

        }
      }
    })

    document.querySelectorAll('.bvi-body *').forEach(element => {
      let style = getComputedStyle(element)
      if (style.backgroundImage !== 'none' && style.background !== 'none' && !element.classList.contains('bvi-no-style')) {
        element.classList.add('bvi-background-image')
      }
    })
  }

  _speechPlayer() {
    let selectorSpeechText = document.querySelectorAll('.bvi-speech-text')
    let selectorSpeechBtn = document.querySelectorAll('.bvi-speech-btn')
    let selectorBviSpeech = document.querySelectorAll('.bvi-speech')

    if (supportSynthBrowser && stringToBoolean(getCookie('speech'))) {
      if (selectorBviSpeech) {
        if (selectorSpeechText) {
          selectorSpeechText.forEach(element => unwrap(element))
        }

        if (selectorSpeechBtn) {
          selectorSpeechBtn.forEach(element => element.remove())
        }

        selectorBviSpeech.forEach((element, index) => {

          let id = `bvi-speech-text-id-${index + 1}`;
          let div = document.createElement('div')

          wrapInner(element, 'div', `bvi-speech-text ${id}`)

          div.className = 'bvi-speech-btn'
          div.innerHTML = `
          <a href="#" class="bvi-btn bvi-speech-play">Воспроизвести</a>
          <a href="#" class="bvi-btn bvi-speech-pause disabled">Пауза</a>
          <a href="#" class="bvi-btn bvi-speech-resume disabled">Продолжить</a>
          <a href="#" class="bvi-btn bvi-speech-stop disabled">Стоп</i></a>
        `
          element.prepend(div)
        })
      }

      let selectorPlay = document.querySelectorAll('.bvi-speech-play')
      let selectorPause = document.querySelectorAll('.bvi-speech-pause')
      let selectorResume = document.querySelectorAll('.bvi-speech-resume')
      let selectorStop = document.querySelectorAll('.bvi-speech-stop')
      const el = (elements, callback) => {
        elements.forEach(element => {
          element.addEventListener('click', event => {
            event.preventDefault()
            if (typeof callback === 'function') {
              return callback(element, event)
            }
          }, false)
        })
      }

      el(selectorPlay, (element, event) => {
        let target = event.target
        let text = target.parentNode.nextElementSibling;
        let closest = event.target.closest('.bvi-speech-btn')
        let play = document.querySelectorAll('.bvi-speech-play')
        let pause = document.querySelectorAll('.bvi-speech-pause')
        let resume = document.querySelectorAll('.bvi-speech-resume')
        let stop = document.querySelectorAll('.bvi-speech-stop')

        this._speech(text.textContent, text, true);

        play.forEach(element => element.classList.remove('disabled'))
        pause.forEach(element => element.classList.add('disabled'))
        resume.forEach(element => element.classList.add('disabled'))
        stop.forEach(element => element.classList.add('disabled'))

        target.classList.add('disabled')
        closest.querySelector('.bvi-speech-pause').classList.remove('disabled')
        closest.querySelector('.bvi-speech-stop').classList.remove('disabled')
      })

      el(selectorPause, (element, event) => {
        let target = event.target
        let closest = event.target.closest('.bvi-speech-btn')

        target.classList.add('disabled')
        closest.querySelector('.bvi-speech-resume').classList.remove('disabled')
        synth.pause()
      })

      el(selectorResume, (element, event) => {
        let target = event.target
        let closest = event.target.closest('.bvi-speech-btn')

        target.classList.add('disabled')
        closest.querySelector('.bvi-speech-pause').classList.remove('disabled')
        synth.resume()
      })

      el(selectorStop, (element, event) => {
        let target = event.target
        let closest = event.target.closest('.bvi-speech-btn')

        target.classList.add('disabled')
        closest.querySelector('.bvi-speech-pause').classList.add('disabled')
        closest.querySelector('.bvi-speech-play').classList.remove('disabled')
        synth.cancel();
      })
    } else {
      if (selectorSpeechText) {
        selectorSpeechText.forEach(element => unwrap(element))
      }

      if (selectorSpeechBtn) {
        selectorSpeechBtn.forEach(element => element.remove())
      }
    }
  }

  _speech(text, element = '', echo = false) {
    if (supportSynthBrowser && stringToBoolean(getCookie('speech'))) {
      synth.cancel()
      let voices = synth.getVoices()
      let chunkLength = 120
      let patternRegex = new RegExp('^[\\s\\S]{' + Math.floor(chunkLength / 2) + ',' + chunkLength + '}[.!?,]{1}|^[\\s\\S]{1,' + chunkLength + '}$|^[\\s\\S]{1,' + chunkLength + '} ')
      let array = []
      let $text = text
      const getWordAt = (str, pos) => {
        str = String(str)
        pos = Number(pos) >>> 0

        let left = str.slice(0, pos + 1).search(/\S+$/)
        let right = str.slice(pos).search(/\s/);

        if (right < 0) {
          return str.slice(left);
        }
        return str.slice(left, right + pos)
      }

      while ($text.length > 0) {
        array.push($text.match(patternRegex)[0]);
        $text = $text.substring(array[array.length - 1].length);
      }

      array.forEach(getText => {
        let utter = new SpeechSynthesisUtterance(getText.trim())
        utter.volume = 1
        utter.rate = 1
        utter.pitch = 1
        utter.lang = `${this._config.lang}`

        for (let i = 0; i < voices.length; i++) {
          if (voices[i].lang === this._config.lang && voices[i].name === 'Microsoft Pavel - Russian (Russia)') {
            utter.voice = voices[i];
          }
        }

        if (echo) {
          utter.onboundary = function (event) {
            element.classList.add('bvi-highlighting')
            let world = getWordAt(event.utterance.text, event.charIndex)
            let textContent = element.textContent
            let term = world.replace(/(\s+)/, "(<[^>]+>)*$1(<[^>]+>)*")
            let pattern = new RegExp("(" + term + ")", "gi")
            textContent = textContent.replace(pattern, "<mark>$1</mark>")
            textContent = textContent.replace(/(<mark>[^<>]*)((<[^>]+>)+)([^<>]*<\/mark>)/, "$1</mark>$2<mark>$4")
            element.innerHTML = textContent
          }

          utter.onend = function (event) {
            element.classList.remove('bvi-highlighting')
            let textContent = element.textContent
            textContent = textContent.replace(/(<mark>$1<\/mark>)/, "$1")
            element.innerHTML = textContent
          };
        }

        synth.speak(utter)
      })
    }
  }

  _getConfig(config) {
    config = {...Default, ...config}
    checkConfig(config, DefaultType, DefaultOptions)
    return config
  }
}

export default Bvi
