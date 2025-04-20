const { parse, stringify } = require('uuid')

const uuidToBinary = (uuidStr) => {
  return Buffer.from(parse(uuidStr))
}

const binaryToUUID = (binary) => {
  const uuidStr = stringify(binary)
  return uuidStr
}

module.exports = { uuidToBinary, binaryToUUID }
