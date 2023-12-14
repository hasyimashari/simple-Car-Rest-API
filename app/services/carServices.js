const applicationError = require('../../config/error/applicationError')
const carRepostiories = require('../repositories/carRepositories');


const getCars = async() => {

    try {
        const cars = await carRepostiories.findAllCar();
        return cars;

    } catch (err) {
        throw new applicationError(`Failed to get cars information: ${err.message}`, 500);
    };
};

const getCarByID = async(id) => {

    try {
        const car = await carRepostiories.findCarById(id);
        if (!car) {
            throw new applicationError('car not found', 404)
        };

        return car;

    } catch (err) {
        throw new applicationError(`Failed to get car information: ${err.message}`, err.statusCode || 500);
    }
};

const createCar = async(payload, adminId) => {

    try {
        const newCar = await carRepostiories.createCar(payload, adminId);
        return newCar;

    } catch (err) {
        if (err.name == "SequelizeValidationError") {
            const errors = err.errors.map(err => err.message);
            throw new applicationError(`Failed to created new car : ${errors}`, 400);
        }

        throw new applicationError(`Failed to create car: ${err.message}`, 500);
    }
};

const updateCar = async(newData, id, adminId) => {

    try {
        const [, updatedCar] = await carRepostiories.updateCar(newData, id, adminId)
        return updatedCar;

    } catch (err) {
        if (err.name == "SequelizeValidationError") {
            const errors = err.errors.map(err => err.message);
            throw new applicationError(`Failed to update car: ${errors}`, 400);
        }

        throw new applicationError(`Failed to update car: ${err.message}`, 500);
    };
};

const deleteCar = async(id, adminId) => {

    try {
        await carRepostiories.deleteCar(id);
        const [, deletedCar] = await carRepostiories.updateCarafterDelete(id, adminId);
        return deletedCar;

    } catch (err) {
        throw new applicationError(`Failed to delete car: ${err.message}`, 500);
    };
};

module.exports = {
    getCars,
    getCarByID,
    createCar,
    updateCar,
    deleteCar
};