import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const shell = process.platform === 'win32'
const workDir = fs.mkdtempSync(path.join(os.tmpdir(), 'bvi-package-'))

const checks = [
  ['ESM: import Bvi, { Speech } from "bvi"', ['--input-type=module', '-e', `
    import Bvi, { Speech } from 'bvi'
    import * as namespace from 'bvi'
    if (typeof Bvi !== 'function' || typeof Speech !== 'function' || namespace.Bvi !== Bvi) throw new Error('unexpected exports')
  `]],
  ['CommonJS: require("bvi")', ['-e', `
    const bvi = require('bvi')
    if (typeof bvi.Bvi !== 'function' || typeof bvi.Speech !== 'function' || bvi.default !== bvi.Bvi) throw new Error('unexpected exports')
  `]],
  ['SSR: the import does not touch window or document', ['--input-type=module', '-e', `
    if (typeof window !== 'undefined' || typeof document !== 'undefined') throw new Error('the check must run without a DOM')
    await import('bvi')
  `]],
  ['styles: "bvi/style" and "bvi/style.css" resolve', ['--input-type=module', '-e', `
    for (const specifier of ['bvi/style', 'bvi/style.css', 'bvi/package.json']) {
      const url = import.meta.resolve(specifier)
      if (!url) throw new Error(specifier)
    }
  `]],
]

let failed = 0

try {
  const tarball = execFileSync('npm', ['pack', '--pack-destination', workDir, '--silent'], { cwd: root, encoding: 'utf8', shell }).trim().split('\n').pop()

  fs.writeFileSync(path.join(workDir, 'package.json'), JSON.stringify({ name: 'bvi-package-check', private: true }))
  execFileSync('npm', ['install', '--silent', '--no-audit', '--no-fund', path.join(workDir, tarball)], { cwd: workDir, shell })

  for (const [title, args] of checks) {
    try {
      execFileSync(process.execPath, args, { cwd: workDir, stdio: 'pipe' })
      console.log(`ok   ${title}`)
    } catch (error) {
      failed++
      console.log(`FAIL ${title}\n${String(error.stderr || error.message).trim().split('\n').slice(0, 4).join('\n')}`)
    }
  }
} finally {
  fs.rmSync(workDir, { recursive: true, force: true })
}

process.exit(failed ? 1 : 0)
