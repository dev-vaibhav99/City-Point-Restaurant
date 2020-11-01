const asyncHandler = require('express-async-handler')
const User = require('../models/user')
const generateToken = require('../utils/generateToken')


//@desc     Register a new user
//@route    POST /api/users
//@access   Public

exports.registerUser = asyncHandler(async (req, res) =>{
    console.log(req)
    const {name, email, password} = req.body

    //check if email is already in use
    const userExists = await User.findOne({ where: { email } });
    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    } 

    const user = await User.scope('withPassword').create({
        name,
        email,
        password
    })
    if(user){
        //return created user
        res.status(201).json({ 
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }

})

//@desc     Auth user & get token
//@route    POST /api/users/login
//@access   Public

exports.login = asyncHandler(async (req, res) =>{
    const {email, password} = req.body

    //check if email is already in use
    const user = await User.scope('withPassword').findOne({ where: { email } })

    //if user exist and entered password is the same
    if(user && (await user.validPassword(password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user.id)
        })
    }else{
        res.status(401)
        throw new Error('Invalid email or password')
    }
})


//@desc     Get all users
//@route    GET /api/users
//@access   Private/user
exports.getUsers = asyncHandler(async (req, res) =>{
    const users = await User.findAll({attributes: { exclude: ['password'] }})
    res.json(users)

    
})