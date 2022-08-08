const { writeFileSync } = require('fs')

console.log('UPDATING MANIFEST ...')
const manifest = require('../src/manifest.json')
const packageJson = require('../package.json')

manifest.version = packageJson.version
writeFileSync(
  __dirname + '/../src/manifest.json',
  JSON.stringify(manifest, null, 2)
)
console.log('MANIFEST UPDATED!')
