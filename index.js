const express = require('express');
const swaggerUi = require('swagger-ui-express');
const carController = require('./app/controllers/carControllers');
const carMiddleware = require('./app/middleware/carMiddlware');

const userController = require('./app/controllers/userController');
const userMiddleware = require('./app/middleware/userMiddleware'); 
const authMiddleware = require('./app/middleware/authMiddleware');

const app = express();
const PORT = '3000';

const swaggerDocument = require('./docs/openapi.json')

app.use(express.json());

app.listen(PORT, () => {
    console.log(`open http://127.0.0.1:${PORT}`)
});

app.get('/api', (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "ping succesfully"
    });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/api/cars', authMiddleware.isAuthorized, carController.getListCars);
app.get('/api/cars/:id', authMiddleware.isAuthorized, carMiddleware.isAvailable, carController.getCar);
app.post('/api/cars', authMiddleware.isAuthorized, authMiddleware.isSuperAdminOrAdmin, carController.createCar);
app.put('/api/cars/:id', authMiddleware.isAuthorized, authMiddleware.isSuperAdminOrAdmin, carMiddleware.isAvailable, carController.updateCar);
app.delete('/api/cars/:id', authMiddleware.isAuthorized, authMiddleware.isSuperAdminOrAdmin, carMiddleware.isAvailable, carController.deleteCar);

app.post('/api/register', userController.createUser);
app.post('/api/admin/register', authMiddleware.isAuthorized, authMiddleware.isSuperAdmin, userController.createUser);
app.post('/api/login', userMiddleware.isCredentialsNull, userMiddleware.isUserFoundByEmail, userController.userLogin);

app.get('/api/user', authMiddleware.isAuthorized, userController.userRightNow);

app.all('*', (req, res) => {
    res.status(404).json({
        message: "end point not found or wrong method"
    });
});