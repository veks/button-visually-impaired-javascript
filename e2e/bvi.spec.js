import fs from 'node:fs'
import path from 'node:path'
import { expect, test } from '@playwright/test'

const languages = fs.readdirSync(path.resolve('src/js/i18n/locales')).filter(file => file.endsWith('.json')).map(file => file.replace('.json', '')).sort()
const themes = ['white', 'black', 'blue', 'brown', 'green']
const formControls = ['#sc-check', '#sc-radio', '#sc-date', '#sc-range', '#sc-color', '#sc-file', '#sc-progress', '#sc-meter']
const embeddedElements = ['audio', 'canvas', 'embed', 'iframe', 'object', 'video']

/**
 * Открывает демо-страницу и включает режим. Страница создаёт плагин только с настройками по умолчанию,
 * поэтому `options` пересоздают его с другими настройками.
 * @param {import('@playwright/test').Page} page - Страница теста.
 * @param {Object|null} [options=null] - Параметры конструктора `Bvi`.
 * @returns {Promise<void>}
 */
const enableBvi = async (page, options = null) => {
  await page.goto('/test/')

  if (options) {
    await page.evaluate(options => {
      window.bvi.destroy()
      window.bvi = new isvek.Bvi({ target: '.bvi-open', fontSize: 14, ...options })
    }, options)
  }

  await page.locator('.bvi-open').first().click()
  await expect(page.locator('.bvi-panel')).toBeVisible()
}

const openSettings = async page => {
  await page.locator('[data-bvi="modal"]').click()
  await expect(page.locator('.bvi-modal')).toHaveClass(/show/)
}

test.describe('Плагин Button visually impaired', () => {
  test.beforeEach(async ({ context }) => {
    await context.clearCookies()
  })

  test('создаёт доступную панель с крупными кнопками для касания', async ({ page }) => {
    await enableBvi(page)

    const panel = page.locator('.bvi-panel')
    await expect(panel).toHaveAttribute('role', 'region')
    await expect(panel).toHaveAttribute('aria-label', /./)
    await expect(panel.locator('[role="group"]')).toHaveCount(9)
    await expect(panel.locator('.bvi-link[aria-label]')).toHaveCount(15)

    const undersizedControls = await panel.locator('.bvi-blocks > .bvi-block > .bvi-link').evaluateAll(elements => elements.filter(element => {
      const { height, width } = element.getBoundingClientRect()

      return height < 44 || width < 44
    }).map(element => element.className))

    expect(undersizedControls).toEqual([])
  })

  test('применяет каждую цветовую схему и не прячет нативные элементы форм', async ({ page }) => {
    await enableBvi(page)

    for (const theme of themes) {
      await page.locator(`.bvi-theme-${theme}`).click()
      await expect(page.locator('.bvi-body')).toHaveAttribute('data-bvi-theme', theme)

      for (const selector of formControls) {
        await expect(page.locator(selector)).toBeVisible()
      }

      const controls = await page.locator('#sc-check, #sc-radio').evaluateAll(elements => elements.map(element => {
        const style = getComputedStyle(element)

        return {
          border: parseFloat(style.borderTopWidth),
          marker: getComputedStyle(element, '::before').transform,
        }
      }))

      expect(controls.every(control => control.border >= 2 && control.marker !== 'none')).toBe(true)
    }
  })

  test('оставляет читаемыми все элементы форм демо-страницы в каждой цветовой схеме', async ({ page }) => {
    await enableBvi(page)

    for (const theme of themes) {
      await page.locator(`.bvi-theme-${theme}`).click()
      await expect(page.locator('.bvi-body')).toHaveAttribute('data-bvi-theme', theme)
      await page.waitForFunction(() => document.getAnimations().length === 0)
      const result = await page.locator('#all-forms').evaluate(form => {
        const parse = color => color.match(/[\d.]+/g).map(Number)
        const channel = value => {
          const v = value / 255

          return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
        }
        const luminance = ([r, g, b]) => 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
        const background = element => {
          for (let node = element; node; node = node.parentElement) {
            const [r, g, b, a = 1] = parse(getComputedStyle(node).backgroundColor)

            if (a > 0.5) {
              return [r, g, b]
            }
          }

          return [255, 255, 255]
        }
        const selector = [
          'input:not([type="checkbox"]):not([type="radio"]):not([type="range"]):not([type="color"]):not([type="file"]):not([type="image"]):not([type="hidden"])',
          'select', 'textarea', 'button', '.btn',
        ].join(', ')

        const controls = Array.from(form.querySelectorAll(selector))
          .filter(element => !element.matches(':disabled') && element.getBoundingClientRect().width > 0)
        const failures = controls
          .map(element => {
            const [r, g, b] = parse(getComputedStyle(element).color)
            const [light, dark] = [luminance([r, g, b]), luminance(background(element))].sort((a, b) => b - a)

            return { id: element.id || element.className, ratio: Number(((light + 0.05) / (dark + 0.05)).toFixed(2)) }
          })
          .filter(control => control.ratio < 3)

        return { checked: controls.length, failures }
      })
      expect(result.checked, `тема ${theme}`).toBeGreaterThan(25)
      expect(result.failures, `тема ${theme}`).toEqual([])
    }
  })

  test('переключает режимы изображений и показывает подписи вместо скрытых картинок', async ({ page }) => {
    await enableBvi(page)

    const image = page.locator('#sc-img-alt')
    await page.locator('.bvi-images-on').click()
    await expect(image).toHaveClass(/bvi-img/)
    await expect(image).toBeVisible()

    await page.locator('.bvi-images-off').click()
    await expect(image).toBeHidden()
    await expect(page.locator('#sc-img-alt + .bvi-img-caption')).toBeVisible()

    await page.locator('.bvi-images-grayscale').click()
    await expect(page.locator('.bvi-body')).toHaveAttribute('data-bvi-images', 'grayscale')
  })

  test('включает и выключает встроенные элементы из настроек', async ({ page }) => {
    await enableBvi(page)
    await openSettings(page)

    await page.locator('.bvi-built-elements-on').click()
    await expect(page.locator('.bvi-body')).toHaveAttribute('data-bvi-builtelements', 'true')

    for (const selector of embeddedElements) {
      await expect(page.locator(selector).first()).toBeVisible()
    }

    await page.locator('.bvi-built-elements-off').click()
    await expect(page.locator('.bvi-body')).toHaveAttribute('data-bvi-builtelements', 'false')
  })

  test('панель повторяет цветовую схему сайта и остаётся контрастной: текст, рамки, иконки, зазоры', async ({ page }) => {
    await enableBvi(page)

    for (const theme of themes) {
      await page.locator(`.bvi-theme-${theme}`).click()
      await expect(page.locator('.bvi-body')).toHaveAttribute('data-bvi-theme', theme)
      await page.waitForFunction(() => document.getAnimations().length === 0)

      const report = await page.locator('.bvi-panel').evaluate((panel, theme) => {
        const parse = color => color.match(/[\d.]+/g).map(Number)
        const channel = value => {
          const v = value / 255

          return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
        }
        const luminance = ([r, g, b]) => 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
        const ratio = (first, second) => {
          const [light, dark] = [luminance(first), luminance(second)].sort((a, b) => b - a)

          return (light + 0.05) / (dark + 0.05)
        }
        const rgb = color => parse(color).slice(0, 3)
        const probe = document.createElement('div')

        probe.style.backgroundColor = `var(--bvi-theme-${theme}-bg)`
        document.body.append(probe)

        const themeBackground = rgb(getComputedStyle(probe).backgroundColor)

        probe.remove()

        const panelBackground = rgb(getComputedStyle(panel).backgroundColor)
        const buttons = Array.from(panel.querySelectorAll('.bvi-menu .bvi-link:not([class*="bvi-theme-"])'))
        const rects = buttons.map(button => button.getBoundingClientRect())
        let gap = Infinity

        rects.forEach((first, i) => rects.forEach((second, j) => {
          if (i < j && first.top < second.bottom && second.top < first.bottom) {
            gap = Math.min(gap, Math.max(first.left - second.right, second.left - first.right))
          }
        }))

        return {
          count: buttons.length,
          gap,
          panelDiffersFromScheme: ratio(panelBackground, themeBackground) > 1.01,
          minFont: Math.min(...buttons.map(button => parseFloat(getComputedStyle(button).fontSize))),
          text: Math.min(...buttons.map(button => {
            const style = getComputedStyle(button)

            return ratio(rgb(style.color), rgb(style.backgroundColor))
          })),
          border: Math.min(...buttons.filter(button => !button.classList.contains('active')).map(button => {
            const style = getComputedStyle(button)

            return Math.min(ratio(rgb(style.borderTopColor), panelBackground), ratio(rgb(style.borderTopColor), rgb(style.backgroundColor)))
          })),
          icon: Math.min(...Array.from(panel.querySelectorAll('.bvi-menu .bvi-images')).map(icon => {
            const color = getComputedStyle(icon).backgroundColor

            return color === 'rgba(0, 0, 0, 0)' ? 0 : ratio(rgb(color), rgb(getComputedStyle(icon.closest('.bvi-link')).backgroundColor))
          })),
        }
      }, theme)

      expect(report.count, `тема ${theme}`).toBeGreaterThan(8)
      expect(report.panelDiffersFromScheme, `панель не совпала со схемой ${theme}`).toBe(false)
      expect(report.minFont, `размер текста кнопок, тема ${theme}`).toBeGreaterThanOrEqual(16)
      expect(report.gap, `зазор между кнопками, тема ${theme}`).toBeGreaterThanOrEqual(8)
      expect(report.text, `контраст текста кнопок, тема ${theme}`).toBeGreaterThanOrEqual(4.5)
      expect(report.border, `контраст рамки кнопок, тема ${theme}`).toBeGreaterThanOrEqual(3)
      expect(report.icon, `контраст иконок, тема ${theme}`).toBeGreaterThanOrEqual(4.5)
    }
  })

  test('закреплённая панель не перекрывает цель перехода по якорю', async ({ page }) => {
    await enableBvi(page)
    await page.addStyleTag({ content: 'html { scroll-behavior: auto !important }' })
    await page.evaluate(() => scrollTo(0, 3000))

    const panel = page.locator('.bvi-panel')
    await expect(panel).toHaveClass(/bvi-fixed-top/)

    const offset = await page.evaluate(() => document.documentElement.style.getPropertyValue('--bvi-panel-offset'))
    const panelHeight = (await panel.boundingBox()).height
    expect(parseFloat(offset)).toBeCloseTo(panelHeight, 0)

    await page.evaluate(() => {
      location.hash = 'sc-nav'
    })

    const navTop = await page.locator('#sc-nav').evaluate(nav => nav.getBoundingClientRect().top)
    expect(navTop, 'якорь должен оказаться ниже закреплённой панели').toBeGreaterThanOrEqual(panelHeight - 1)

    await page.evaluate(() => window.bvi.destroy())
    expect(await page.evaluate(() => document.documentElement.style.getPropertyValue('--bvi-panel-offset'))).toBe('')
  })

  test('меняет интервалы и шрифт, а сброс возвращает значения по умолчанию', async ({ page }) => {
    await enableBvi(page)
    await openSettings(page)

    await page.locator('.bvi-letter-spacing-big').click()
    await page.locator('.bvi-line-height-big').click()
    await page.locator('.bvi-font-family-times').click()
    await expect(page.locator('.bvi-body')).toHaveAttribute('data-bvi-letterspacing', 'big')
    await expect(page.locator('.bvi-body')).toHaveAttribute('data-bvi-lineheight', 'big')
    await expect(page.locator('.bvi-body')).toHaveAttribute('data-bvi-fontfamily', 'times')

    await page.locator('.bvi-reset').click()
    await expect(page.locator('.bvi-body')).toHaveAttribute('data-bvi-letterspacing', 'normal')
    await expect(page.locator('.bvi-body')).toHaveAttribute('data-bvi-lineheight', 'normal')
    await expect(page.locator('.bvi-body')).toHaveAttribute('data-bvi-fontfamily', 'arial')
  })

  test('увеличивает и уменьшает размер шрифта и отмечает активную кнопку', async ({ page }) => {
    await enableBvi(page)

    const body = page.locator('.bvi-body')
    await page.locator('.bvi-font-size-plus').click()
    await expect(body).toHaveAttribute('data-bvi-fontsize', '15')
    await expect(page.locator('.bvi-font-size-plus')).toHaveClass(/active/)

    await page.locator('.bvi-font-size-minus').click()
    await expect(body).toHaveAttribute('data-bvi-fontsize', '14')
  })

  test('удерживает фокус в окне настроек, закрывает по Escape и возвращает фокус на кнопку открытия', async ({ page }) => {
    await enableBvi(page)

    const opener = page.locator('[data-bvi="modal"]')
    await opener.focus()
    await opener.click()
    await expect(page.locator('.bvi-modal-close')).toBeFocused()

    await page.locator('.bvi-reset').focus()
    await page.keyboard.press('Tab')
    await expect(page.locator('.bvi-modal-dismiss')).toBeFocused()
    await page.keyboard.press('Tab')
    await expect(page.locator('.bvi-modal-close')).toBeFocused()
    await page.keyboard.press('Escape')
    await expect(page.locator('.bvi-modal')).not.toHaveClass(/show/)
    await expect(opener).toBeFocused()
  })

  test('поддерживает навигацию стрелками, скрытие и показ панели', async ({ page }) => {
    await enableBvi(page)

    const firstControl = page.locator('.bvi-font-size-minus')
    await firstControl.focus()
    await page.keyboard.press('ArrowRight')
    await expect(page.locator('.bvi-font-size-plus')).toBeFocused()
    await page.keyboard.press('Home')
    await expect(firstControl).toBeFocused()

    await page.locator('[data-bvi="panel-hide"]').click()
    await expect(page.locator('.bvi-panel')).toHaveClass(/bvi-panel-hide/)
    await expect(page.locator('[data-bvi="panel-show"]')).toHaveClass(/bvi-show/)
    await page.locator('[data-bvi="panel-show"]').click()
    await expect(page.locator('.bvi-panel')).not.toHaveClass(/bvi-panel-hide/)
  })

  test('destroy() удаляет разметку панели и состояние страницы', async ({ page }) => {
    await enableBvi(page)
    await page.evaluate(() => window.bvi.destroy())

    await expect(page.locator('.bvi-panel')).toHaveCount(0)
    await expect(page.locator('.bvi-link-fixed-top')).toHaveCount(0)
    await expect(page.locator('.bvi-body')).toHaveCount(0)
    await expect(page.locator('.bvi-open').first()).toBeVisible()
  })

  test('закрывает окно настроек кнопкой «Закрыть» в подвале', async ({ page }) => {
    await enableBvi(page)
    await openSettings(page)

    const footer = page.locator('.bvi-modal-footer')
    await expect(footer.locator('.bvi-reset')).toBeVisible()
    await footer.locator('.bvi-modal-dismiss').click()
    await expect(page.locator('.bvi-modal')).not.toHaveClass(/show/)
    await expect(page.locator('[data-bvi="modal"]')).toBeFocused()
  })

  test('скругляет все .bvi-link одинаково: в панели, в тексте страницы и у кнопки «Показать панель»', async ({ page }) => {
    await enableBvi(page)

    const radius = selector => page.locator(selector).first().evaluate(element => getComputedStyle(element).borderTopLeftRadius)
    const expected = await page.evaluate(() => {
      const probe = document.createElement('div')
      probe.style.borderTopLeftRadius = getComputedStyle(document.documentElement).getPropertyValue('--bvi-link-radius')
      document.body.append(probe)
      const value = getComputedStyle(probe).borderTopLeftRadius
      probe.remove()

      return value
    })

    expect(expected).not.toBe('0px')
    expect(await radius('.bvi-font-size-plus')).toBe(expected)
    expect(await radius('.bvi-speech-play')).toBe(expected)

    await page.locator('[data-bvi="panel-hide"]').click()
    await expect(page.locator('[data-bvi="panel-show"]')).toBeVisible()
    expect(await radius('[data-bvi="panel-show"]')).toBe(expected)
  })

  test('показывает интерфейс на каждом поддерживаемом языке и отклоняет неизвестный', async ({ page }) => {
    const labels = {
      'ru-RU': 'Версия сайта для слабовидящих',
      'en-US': 'Version of the site for visually impaired',
      'es-ES': 'Versión del sitio para personas con discapacidad visual',
      'de-DE': 'Version der Website für Sehbehinderte',
      'fr-FR': 'Version du site pour les malvoyants',
      'pt-BR': 'Versão do site para pessoas com deficiência visual',
      'it-IT': 'Versione del sito per ipovedenti',
      'tr-TR': 'Sitenin görme engelliler için sürümü',
      'pl-PL': 'Wersja strony dla osób słabowidzących',
      'zh-CN': '网站视障辅助版',
      'ja-JP': '視覚障がい者向けサイト版',
    }

    for (const [lang, label] of Object.entries(labels)) {
      await enableBvi(page, { lang })
      await expect(page.locator('.bvi-panel'), lang).toHaveAttribute('aria-label', label)
      await expect(page.locator('.bvi-menu-toggle span'), lang).toHaveText(/./)
      await page.context().clearCookies()
    }

    const error = await page.evaluate(() => {
      try {
        new isvek.Bvi({ target: '.bvi-open', lang: 'xx-XX' })

        return null
      } catch (error) {
        return error.message
      }
    })

    expect(error).toContain('"lang"')
  })

  test('подбирает голос синтезатора: точный регион важнее порядка, затем тот же язык, иначе выбор за браузером', async ({ page }) => {
    const cases = [
      { lang: 'pt-BR', voices: ['pt-PT', 'pt-BR'], expected: 'pt-BR' },
      { lang: 'zh-CN', voices: ['zh-HK', 'zh-TW', 'zh-CN'], expected: 'zh-CN' },
      { lang: 'en-US', voices: ['en-GB', 'en_US'], expected: 'en_US' },
      { lang: 'pt-BR', voices: ['fr-FR', 'pt-PT'], expected: 'pt-PT' },
      { lang: 'de-DE', voices: ['fr-FR', 'ru-RU'], expected: null },
    ]

    for (const { lang, voices, expected } of cases) {
      await enableBvi(page, { lang })

      const result = await page.evaluate(({ voices }) => {
        window.SpeechSynthesisUtterance = class {
          constructor (text) {
            this.text = text
          }
        }
        window.speechSynthesis.getVoices = () => voices.map(code => ({ lang: code, name: code, voiceURI: code }))

        const utterance = window.bvi._speech._createUtterance('Текст')

        return { voice: utterance.voice ? utterance.voice.lang : null, lang: utterance.lang }
      }, { voices })

      expect(result.voice, `${lang} среди ${voices.join(', ')}`).toBe(expected)
      expect(result.lang, lang).toBe(expected || lang)
      await page.context().clearCookies()
    }
  })

  test('учитывает опцию copyright', async ({ page }) => {
    await enableBvi(page, { copyright: false })
    await openSettings(page)
    await expect(page.locator('.bvi-copyright')).toHaveCount(0)
  })

  test('не создаёт горизонтальной прокрутки на поддерживаемых ширинах экрана', async ({ page }) => {
    for (const [width, height] of [[320, 640], [375, 667], [768, 1024], [1024, 768], [1440, 900]]) {
      await page.setViewportSize({ width, height })
      await enableBvi(page)
      await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
      await page.context().clearCookies()
    }
  })

  test('панель помещается на любом экране и на любом языке: кнопки не меньше 44px, одна строка от порога desktop', async ({ page }) => {
    test.setTimeout(120000)

    const desktop = 1248
    const widths = [320, 360, 414, 576, 768, 1024, desktop - 1, desktop, 1440]
    const problems = []

    for (const lang of languages) {
      await page.setViewportSize({ width: 1440, height: 900 })
      await enableBvi(page, { lang })

      for (const width of widths) {
        await page.setViewportSize({ width, height: width < 700 ? 800 : 900 })

        const toggle = page.locator('.bvi-menu-toggle')
        const collapsed = width < desktop

        if (collapsed && (await toggle.getAttribute('aria-expanded')) !== 'true') {
          await toggle.click()
        }

        await page.waitForFunction(() => document.getAnimations().length === 0)

        const report = await page.evaluate(() => {
          const panel = document.querySelector('.bvi-panel')
          const buttons = Array.from(panel.querySelectorAll('.bvi-menu .bvi-link')).filter(button => button.getBoundingClientRect().width > 0)
          const rows = new Set(Array.from(panel.querySelectorAll('.bvi-menu > .bvi-blocks > .bvi-block')).map(block => Math.round(block.getBoundingClientRect().top)))

          return {
            toggleVisible: getComputedStyle(panel.querySelector('.bvi-menu-toggle')).display !== 'none',
            rows: rows.size,
            overflow: document.documentElement.scrollWidth > window.innerWidth,
            outside: Array.from(panel.querySelectorAll('.bvi-block, .bvi-link')).filter(element => {
              const { left, right, width: elementWidth } = element.getBoundingClientRect()

              return elementWidth > 0 && (right > window.innerWidth + 0.5 || left < -0.5)
            }).length,
            small: buttons.filter(button => {
              const { height, width: buttonWidth } = button.getBoundingClientRect()

              return buttonWidth < 43.5 || height < 43.5
            }).length,
          }
        })

        const where = `${lang} ${width}px`

        if (report.toggleVisible !== collapsed) problems.push(`${where}: меню ${report.toggleVisible ? 'видно' : 'скрыто'}, а должно быть ${collapsed ? 'видно' : 'скрыто'}`)
        if (report.overflow) problems.push(`${where}: горизонтальная прокрутка`)
        if (report.outside) problems.push(`${where}: ${report.outside} элементов за краем экрана`)
        if (report.small) problems.push(`${where}: ${report.small} кнопок меньше 44px`)
        if (!collapsed && report.rows !== 1) problems.push(`${where}: группы в ${report.rows} строки, ожидалась одна: порог desktop надо поднять`)
      }

      await page.context().clearCookies()
    }

    expect(problems).toEqual([])
  })

  test('прячет группы за кнопкой «Меню» ниже брейкпоинта desktop', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await enableBvi(page)

    const toggle = page.locator('.bvi-menu-toggle')
    const blocks = page.locator('.bvi-menu > .bvi-blocks')

    await expect(toggle).toBeVisible()
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await expect(blocks).toBeHidden()
    expect((await page.locator('.bvi-panel').boundingBox()).height).toBeLessThan(90)

    await toggle.click()
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await expect(blocks).toBeVisible()

    await page.locator('.bvi-font-size-plus').click()
    await expect(blocks).toBeVisible()

    await openSettings(page)
    await expect(page.locator('.bvi-modal-content')).toBeInViewport()

    await page.setViewportSize({ width: 1280, height: 800 })
    await expect(toggle).toBeHidden()
    await expect(blocks).toBeVisible()
  })
})
