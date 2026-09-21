/** Доступные контрастные темы. */
export type BviTheme = 'white' | 'black' | 'blue' | 'brown' | 'green'
/** Режим отображения изображений. */
export type BviImages = boolean | 'grayscale'
/** Допустимые уровни межбуквенного интервала и высоты строки. */
export type BviLevel = 'normal' | 'average' | 'big'
/** Поддерживаемые семейства шрифтов. */
export type BviFontFamily = 'arial' | 'times'
/** Языки встроенных словарей. */
export type BviLang = 'ru-RU' | 'en-US' | 'es-ES' | 'de-DE' | 'fr-FR' | 'pt-BR' | 'it-IT' | 'tr-TR' | 'pl-PL' | 'zh-CN' | 'ja-JP'

/** Параметры режима для слабовидящих. Все свойства необязательны. */
export interface BviOptions {
  /** CSS-селектор кнопки (кнопок), которая включает версию для слабовидящих. */
  target?: string
  /** Начальный размер шрифта, 1–39. */
  fontSize?: number
  /** Цветовая тема страницы. */
  theme?: BviTheme
  /** `true` — показывать, `false` — скрыть (с подписями из alt), `'grayscale'` — чёрно-белые. */
  images?: BviImages
  /** Межбуквенный интервал. */
  letterSpacing?: BviLevel
  /** Межстрочный интервал. */
  lineHeight?: BviLevel
  /** Синтез речи. */
  speech?: boolean
  /** `voiceURI` или имя голоса; пустая строка — автоматически. */
  speechVoice?: string
  /** Семейство шрифта. */
  fontFamily?: BviFontFamily
  /** Показывать встроенные элементы (iframe, video, карты). */
  builtElements?: boolean
  /** Закреплять панель при прокрутке. */
  panelFixed?: boolean
  /** Скрывать панель. */
  panelHide?: boolean
  /** Перезагружать страницу при выключении версии для слабовидящих. */
  reload?: boolean
  /** Язык панели и голосовых сообщений. */
  lang?: BviLang
  /** Ссылка на bvi.isvek.ru в окне настроек; `false` — скрыть. */
  copyright?: boolean
}

export class Bvi {
  /** Плагин работает с DOM, создавайте экземпляр только в браузере (в React — в `useEffect`). */
  constructor(options?: BviOptions)
  /** Убирает плагин со страницы и снимает все обработчики. Сохранённые настройки не удаляются. */
  destroy(): void
}

export interface SpeechOptions {
  /** Язык синтезатора речи; при отсутствии используется `ru-RU`. */
  lang?: BviLang
}

/** Контроллер синтеза речи и подсветки озвучиваемого текста. */
export class Speech {
  /** Создаёт контроллер речи. */
  constructor(options?: SpeechOptions)
  /** Добавляет контролы речи к блокам `.bvi-speech`. */
  mount(): void
  /** Останавливает речь и удаляет контролы. */
  destroy(): void
  /** Удаляет контролы без изменения настройки речи. */
  destroyControls(): void
  /** Запускает периодическую синхронизацию состояния кнопок. */
  startStatusTimer(): void
  /** Останавливает периодическую синхронизацию состояния кнопок. */
  stopStatusTimer(): void
  /** Озвучивает текст и опционально подсвечивает произносимые слова. */
  speak(text: string, element?: HTMLElement | null, echo?: boolean): void
  /** Возвращает, включена ли озвучка в настройках и поддерживается ли браузером. */
  isEnabled(): boolean
  /** Возвращает, доступен ли Web Speech API. */
  isSupported(): boolean
  /** Сбрасывает состояние кнопок управления речью. */
  disableButtons(): void
}

export default Bvi

/** Глобальная переменная при подключении через `<script src="bvi.min.js">`: `isvek.Bvi`. */
export as namespace isvek
