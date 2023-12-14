const { car, user } = require('../models');

const findAllCar = () => {
    return car.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'deletedAt', 'createdBy', 'updatedBy', 'deletedBy']
        }
    });
}

const findCarById = (id) => {
    return car.findByPk(id, {
        include: [
            {
                model: user,
                as: 'created',
                attributes: ['id', 'name', 'email', 'role']
            },
            {
                model: user,
                as: 'updated',
                attributes: ['id', 'name', 'email', 'role']
            },
            {
                model: user,
                as: 'deleted',
                attributes: ['id', 'name', 'email', 'role']
            }
        ], attributes: {
            exclude: ['createdBy', 'updatedBy', 'deletedBy']
        }
    });
};

const createCar = (payload, adminId) => {
    return car.create({
        ...payload,
        createdBy: adminId
    });
};

const updateCar = (newData, id, adminId) => {
    return car.update(
        {
            ...newData, 
            updatedBy: adminId
        }, 
        { where: { id }, 
        returning: true, 
    });
};

const updateCarafterDelete = (id, adminId) => {
    return car.update(
        { 
            deletedBy: adminId
        }, 
        { where: { id }, 
        returning: true,
        paranoid: false
    });
};

const deleteCar = (id) => {
    return car.destroy({ 
        where: { id } 
    });
};

module.exports = {
    findAllCar,
    findCarById,
    createCar,
    updateCar,
    updateCarafterDelete,
    deleteCar
};