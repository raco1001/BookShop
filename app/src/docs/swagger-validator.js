const fs = require('fs')
const path = require('path')

/**
 * Validates if Swagger documentation files exist
 * @returns {boolean} True if Swagger files exist, false otherwise
 */
function validateSwaggerFiles() {
  const swaggerPath = path.join(__dirname, 'swagger.js')
  const swaggerConfigPath = path.join(__dirname, 'swagger-config.js')

  return fs.existsSync(swaggerPath) && fs.existsSync(swaggerConfigPath)
}

module.exports = {
  validateSwaggerFiles,
}
