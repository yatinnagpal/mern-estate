import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'

const signup = async (req,res, next) =>{
    console.log('request',req.body);
    const {username, email, password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password,10);
    const newUser = new User({username,email, password:hashedPassword})
    try{
    await newUser.save()
    res.status(201).json('User created successfully!');
    }
    catch(error) {
      next(error)
    }
}

export default signup;