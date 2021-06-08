import path from 'path'
import fs from 'fs'
import { execSync } from 'child_process'

import mongoose from 'mongoose'

require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') })

import app from './server'

const args = require('yargs/yargs')(process.argv.slice(2))
  .usage('Usage: $0 <command> [options]')
  .boolean(['rebuild'])
  .alias('r', 'rebuild')
  .describe('r', 'build all frontend before start server')
  .default('rebuild', false)
  .argv

if (args.rebuild || !fs.existsSync(path.resolve(__dirname, '..', process.env.FRONTEND_BUILD_DIR || 'build'))) {
  console.log('\x1b[36m%s\x1b[0m', '\t\tRUN BUILD FRONTEND!!!!')

  execSync('cd ../ && npm run build-all', { stdio: 'inherit' })
}

console.log('\x1b[36m%s\x1b[0m', '\n\t\tRUN SERVER!!!!\n')

mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://localhost:27017/ho_is_author', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

try {
  app.listen(3000, () => {
      console.log(`Application run on port 3000`)
  })
} catch(err) {
  process.exitCode = 1
  console.error(err)
}
