/**
 * UMD-точка входа библиотеки: экспорт по умолчанию Rollup превращает в глобальную переменную `isvek`
 * (`isvek.Bvi`, `isvek.Speech`), поэтому внутри проекта его никто не импортирует.
 * @module bvi/umd
 * @noinspection JSUnusedGlobalSymbols
 */
import Bvi from './bvi'
import Speech from './speech'

export default {
  Bvi,
  Speech,
}
