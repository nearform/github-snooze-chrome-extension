const { writeFileSync } = require('fs')

console.log('UPDATING MANIFEST ...')
const manifest = require('../manifest.json')
const packageJson = require('../package.json')

manifest.version = packageJson.version
writeFileSync(
  __dirname + '/../manifest.json',
  JSON.stringify(manifest, null, 2)
)
console.log('MANIFEST UPDATED!')
