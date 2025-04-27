const swaggerAutogen = require('swagger-autogen')();

const outputFile = '../Swagger/swagger_output.json'
const endpointsFiles = ['../routes/*.js']

swaggerAutogen(outputFile, endpointsFiles)