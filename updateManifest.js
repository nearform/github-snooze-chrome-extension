const { writeFile } = require('fs/promises')

const start = async () => {
  console.log('UPDATING MANIFEST ...')
  const manifest = require('./src/manifest.json')
  const packageJson = require('./package.json')

  manifest.version = packageJson.version
  await writeFile('./src/manifest.json', JSON.stringify(manifest, null, 2))
  console.log('MANIFEST UPDATED!')
}

start()
