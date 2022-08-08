const { writeFile } = require('fs/promises')

const MANIFEST_PATH = './src/manifest.json'

const start = async () => {
  console.log('UPDATING MANIFEST ...')
  const manifest = require(MANIFEST_PATH)
  const packageJson = require('./package.json')

  manifest.version = packageJson.version
  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2))
  console.log('MANIFEST UPDATED!')
}

start()
