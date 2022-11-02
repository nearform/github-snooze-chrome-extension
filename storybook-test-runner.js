#!/usr/bin/env node
const { spawn } = require("child_process");

// this function spawns a script which waits for a port to be available
function waitForPort(port, callback) {
  spawn(`wait-port http://127.0.0.1:${port}`, [], { stdio: 'inherit', shell: true }).on("exit", callback)
}

function main() {
  const killPort = spawn(`lsof -ti:${6006} | xargs kill`, [], { stdio: 'inherit', shell: true })
  killPort.on('close', () => {
    const storybookServe = spawn("npm run build-storybook && npx http-server ./storybook-static --port 6006", [], { stdio: 'inherit', shell: true })
  
    waitForPort(6006, () => {
      const storybookTest = spawn("npm run test-storybook", [], { stdio: 'inherit', shell: true })
      storybookTest.on('close', (code) => {
        storybookServe.kill()
        spawn(`lsof -ti:${6006} | xargs kill`, [], { stdio: 'inherit', shell: true })
        process.exit(code)
      })
    })
  })
}

if (require.main === module) {
  main();
}
