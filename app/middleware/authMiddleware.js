const authServices = require('../services/authServices');

const isAuthorized = async(req, res, next) => {

    try {
        const {authorization: bearerToken} = req.headers;

        const notNullBearerToken = authServices.isBearerTokenNull(bearerToken);
        const user = await authServices.tokenCheck(notNullBearerToken);

        req.user = user;
        next();

    } catch (err) {
        res.status(err.statusCode).json({
            status: 'Fail',
            message: err.message
        });
    };
};

const isSuperAdmin = (req, res, next) =>  {

    try {
        const {role} = req.user;
        authServices.isSuperAdmin(role);

        next();

    } catch (err) {
        res.status(err.statusCode).json({
            status: 'FAIL',
            message: err.message
        });
    };
};

const isSuperAdminOrAdmin = (req, res, next) => {

    try {
        const {role} = req.user;
        authServices.isSuperAdminOrAdmin(role);

        next();

    } catch (err) {
        res.status(err.statusCode).json({
            status: 'FAIL',
            message: err.message
        });
    };
};

module.exports = {
    isAuthorized,
    isSuperAdmin,
    isSuperAdminOrAdmin
}