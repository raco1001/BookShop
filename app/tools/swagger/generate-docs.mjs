import { execSync } from 'child_process'
import fs from 'fs'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerDef from './swaggerDef.js'

const options = {
  definition: swaggerDef,
  apis: ['../app.js'],
}

const swaggerSpec = swaggerJSDoc(options)
fs.writeFileSync('./openapi.json', JSON.stringify(swaggerSpec, null, 2))

execSync(
  'npx widdershins openapi.json -o ./_api.md --summary --language_tabs javascript',
)

const template = fs.readFileSync('./README.template.md', 'utf8')
const apiDoc = fs.readFileSync('./_api.md', 'utf8')
const startTag = '<!-- API-DOCS:START -->'
const endTag = '<!-- API-DOCS:END -->'
const startIndex = template.indexOf(startTag)
const endIndex = template.indexOf(endTag)

if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
  console.error(
    'README.template.md에 API-DOCS 마커가 없거나 순서가 잘못되었습니다.',
  )
  process.exit(1)
}

const styledDoc = apiDoc
  .replace(/^# /gm, '## ')
  .replace(/^\*\*(.*?)\*\*/gm, '_$1_')

const newReadme = [
  template.slice(0, startIndex + startTag.length),
  '\n\n',
  styledDoc.trim(),
  '\n\n',
  template.slice(endIndex),
].join('')

fs.writeFileSync('./ReferenceAPI.md', newReadme)
console.log('✅ README.md 생성 완료!')
