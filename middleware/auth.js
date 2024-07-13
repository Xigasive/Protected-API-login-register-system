const jwt = require('jsonwebtoken');
const config = process.env
  

const verifyToken = (req, res, next) => {  
    const token = req.headers['authorization']; 
    console.log(token) 
    if (!token) {  
        return res.status(401).json({ message: 'Token is not provided' });  
    }  

    try {  
        jwt.verify(token, config.TOKEN_SECRET, (err, decoded) => {  
            if (err) {  
                return res.status(403).json({ message: 'Token is invalid' });  
            }  
            req.user = decoded;  
            next();  
        });  
    } catch (err) {  
        return res.status(401).send('Invalid Token');  
    }  
}  

module.exports = verifyToken;