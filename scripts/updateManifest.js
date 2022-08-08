const { writeFileSync } = require('fs')
const path = require('path')

const MANIFEST_PATH = path.join(__dirname, '../src/manifest.json')

const start = async () => {
  console.log('UPDATING MANIFEST ...')
  const manifest = require(MANIFEST_PATH)
  const packageJson = require('../package.json')

  manifest.version = packageJson.version
  await writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2))
  console.log('MANIFEST UPDATED!')
}

start()
