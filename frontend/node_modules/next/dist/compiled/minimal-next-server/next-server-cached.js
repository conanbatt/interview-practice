
const filename = "next-server.js"
const { readFileSync } = require('fs'),
  { Script } = require('vm'),
  { wrap } = require('module'),
  { join } = require('path');
const basename = join(__dirname, filename)

const source = readFileSync(basename, 'utf-8')

const cachedData =
  !process.pkg &&
  require('process').platform !== 'win32' &&
  readFileSync(join(__dirname, 'next-server.js.cache'))

const scriptOpts = { filename: basename, columnOffset: 0 }

const script = new Script(
  wrap(source),
  cachedData ? Object.assign({ cachedData }, scriptOpts) : scriptOpts
)

script.runInThisContext()(exports, require, module, __filename, __dirname)
