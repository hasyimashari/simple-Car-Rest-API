const carServices = require('../services/carServices')

const getListCars = async (req, res) => {

    try {
        const data = await carServices.getCars();

        res.status(200).json({
            status: 'OK',
            message: 'get cars data succes',
            data
        });

    } catch (err) {
        res.status(err.statusCode).json({
            status: "FAIL",
            message: err.message
        });
    };
};

const getCar = async (req, res) => {

    try {
        const data = req.carData;

        res.status(200).json({
            status: 'OK',
            message: 'get car data succes',
            data
        });

    } catch (err) {
        res.status(err.statusCode).json({
            status: "FAIL",
            message: err.message
        });
    };
};

const createCar = async (req, res) => {
    try {
        const payload = req.body;
        const {id: adminId} = req.user;

        const data = await carServices.createCar(payload, adminId);

        res.status(201).json({
            status: 'OK',
            message: 'create car data succes',
            data
        });

    } catch (err) {
        res.status(err.statusCode).json({
            status: 'FAIL',
            message: err.message
        });
    };
};

const updateCar = async (req, res) => {
    try {

        const { id } = req.carData;
        const {id: adminId} = req.user;
        const newData = req.body;

        const data = await carServices.updateCar(newData, id, adminId);

        res.status(201).json({
            satus: 'OK',
            message: 'updated car success',
            data
        });

    } catch (err) {
        res.status(err.statusCode).json({
            status: 'FAIL',
            message: err.message
        });
    };
};

const deleteCar = async (req, res) => {
    try {
        const { id } = req.carData;
        const {id: adminId} = req.user;

        const data = await carServices.deleteCar(id, adminId);

        res.status(200).json({
            staus: 'OK',
            message: "data successfully deleted",
            data
        });

    } catch (err) {
        res.status(err.statusCode).json({
            satus: 'FAIL',
            message: err.message
        });
    };
};

module.exports = {
    getListCars,
    getCar,
    createCar,
    updateCar,
    deleteCar
}