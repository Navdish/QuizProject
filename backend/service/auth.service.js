const { user } = require('../models')
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const CustomError = require('../lib/error');

exports.create = async({data})=> {
    const {email, password, name, role} = data;
    if(!(email && password, name, role)) throw new CustomError("User credentials not found", 422);
    const user_data = await user.findOne({where: {email}});
    if(user_data) throw new CustomError("email already exists", 409);
    const hash = await bcrypt.hash(password, saltRounds);
    if(!hash) throw new CustomError("hash not created", 500);
    const response = await user.create({ email, password : hash, name, role});
    if(!response) throw new CustomError("internal server error", 500)
    return response;
}

exports.login = async function({data}) {
    const {email, password} = data;
    if(!(email && password)) throw new CustomError("User credentials not found", 422);
    const user_data = await user.findOne({where :{email}});
    if(!user_data) throw new CustomError("User doesn't exist", 404);
    if(!( await bcrypt.compare(password, user_data.password))) throw new CustomError("User password is wrong", 401)
    const token = jwt.sign({id : user_data.uuid}, 'Zenmonk', {
        expiresIn: '24h'
    })
    if(!token) throw new CustomError("Token not generating", 500);
    return {token, user: user_data};
}
