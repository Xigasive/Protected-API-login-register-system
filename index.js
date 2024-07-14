const http = require('http')
const app = require('./app')
const server =  http.createServer(app)

const API_PORT = process.env
const PORT = process.env.API_PORT

fetch('/api/login', {  
  method: 'POST',  
  body: JSON.stringify({ email, password }),  
  headers: {  
    'Content-Type': 'application/json',  
  },  
})  
.then(response => response.json())  
.then(data => {  
  // รับ Token จาก response  
  const token = data.token;  

  // เก็บ Token ใน localStorage  
  localStorage.setItem('token', token);  
})  

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
