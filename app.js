require('dotenv').config()
require('./config/database').connect()
 // just note ALT + 092 = \
const express = require('express')
const session = require('express-session');  
const User = require('./model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const auth = require('./middleware/auth')

const app = express() 

app.use(express.json())

app.use(session({  
    secret: 'XIGY',  
    resave: false,  
    saveUninitialized: false,  
    cookie: { 
        maxAge: 60 * 1000,  
        secure: false  }  
})); 


app.post('/register', async (req,res) =>{
    
    try {
        const { first_name , last_name , email , password} = req.body
        
        if (!(email&&first_name&&last_name&&password)) {
            return res.status(400).json({ message: 'All fields required' });
        }

        const olduser = await User.findOne({email})
        if (olduser) {
            return res.status(400).json({ message: 'Email already in use' })
        }             
        
         // encyptpassword to hash

        encryptpassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            first_name,
            last_name,
            email,
            password: encryptpassword,
        })

        
        
        res.json(user);

    } catch(err) {
        console.error(err);
        console.log('error register')
        return;
    }

})



app.post('/login', async (req, res) => {  
    const { email, password } = req.body;  
    
    try {  
        const user = await User.findOne({ email });  

        if (!user) {  
            return res.status(401).json({ message: 'User not found' });  
        }  

        // Compare input password with hashed password using bcrypt  
        const isMatch = await bcrypt.compare(password, user.password);  

        if (!isMatch) {  
            return res.status(401).json({ message: 'Invalid password' });  
        }  
        // token
        const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });

        return res.json({ message: 'Logged in successfully', token: token });
    } catch (error) {  
        return res.status(500).json({ message: 'An error occurred while logging in' });  
    }  
});      

app.post("/welcome", auth, (req, res) => {
    res.json({ message: "Welcome to the protected API" });  
    
}); 


module.exports = app
