const http = require('http')
const app = require('./app')
const server =  http.createServer(app)

const API_PORT = process.env
const PORT = process.env.API_PORT



server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})