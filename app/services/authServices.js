const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const applicationError = require('../../config/error/applicationError');
const userRepositories = require('../repositories/userRepositories');

const JWT_SECRET_KEY = "jwtchallenge05_"

const createToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1d' });
};

const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET_KEY);
};

const encryptPassword = async(pw) => {

    try {        
        const genRandomNumber = Math.floor((Math.random() * 10));
    
        const genSalt = await bcrypt.genSalt(genRandomNumber);
        const hashedPassword = await bcrypt.hash(pw, genSalt);
    
        return hashedPassword;

    } catch (err) {
        throw new applicationError(`Failed to hash password : ${err.message}`, 500);
    };
};

const comparePassword = async(pw, hashedPw) => {

    try {
        const isCorrectPw = await bcrypt.compare(pw, hashedPw);
        return isCorrectPw;

    } catch (err) {
        throw new applicationError(`Failed to compare password : ${err.message}`, 500);
    };
};

const isBearerTokenNull = (bearerToken) => {
    if (!bearerToken) {
        throw new applicationError('Failed to access: unauthorized', 401);
    };

    return bearerToken;
}

const tokenCheck = async(bearerToken) => {

    try {
        const notNullBearerToken = isBearerTokenNull(bearerToken)

        const token = notNullBearerToken.split(' ')[1];
        const {id} = verifyToken(token);

        const user = await userRepositories.findUserByID(id);
        return user;

    } catch (err) {
        throw new applicationError(`Failed to check authorize: ${err.message}`, err.statusCode || 500);
    }

};

const isSuperAdmin = (role) => {

    if (role !== 'superadmin') {
        throw new applicationError('Failed to access: forbidden', 403);
    };
};

const isSuperAdminOrAdmin = (role) => {

    const is_superadmin_or_admin= ['superadmin', 'admin'].includes(role);
    if (!is_superadmin_or_admin) {
        throw new applicationError('Failed to access: forbidden', 403);
    };
};

module.exports = {
    createToken,
    verifyToken,
    encryptPassword,
    comparePassword,
    isBearerTokenNull,
    tokenCheck,
    isSuperAdmin,
    isSuperAdminOrAdmin,
}