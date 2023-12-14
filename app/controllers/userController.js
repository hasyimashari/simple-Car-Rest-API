const userServices = require('../services/userServices');

const createUser = async(req, res) => {

    try {
        const payload = req.body;
        const data = await userServices.createUser(payload, req.user? true : false);

        res.status(201).json({
            status: 'OK',
            message: 'create user success',
            data
        })

    } catch (err) {
        res.status(err.statusCode).json({
            status: 'FAIL',
            message: err.message
        });
    };
};

const userLogin = async(req, res) => {

    try {
        const credentilas = req.body;
        const user = req.user;

        const data = await userServices.isUserPwRight(credentilas, user);
        res.status(200).json({
            status: 'OK',
            message: 'login successfully',
            data
        });

    } catch (err) {
        res.status(err.statusCode).json({
            status: 'FAIL',
            message: err.message
        });
    };
};

const userRightNow = (req, res) => {

    const {user} = req;

    res.status(200).json({
        status: 'OK',
        message: 'get user data success',
        data: user
    });
};

module.exports = {
    createUser,
    userLogin,
    userRightNow,
}