const { user } = require('../models')

const findUserByID = (id) => {
    return user.findByPk(id);
};

const findUserByEmail = (email) => {
    return user.findOne({
        where : {email}
    });
};

const createUser = (payload) => {
    return user.create(payload);
};

module.exports = {
    findUserByID,
    findUserByEmail,
    createUser,
}