const carServices = require('../services/carServices')

const isAvailable = async (req, res, next) => {

    try {

        const { id } = req.params;
        const carData = await carServices.getCarByID(id);

        req.carData = carData;
        next();

    } catch (err) {
        res.status(err.statusCode).json({
            status: "FAIL",
            message: err.message
        });
    };
};

module.exports = {
    isAvailable,
}
