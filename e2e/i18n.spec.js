import fs from 'node:fs'
import path from 'node:path'
import { expect, test } from '@playwright/test'

const localesDir = path.resolve('src/js/i18n/locales')
const readLocale = code => JSON.parse(fs.readFileSync(path.join(localesDir, `${code}.json`), 'utf8'))
const codes = fs.readdirSync(localesDir).filter(file => file.endsWith('.json')).map(file => file.replace('.json', '')).sort()
const russian = readLocale('ru-RU')
test.describe('Переводы интерфейса', () => {
  test('каждый словарь содержит те же ключи, что и русский, и без пустых значений', () => {
    for (const code of codes) {
      const locale = readLocale(code)

      for (const section of ['text', 'voice']) {
        expect(Object.keys(locale[section]), `${code}: раздел ${section}`).toEqual(Object.keys(russian[section]))

        const empty = Object.entries(locale[section]).filter(([, value]) => typeof value !== 'string' || value.trim() === '')
        expect(empty, `${code}: пустые значения в ${section}`).toEqual([])
      }
    }
  })

  test('нерусские словари действительно переведены, а не скопированы с русского', () => {
    for (const code of codes.filter(code => code !== 'ru-RU')) {
      const locale = readLocale(code)
      const same = Object.keys(russian.text).filter(key => locale.text[key] === russian.text[key] && !['menu', 'normal'].includes(key))

      expect(same, `${code}: совпадают с русским`).toEqual([])
    }
  })

  test('список языков совпадает в реестре, типах и README', () => {
    const registry = fs.readFileSync(path.join(localesDir, 'index.js'), 'utf8')
    const registered = [...registry.matchAll(/^\s+'([a-z]{2}-[A-Z]{2})':/gm)].map(match => match[1]).sort()
    const types = fs.readFileSync(path.resolve('types/index.d.ts'), 'utf8')
    const typed = [...types.match(/export type BviLang = ([^\n]+)/)[1].matchAll(/'([a-z]{2}-[A-Z]{2})'/g)].map(match => match[1]).sort()

    expect(registered).toEqual(codes)
    expect(typed).toEqual(codes)

    for (const file of ['README.md', 'README.ru.md']) {
      const row = fs.readFileSync(path.resolve(file), 'utf8').split('\n').find(line => line.startsWith('lang |'))
      const documented = [...row.matchAll(/`([a-z]{2}-[A-Z]{2})`/g)].map(match => match[1]).sort()

      expect(documented, file).toEqual(codes)
    }
  })

  test('русский README повторяет структуру английского: заголовки, блоки кода, таблицы', () => {
    const outline = file => {
      const text = fs.readFileSync(path.resolve(file), 'utf8')

      return {
        headings: (text.match(/^#{1,4} /gm) || []).join(''),
        codeFences: (text.match(/^```/gm) || []).length,
        tableRows: (text.match(/^[^\n|]+ \| /gm) || []).length,
        changelogItems: (text.match(/^\* /gm) || []).length,
      }
    }

    expect(outline('README.ru.md')).toEqual(outline('README.md'))
  })
})
