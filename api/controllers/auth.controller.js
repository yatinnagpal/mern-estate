import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import {errorHandler} from '../utils/error.js'
import jwt from 'jsonwebtoken'

export const signup = async (req,res, next) =>{
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

export const signin = async (req, res, next) => {
  const {email, password} =  req.body;
  try{
  const validUser = await User.findOne({email});
  if(!validUser){
    next(errorHandler(404, 'User not found!!'));
  }
  const validPassword = bcryptjs.compareSync(password, validUser.password);
  if(!validPassword){
    next(errorHandler(401, 'invalid Password'));
  }
  const token  = jwt.sign({id: validUser._id}, process.env.JWTSECRET);
  res.cookie('access_token', token, {httpOnly: true, expires: new Date(Date.now() + 24*60*60 )}).status(200).json(validUser);
  }
  catch(error){
    next(error);
  }
}