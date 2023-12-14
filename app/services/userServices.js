const applicationError = require('../../config/error/applicationError');
const userRepositories = require('../repositories/userRepositories');
const authServices = require('./authServices');

const createUser = async(payload, isAdmin) => {

    try {
        const {password} = payload;
        if (!password) {
            throw new applicationError(`password is required`, 400);
        };

        const encryptedPassword = await authServices.encryptPassword(password);

        const encryptedPayload = {
            encryptedPassword,
            role: isAdmin? 'admin' : 'member',
            ...payload
        }
        const newUser = await userRepositories.createUser(encryptedPayload);

        return newUser;

    } catch (err) {
        if (err.name == "SequelizeValidationError") {
            const errors = err.errors.map(err => err.message);
            throw new applicationError(`Failed to create new user : ${errors}`, 400);
        };

        throw new applicationError(`Failed to create new user : ${err.message}`, err.statusCode || 500);
    };
};

const isCredentialsNull = (credentials) => {

    const {email, password} = credentials;
    if (!email || !password) {
        throw new applicationError('Failed to login: email and password are required', 400)
    };

    return credentials;
};

const findUserByEmail = async(credentilas) => {

    try {
        const {email} = credentilas;
        const user = await userRepositories.findUserByEmail(email);

        if (!user) {
            throw new applicationError('user not found', 400);
        }
        return user;

    } catch (err) {
        throw new applicationError(`Failed to login : ${err.message}`, err.statusCode || 500);
    };
};

const isUserPwRight = async(credentilas, user) => {

    try {
        const {password} = credentilas;
        const {id, encryptedPassword} = user;

        const isRightPw = await authServices.comparePassword(password, encryptedPassword);
        if (!isRightPw) {
            throw new applicationError('wrong password', 400);
        };

        const token = authServices.createToken({ id });
        const userWithToken = {...user.dataValues, token};

        return userWithToken;

    } catch (err) {
        throw new applicationError(`Failed to login : ${err.message}`, err.statusCode || 500);
    };

}

module.exports = {
    createUser,
    isCredentialsNull,
    findUserByEmail,
    isUserPwRight,
}