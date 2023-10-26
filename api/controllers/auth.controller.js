import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'

const signup = async (req,res) =>{
    console.log('request',req.body);
    const {userName, email, password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password,10);
    const newUser = new User({userName,email, password:hashedPassword})
    try{
    await newUser.save()
    res.status(201).json('User created successfully!');
    }
    catch(error) {
      res.status(500).send(error.message);
    }
}

export default signup;