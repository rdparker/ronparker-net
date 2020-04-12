// lint-staged.config.js

/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const micromatch = require('micromatch')
const path = require('path')

module.exports = {
  '**/*.md': (filenames) => {
    const files = filenames.join(' ')
    return [`yarn precise-commits ${files}`, `markdownlint ${files}`]
  },
  '**/*.json': (allFiles) => {
    const packageJsons = micromatch(allFiles, '**/package.json')
    let packageJsonLint = []
    if (packageJsons.length > 0) {
      packageJsonLint = `npmPkgJsonLint ${packageJsons.join(' ')}`
    }
    return [`yarn precise-commits ${allFiles.join(' ')}`].concat(
      packageJsonLint
    )
  },
  '**/*.{js,jsx,ts,tsx}': (filenames) => {
    const commands = [
      `yarn precise-commits ${filenames.join(' ')}`,
      `eslint --fix ${filenames.join(' ')}`,
    ]

    return commands
  },
  '**/*.d.ts': (filenames) => {
    const unique = (a) => [...new Set(a)]
    const dirs = unique(
      filenames.map((f) => path.dirname(f).substr(__dirname.length + 1))
    )
    const commands = dirs.map(
      (d) => `dtslint --localTs node_modules/typescript/lib ${d}`
    )
    return [`yarn precise-commits ${filenames.join(' ')}`].concat(commands)
  },
}
