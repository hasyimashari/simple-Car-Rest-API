const userServices = require('../services/userServices');

const isCredentialsNull = (req, res, next) => {

    try {
        const credentilas = req.body;
        const notNullCredentials = userServices.isCredentialsNull(credentilas);
    
        req.credentials = notNullCredentials;
        next();

    } catch (err) {
        res.status(err.statusCode).json({
            status: 'Fail',
            message: err.message
        });
    };

    
}

const isUserFoundByEmail = async(req, res, next) => {

    try {
        const credentilas = req.credentials;
        const user = await userServices.findUserByEmail(credentilas);

        req.user = user;
        next();

    } catch (err) {
        res.status(err.statusCode).json({
            status: 'Fail',
            message: err.message
        });
    };
};

module.exports = {
    isCredentialsNull,
    isUserFoundByEmail,
}