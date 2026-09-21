import deDE from './de-DE.json'
import enUS from './en-US.json'
import esES from './es-ES.json'
import frFR from './fr-FR.json'
import itIT from './it-IT.json'
import jaJP from './ja-JP.json'
import plPL from './pl-PL.json'
import ptBR from './pt-BR.json'
import ruRU from './ru-RU.json'
import trTR from './tr-TR.json'
import zhCN from './zh-CN.json'

/**
 * Встроенные словари. Ключ — код языка BCP 47, значение — тексты интерфейса и голосовые сообщения.
 * Единственный источник списка языков: из него строятся проверка `lang` в конфиге и выбор словаря.
 * @type {Record<string, {text: Record<string, string>, voice: Record<string, string>}>}
 */
const locales = {
  'ru-RU': ruRU,
  'en-US': enUS,
  'es-ES': esES,
  'de-DE': deDE,
  'fr-FR': frFR,
  'pt-BR': ptBR,
  'it-IT': itIT,
  'tr-TR': trTR,
  'pl-PL': plPL,
  'zh-CN': zhCN,
  'ja-JP': jaJP,
}

/** Коды поддерживаемых языков. */
const LANGUAGES = Object.keys(locales)

export { LANGUAGES, locales }
