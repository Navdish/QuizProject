const { User } = require('../models')
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const CustomError = require('../lib/error');

exports.create = async({data})=> {
    const {email, password, name, role} = data;
    if(!(email && password, name, role)) throw new CustomError("User credentials not found", 422);
    const user = await User.findOne({email}).exec();
    if(user) throw new CustomError("email already exists", 409);
    const hash = await bcrypt.hash(password, saltRounds);
    if(!hash) throw new CustomError("hash not created", 500);
    const response = await User.create({ email, password : hash, name, role});
    if(!response) throw new CustomError("internal server error", 500)
    return response;
}

exports.login = async function({data}) {
    const {email, password} = data;
    if(!(email && password)) throw new CustomError("User credentials not found", 422);
    const user = await User.findOne({email : email}).exec();
    if(!user) throw new CustomError("User doesn't exist", 404);
    if(!( await bcrypt.compare(password, user.password))) throw new CustomError("User password is wrong", 401)
    const token = jwt.sign({id : user._id}, 'Zenmonk', {
        expiresIn: '8h'
    })
    if(!token) throw new CustomError("Token not generating", 500);
    const {_id, ...userTrimmed} = user._doc;
    console.log("userTrimmed", userTrimmed);
    //REMOVE PASSWORD AND _id FROM USER 
    return {token, user};
}
